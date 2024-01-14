import { ContentType } from "../../../app.js";
import { BaseComponent } from "../../component.js";
import { MediaData } from "../dialog.js";


export class MediaSectionInput extends BaseComponent<HTMLElement> implements MediaData{    
    constructor(private mediaType?: ContentType) {
        super(`
            <div>
                <div class="form__container">
                    <label for="title">Title</label>
                    <input type="text" id="title">
                </div>
                <div class="form__container">
                    <label for="url">URL</label>
                    <input type="text" id="url">
                </div>
            </div>
        `);                

        const titleInput = this.element.querySelector('#title')! as HTMLInputElement;
        titleInput.placeholder = "제목을 입력하세요";

        const urlInput = this.element.querySelector('#url')! as HTMLInputElement;        
        if(this.mediaType === "image") {
            urlInput.placeholder = "이미지 url을 입력하세요";
        }
        if(this.mediaType === "video") {
            urlInput.placeholder = "Youtube URL을 입력하세요. (Live 제외)";
        }        
        
    }

    get title(): string {
        const element = this.element.querySelector('#title')! as HTMLInputElement;
        return element.value;
    };

    get url(): string {
        const element = this.element.querySelector('#url')! as HTMLInputElement;
        return element.value;
    };
}