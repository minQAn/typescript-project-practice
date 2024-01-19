import { BaseComponent, Component } from "../component.js";

export interface Composable {
    addChild(child: Component): void;
}

type OnCloseListener = () => void; // callback function
type DragState = 'start' | 'stop' | 'enter' | 'leave';
type OnDragStateListener<T extends Component> = (target: T, state: DragState) => void;


type SectionContainerConstructor = {
    new (): SectionContainer;
}

interface SectionContainer extends Component, Composable {
    setOnCloseListener(listener: OnCloseListener): void;
    setOnDragStateListener(listener: OnDragStateListener<SectionContainer>): void;
    muteChildren(state: 'mute' | 'unmute'): void;
}

export class PageItemComponent extends BaseComponent<HTMLElement> implements SectionContainer {
    private closeListener?: OnCloseListener;
    private dragStateListener?: OnDragStateListener<PageItemComponent>;

    constructor() {
        super(`            
            <li draggable="true" class="page-item">                
                <section class="page__body"></section>                
                <div class="page-item__controls">
                    <button class="close">&times;</button>
                </div>
            </li>
        `);

        const closeBtn = this.element.querySelector('.close')! as HTMLButtonElement;
        closeBtn.onclick = () => {
            this.closeListener && this.closeListener();
        }

        // 드래그 할 요소
        this.element.addEventListener('dragstart', (event: DragEvent) => {
            this.onDragStart(event);
        });

        this.element.addEventListener('dragend', (event: DragEvent) => {
            this.onDragEnd(event);
        });    
        
        this.element.addEventListener('dragenter', (event: DragEvent) => {
            this.onDragEnter(event);
        });

        this.element.addEventListener('dragleave', (event: DragEvent) => {
            this.onDragLeave(event);
        });   
    }

    addChild(child: Component) {
        const container = this.element.querySelector('.page__body')! as HTMLElement;
        child.attachTo(container);
    }

    setOnCloseListener(listner: OnCloseListener) {
        this.closeListener = listner;
    }

    // 드래그 되는 이 요소가 어떤 상태인지, 무엇인지
    setOnDragStateListener(listener: OnDragStateListener<PageItemComponent>) {
        this.dragStateListener = listener;
    }

    muteChildren(state: 'mute' | 'unmute') {
        if(state === 'mute') {
            this.element.classList.add('mute-children');
        } else {
            this.element.classList.remove('mute-children');
        }
    }

    onDragStart(_: DragEvent) {
        console.log('DragStart: ');
        this.notifyDragObservers('start')
    }

    onDragEnd(_: DragEvent) {
        console.log('DragEnd: ');
        this.notifyDragObservers('stop')
    }

    onDragEnter(_: DragEvent) {
        console.log('DragEnter: ');
        this.notifyDragObservers('enter')
    }

    onDragLeave(_: DragEvent) {
        console.log('DragLeave: ');
        this.notifyDragObservers('leave')
    }

    notifyDragObservers(state: DragState) {
        this.dragStateListener && this.dragStateListener(this, state); // this..?
    }
}

export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable {    
    private children = new Set<SectionContainer>(); // Set자료구조
    private dragTarget?: SectionContainer;
    private dropTarget?: SectionContainer;

    constructor(private pageItemConstructor: SectionContainerConstructor) {
        super(`<ul class="page"></ul>`);  
        
        // 드래그 할 요소
        this.element.addEventListener('dragover', (event: DragEvent) => {
            this.onDragOver(event);
        });

        this.element.addEventListener('drop', (event: DragEvent) => {
            this.onDrop(event);
        });
    }        
    
    // 드래그가 되어 반응할 위치
    onDragOver(event: DragEvent) {
        event.preventDefault();
        // console.log('Dragover: ', event);
    }

    // drop이 dropend보다 먼저 발생한다.
    onDrop(event: DragEvent) {
        event.preventDefault();
        console.log('Drop: ', event);
        // 여기에서 위치를 바꿔준다.
        if(!this.dropTarget) {
            return;
        }
        if(this.dragTarget && this.dragTarget !== this.dropTarget) {
            this.dragTarget.removeFrom(this.element);
            this.dropTarget.attach(this.dragTarget, 'beforebegin'); // 형제요소에 붙여넣을 것임으로 beforebegin
        }
    }    

    addChild(section: Component) {
        const item = new this.pageItemConstructor();
        item.addChild(section); // li 생성 후, 자식요소로 section을 먼저 넣고
        item.attachTo(this.element, 'beforeend'); // 분모 ul에 추가
        item.setOnCloseListener(() => { // close 버튼에 대한 콜백 함수 정의  
            item.removeFrom(this.element); // this item을 분모인 ul(this.element)로부터 remove 한다.
            this.children.delete(item);
        });
        this.children.add(item);
        item.setOnDragStateListener((target: SectionContainer, state: DragState) => {
            console.log(target, state);
            switch(state) {
                case 'start':
                    this.dragTarget = target;
                    this.updateSections('mute');
                    break;
                case 'stop':
                    this.dragTarget = undefined;
                    this.updateSections('unmute');
                    break;
                case 'enter':
                    console.log('enter: ', target);
                    this.dropTarget = target;
                    break;
                case 'leave':
                    console.log('laeve: ', target);
                    this.dropTarget = undefined;
                    break;
                default:
                    throw new Error(`unsupported state: ${state}`);
            }
        });
    }  
    

    private updateSections(state: 'mute' | 'unmute') {
        this.children.forEach((section: SectionContainer) => {
            section.muteChildren(state);
        })
    }
}