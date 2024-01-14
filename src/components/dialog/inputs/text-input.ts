import { ContentType } from "../../../app.js";
import { BaseComponent } from "../../component.js";
import { TextData } from "../dialog.js";

export class TextSectionInput extends BaseComponent<HTMLElement> implements TextData {    
    constructor(private textType?: ContentType) {
        super(`
            <div>
                <div class="form__container">
                    <label for="title">Title</label>
                    <input type="text" id="title">
                </div>
                <div class="form__container">
                    <label for="body">Body</label>
                    <textarea rows="5" id="body"></textarea>                
                </div>
            </div>
        `);                

        const titleInput = this.element.querySelector('#title')! as HTMLInputElement;
        titleInput.placeholder = "제목을 입력하세요";

        const urlInput = this.element.querySelector('#body')! as HTMLInputElement;        
        if(this.textType === "note") {
            urlInput.placeholder = "Note..";
        }
        if(this.textType === "todo") {
            urlInput.placeholder = "Todo..";
        }        
        
    }

    get title(): string {
        const element = this.element.querySelector('#title')! as HTMLInputElement;
        return element.value;
    };

    get body(): string {
        const element = this.element.querySelector('#body')! as HTMLInputElement;
        return element.value;
    };
}