import { BaseComponent, Component } from "../component.js";

export interface Composable {
    addChild(child: Component): void;
}

type OnCloseListener = () => void; // callback function

type SectionContainerConstructor = {
    new (): SectionContainer;
}

interface SectionContainer extends Component, Composable {
    setOnCloseListener(listener: OnCloseListener): void;
}

export class PageItemComponent extends BaseComponent<HTMLElement> implements SectionContainer {
    private closeListener?: OnCloseListener;

    constructor() {
        super(`
            <li class="page-item">                
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
    }

    addChild(child: Component) {
        const container = this.element.querySelector('.page__body')! as HTMLElement;
        child.attachTo(container);
    }

    setOnCloseListener(listner: OnCloseListener) {
        this.closeListener = listner;
    }
}

export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable {    
    constructor(private pageItemConstructor: SectionContainerConstructor) {
        super(`<ul class="page"></ul>`);               
    }
    
    addChild(section: Component) {
        const item = new this.pageItemConstructor();
        item.addChild(section); // li 생성 후, 자식요소로 section을 먼저 넣고
        item.attachTo(this.element, 'beforeend'); // 분모 ul에 추가
        item.setOnCloseListener(() => { // close 버튼에 대한 콜백 함수 정의  
            item.removeFrom(this.element); // this item을 분모인 ul(this.element)로부터 remove 한다.
        });
    }
    
}