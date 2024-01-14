import { BaseComponent } from "../../component.js";
export class MediaSectionInput extends BaseComponent {
    constructor(mediaType) {
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
        this.mediaType = mediaType;
        const titleInput = this.element.querySelector('#title');
        titleInput.placeholder = "제목을 입력하세요";
        const urlInput = this.element.querySelector('#url');
        if (this.mediaType === "image") {
            urlInput.placeholder = "이미지 url을 입력하세요";
        }
        if (this.mediaType === "video") {
            urlInput.placeholder = "Youtube URL을 입력하세요. (Live 제외)";
        }
    }
    get title() {
        const element = this.element.querySelector('#title');
        return element.value;
    }
    ;
    get url() {
        const element = this.element.querySelector('#url');
        return element.value;
    }
    ;
}
