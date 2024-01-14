import { BaseComponent, Component } from "../../component.js";
import { ErrorComponent } from "../../error.ts/error.js";
import { LoadingComponent } from "../../loading/loading.js";

export class ImageComponent extends BaseComponent<HTMLElement> {

    constructor(title: string, url: string) {
        super(`
            <section class="image">
                <div class="image__holder">
                    <img class="image__thumbnail">
                </div>
                <h2 class="page-item__title image__title"></h2>
            </section>
        `);        

        // loading start
        const loading = new LoadingComponent();
        const imageContainer = this.element.querySelector('.image__holder')! as HTMLElement;                
        loading.attachTo(imageContainer);
        
        // Image
        const titleElement = this.element.querySelector('.image__title')! as HTMLHeadingElement;
        titleElement.textContent = title;   

        const imageElement = this.element.querySelector('.image__thumbnail')! as HTMLImageElement;        
        imageElement.src = url;
        imageElement.alt = title;     

        // image loaded
        imageElement.onload = () => this.showLoading(imageContainer, loading);
        // image not loaded
        imageElement.onerror = () => this.showError(imageContainer, loading);
    }

    showLoading(parent: HTMLElement, loading: Component) {              
        loading.removeFrom(parent);
    }

    showError(parent: HTMLElement, loading: Component) {
        loading.removeFrom(parent);   
        
        if(parent.firstElementChild !== parent.querySelector('.image__thumbnail')) {
            throw new Error('Child Element not match');
        }

        parent.removeChild(parent.firstElementChild!); // 추후 해당 컴포넌트가 수정되면 firstChildElement가 아닐 수 있다는 유의점.
        // parent.removeChild(parent.querySelector('.image__thumbnail')!); 

        const error = new ErrorComponent();        
        error.attachTo(parent);                
    }
}