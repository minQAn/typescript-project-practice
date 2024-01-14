import { BaseComponent } from "../../component.js";
import { ErrorComponent } from "../../error.ts/error.js";
import { LoadingComponent } from "../../loading/loading.js";
export class ImageComponent extends BaseComponent {
    constructor(title, url) {
        super(`
            <section class="image">
                <div class="image__holder">
                    <img class="image__thumbnail">
                </div>
                <h2 class="page-item__title image__title"></h2>
            </section>
        `);
        const loading = new LoadingComponent();
        const imageContainer = this.element.querySelector('.image__holder');
        loading.attachTo(imageContainer);
        const titleElement = this.element.querySelector('.image__title');
        titleElement.textContent = title;
        const imageElement = this.element.querySelector('.image__thumbnail');
        imageElement.src = url;
        imageElement.alt = title;
        imageElement.onload = () => this.showLoading(imageContainer, loading);
        imageElement.onerror = () => this.showError(imageContainer, loading);
    }
    showLoading(parent, loading) {
        loading.removeFrom(parent);
    }
    showError(parent, loading) {
        loading.removeFrom(parent);
        if (parent.firstElementChild !== parent.querySelector('.image__thumbnail')) {
            throw new Error('Child Element not match');
        }
        parent.removeChild(parent.firstElementChild);
        const error = new ErrorComponent();
        error.attachTo(parent);
    }
}
