import { BaseComponent } from "../component.js";

export class ErrorComponent extends BaseComponent<HTMLElement> {
    constructor() {
        super(`
            <div class="error">
                <div class="errorMessage">
                    이미지를 가져올 수 없습니다.
                </div>
            </div>
        `);
    }
}