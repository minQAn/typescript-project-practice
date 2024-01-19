import { BaseComponent } from "../component.js";
export class PageItemComponent extends BaseComponent {
    constructor() {
        super(`            
            <li draggable="true" class="page-item">                
                <section class="page__body"></section>                
                <div class="page-item__controls">
                    <button class="close">&times;</button>
                </div>
            </li>
        `);
        const closeBtn = this.element.querySelector('.close');
        closeBtn.onclick = () => {
            this.closeListener && this.closeListener();
        };
        this.element.addEventListener('dragstart', (event) => {
            this.onDragStart(event);
        });
        this.element.addEventListener('dragend', (event) => {
            this.onDragEnd(event);
        });
        this.element.addEventListener('dragenter', (event) => {
            this.onDragEnter(event);
        });
        this.element.addEventListener('dragleave', (event) => {
            this.onDragLeave(event);
        });
    }
    addChild(child) {
        const container = this.element.querySelector('.page__body');
        child.attachTo(container);
    }
    setOnCloseListener(listner) {
        this.closeListener = listner;
    }
    setOnDragStateListener(listener) {
        this.dragStateListener = listener;
    }
    muteChildren(state) {
        if (state === 'mute') {
            this.element.classList.add('mute-children');
        }
        else {
            this.element.classList.remove('mute-children');
        }
    }
    onDragStart(_) {
        console.log('DragStart: ');
        this.notifyDragObservers('start');
    }
    onDragEnd(_) {
        console.log('DragEnd: ');
        this.notifyDragObservers('stop');
    }
    onDragEnter(_) {
        console.log('DragEnter: ');
        this.notifyDragObservers('enter');
    }
    onDragLeave(_) {
        console.log('DragLeave: ');
        this.notifyDragObservers('leave');
    }
    notifyDragObservers(state) {
        this.dragStateListener && this.dragStateListener(this, state);
    }
}
export class PageComponent extends BaseComponent {
    constructor(pageItemConstructor) {
        super(`<ul class="page"></ul>`);
        this.pageItemConstructor = pageItemConstructor;
        this.children = new Set();
        this.element.addEventListener('dragover', (event) => {
            this.onDragOver(event);
        });
        this.element.addEventListener('drop', (event) => {
            this.onDrop(event);
        });
    }
    onDragOver(event) {
        event.preventDefault();
    }
    onDrop(event) {
        event.preventDefault();
        console.log('Drop: ', event);
        if (!this.dropTarget) {
            return;
        }
        if (this.dragTarget && this.dragTarget !== this.dropTarget) {
            this.dragTarget.removeFrom(this.element);
            this.dropTarget.attach(this.dragTarget, 'beforebegin');
        }
    }
    addChild(section) {
        const item = new this.pageItemConstructor();
        item.addChild(section);
        item.attachTo(this.element, 'beforeend');
        item.setOnCloseListener(() => {
            item.removeFrom(this.element);
            this.children.delete(item);
        });
        this.children.add(item);
        item.setOnDragStateListener((target, state) => {
            console.log(target, state);
            switch (state) {
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
    updateSections(state) {
        this.children.forEach((section) => {
            section.muteChildren(state);
        });
    }
}
