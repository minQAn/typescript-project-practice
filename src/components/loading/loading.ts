import { BaseComponent } from "../component.js";

export class LoadingComponent extends BaseComponent<HTMLElement> {    
    constructor() {
        super(`
            <div class="loading">
                <div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        `);
    }
}