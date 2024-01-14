import { BaseComponent } from "../component.js";
export class LoadingComponent extends BaseComponent {
    constructor() {
        super(`
            <div class="loading">
                <div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        `);
    }
}
