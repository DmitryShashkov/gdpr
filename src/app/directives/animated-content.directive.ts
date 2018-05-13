import {AfterViewInit, Directive, ElementRef, Input, OnChanges} from "@angular/core";

@Directive({
    selector: '[animated-content]'
})
export class AnimatedContentDirective implements AfterViewInit, OnChanges {
    @Input() public content: string;

    @Input() public animateAppearance: boolean = true;
    @Input() public animateAppearanceClass: string = 'fadeIn';

    @Input() public animateHeight: boolean = true;
    @Input() public animateHeightDuration: number = 300;

    constructor (
        private ref: ElementRef
    ) { }

    public ngOnChanges () : void {
        if (!this.content) { return; }

        let element: HTMLElement = this.ref.nativeElement;

        let existingChild: HTMLSpanElement = element.children.item(0) as HTMLSpanElement;

        let newChild: HTMLSpanElement = document.createElement('span');

        if (this.animateAppearance) {
            newChild.classList.add('animated');
            newChild.classList.add(this.animateAppearanceClass);
        }

        newChild.innerText = this.content;

        if (existingChild) {
            element.replaceChild(newChild, existingChild);
        } else {
            element.appendChild(newChild);
        }

        if (this.animateHeight) {
            element.style.height = `${newChild.offsetHeight}px`;
        }
    }

    public ngAfterViewInit () : void {
        let element: HTMLElement = this.ref.nativeElement;

        if (this.animateHeight) {
            element.style.transition = `height ${this.animateHeightDuration}ms`;
        }
    }
}
