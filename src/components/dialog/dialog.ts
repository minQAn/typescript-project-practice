import { BaseComponent, Component } from "../component.js";
import { Composable } from "../page/page.js";

type OnCloseListener = () => void;
type OnSubmitListener = () => void;

export interface MediaData {
    readonly title: string,
    readonly url: string,    
}

export interface TextData {
    readonly title: string,
    readonly body: string,
}

export class InputDialog extends BaseComponent<HTMLElement> implements Composable{
    private onCloseListener?: OnCloseListener;
    private onSubmitListener?: OnSubmitListener;

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

        // Error: parent element is not closeBtn클릭하면 분모인 백그라운드도 클릭되었다고 판단됨. 하여 클릭되는 클래스명에 따라 매치시켜주는게 좋을듯
        const dialogBg = this.element.querySelector('.dialog__bg')! as HTMLButtonElement;                
        dialogBg.onclick = (event: any) => {   
            const target = event.target as Element;            

            if(!target.matches('.close')) {
                return;
            }
            
            this.onCloseListener && this.onCloseListener();
        }    

        const addBtn = this.element.querySelector('.dialog__submit')! as HTMLButtonElement;
        addBtn.onclick = () => {
            this.onSubmitListener && this.onSubmitListener();
        }
        
    }

    setOnCloseListener(listener: OnCloseListener) {                
        this.onCloseListener = listener;
    }

    setOnSubmitListener(listener: OnSubmitListener) {
        this.onSubmitListener = listener;
    }

    addChild(child: Component) {
        const body = this.element.querySelector('.dialog__body')! as HTMLElement;
        child.attachTo(body);
    }

    

    
}