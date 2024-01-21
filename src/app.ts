import { Component } from "./components/component.js";
import { InputDialog, MediaData, TextData } from "./components/dialog/dialog.js";
import { MediaSectionInput } from "./components/dialog/inputs/media-input.js";
import { TextSectionInput } from "./components/dialog/inputs/text-input.js";
import { ImageComponent } from "./components/page/item/image.js";
import { NoteComponent } from "./components/page/item/note.js";
import { TodoComponent } from "./components/page/item/todo.js";
import { VideoComponent } from "./components/page/item/video.js";
import { Composable, PageComponent, PageItemComponent } from "./components/page/page.js";


// ContenetType is used for making placeholder differently.
export type ContentType = 'image' | 'video' | 'note' | 'todo';

type InputComponentConstructor<T extends (MediaData | TextData) & Component> = {
    new(content?: ContentType): T; // key to make nullable in generic
}

class App {        
    private readonly page: Component & Composable; 

    constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
        this.page = new PageComponent(PageItemComponent);
        this.page.attachTo(appRoot);        

        /* Image
        const imageBtn = document.querySelector('#new-image')! as HTMLButtonElement;        
        imageBtn.addEventListener('click', () => {
            const dialog = new InputDialog();
            dialog.attachTo(dialogRoot);

            dialog.setOnCloseListener(() => {
                dialog.removeFrom(dialogRoot);
            });                    
            
            const mediaInputSection = new MediaSectionInput('image');
            dialog.addChild(mediaInputSection);

            dialog.setOnSubmitListener(() => {
                const image = new ImageComponent(mediaInputSection.title, mediaInputSection.url);
                this.page.addChild(image);
                dialog.removeFrom(dialogRoot);
            });            
        });
        */
        this.bindElementToDialog<MediaSectionInput>(
            '#new-image', 
            MediaSectionInput, 
            (input: MediaSectionInput) => new ImageComponent(input.title, input.url),
            'image',
        );

        /* Video
        const videoBtn = document.querySelector('#new-video')! as HTMLButtonElement;
        videoBtn.addEventListener('click', () => {
            const dialog = new InputDialog();
            dialog.attachTo(dialogRoot);

            dialog.setOnCloseListener(() => {
                dialog.removeFrom(dialogRoot);
            });

            const mediaInputSection = new MediaSectionInput('video');
            dialog.addChild(mediaInputSection);

            dialog.setOnSubmitListener(() => {
                const video = new VideoComponent(mediaInputSection.title, mediaInputSection.url);
                this.page.addChild(video)

                dialog.removeFrom(dialogRoot);
            });
        })
        */
        this.bindElementToDialog<MediaSectionInput>(
            '#new-video',
            MediaSectionInput,
            (input: MediaSectionInput) => new VideoComponent(input.title, input.url),
            'video',
        );

        /* Note
        const noteBtn = document.querySelector('#new-note')! as HTMLButtonElement;
        noteBtn.addEventListener('click', () => {
            const dialog = new InputDialog();
            dialog.attachTo(dialogRoot);

            dialog.setOnCloseListener(() => {
                dialog.removeFrom(dialogRoot);
            });

            const textInputSection = new TextSectionInput('note');
            dialog.addChild(textInputSection);

            dialog.setOnSubmitListener(() => {
                const note = new NoteComponent(textInputSection.title, textInputSection.body);
                this.page.addChild(note);

                dialog.removeFrom(dialogRoot);
            });
        });
        */
        this.bindElementToDialog<TextSectionInput>(
            '#new-note',
            TextSectionInput,
            (input: TextSectionInput) => new NoteComponent(input.title, input.body),
            'note'
        );
        /* Todo
        const todoBtn = document.querySelector('#new-todo')! as HTMLButtonElement;
        todoBtn.addEventListener('click', () => {
            const dialog = new InputDialog();
            dialog.attachTo(dialogRoot);

            dialog.setOnCloseListener(() => {
                dialog.removeFrom(dialogRoot);
            });

            const textInputSection = new TextSectionInput('todo');
            dialog.addChild(textInputSection);

            dialog.setOnSubmitListener(() => {
                const todo = new TodoComponent(textInputSection.title, textInputSection.body);
                this.page.addChild(todo);

                dialog.removeFrom(dialogRoot);
            });
        });
        */
        
        // Nullable Test sample 
        this.bindElementToDialog<TextSectionInput>(
            '#new-todo',
            TextSectionInput,            
            (input: TextSectionInput) => new TodoComponent(input.title, input.body)
            // undefined
        );
        

        // for Demo
        this.page.addChild(new ImageComponent('Image Title', 'https://picsum.photos/800/400'));
        this.page.addChild(new VideoComponent('Video Title', 'https://www.youtube.com/watch?v=SnctWnNqlqM'));
        this.page.addChild(new NoteComponent('Note TItle', "Don't forget coding everyday"));
        this.page.addChild(new TodoComponent('Todo Title', 'Typescript Practice'));
        // this.page.addChild(new ImageComponent('Image Title', 'https://picsum.photos/800/400'));
        // this.page.addChild(new VideoComponent('Video Title', 'https://www.youtube.com/watch?v=SnctWnNqlqM'));
        // this.page.addChild(new NoteComponent('Note TItle', "Don't forget coding everyday"));
        // this.page.addChild(new TodoComponent('Todo Title', 'Typescript Practice'));    
    }
    
    private bindElementToDialog<T extends (MediaData | TextData) & Component>(
        selector: string,
        InputComponent: InputComponentConstructor<T>,
        makeSection: (input: T) => Component, // callback
        contentType?: ContentType,
    ) {
        const todoBtn = document.querySelector(selector)! as HTMLButtonElement;
        todoBtn.addEventListener('click', () => {
            const dialog = new InputDialog();
            const inputSection = new InputComponent(contentType); // 추후 수정 image video note todo 별 추가 가능하게..
            dialog.addChild(inputSection);
            dialog.attachTo(this.dialogRoot);

            dialog.setOnCloseListener(() => {
                dialog.removeFrom(this.dialogRoot);
            });

            dialog.setOnSubmitListener(() => {
                // const todo = new TodoComponent(textInputSection.title, textInputSection.body);
                const component = makeSection(inputSection); // inputform을 받아서 그 값에 따라 타입별 section을 만들어주는 컴포넌트
                this.page.addChild(component);
                dialog.removeFrom(this.dialogRoot);
            });
        });
    }
}

new App(document.querySelector('.document')! as HTMLElement, document.body);