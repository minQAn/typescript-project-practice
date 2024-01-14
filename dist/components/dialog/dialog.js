import { BaseComponent } from "../component.js";
export class InputDialog extends BaseComponent {
    constructor() {
        super(`
            <dialog class="dialog">
                <div class="dialog__bg">
                    <div class="dialog__container">
                        <button class="close">&times;</button>
                        <div class="dialog__body"></div>
                        <button class="dialog__submit">ADD</button>
                    </div>
                </div>          
            </dialog>
        `);
        const dialogBg = this.element.querySelector('.dialog__bg');
        dialogBg.onclick = (event) => {
            const target = event.target;
            if (!target.matches('.close')) {
                return;
            }
            this.onCloseListener && this.onCloseListener();
        };
        const addBtn = this.element.querySelector('.dialog__submit');
        addBtn.onclick = () => {
            this.onSubmitListener && this.onSubmitListener();
        };
    }
    setOnCloseListener(listener) {
        this.onCloseListener = listener;
    }
    setOnSubmitListener(listener) {
        this.onSubmitListener = listener;
    }
    addChild(child) {
        const body = this.element.querySelector('.dialog__body');
        child.attachTo(body);
    }
}
