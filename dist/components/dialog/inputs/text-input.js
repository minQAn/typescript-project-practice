import { BaseComponent } from "../../component.js";
export class TextSectionInput extends BaseComponent {
    constructor(textType) {
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
        this.textType = textType;
        const titleInput = this.element.querySelector('#title');
        titleInput.placeholder = "제목을 입력하세요";
        const urlInput = this.element.querySelector('#body');
        if (this.textType === "note") {
            urlInput.placeholder = "Note..";
        }
        if (this.textType === "todo") {
            urlInput.placeholder = "Todo..";
        }
    }
    get title() {
        const element = this.element.querySelector('#title');
        return element.value;
    }
    ;
    get body() {
        const element = this.element.querySelector('#body');
        return element.value;
    }
    ;
}
