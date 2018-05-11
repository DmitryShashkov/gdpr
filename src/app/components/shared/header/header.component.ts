import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { QuoteModalComponent } from '../quote-modal/quote-modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
    selector: 'ng-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {
    @ViewChild('mainMenu')
    private mainMenu: ElementRef;

    @ViewChild('toggleButton')
    private toggleButton: ElementRef;

    private animatedEntries: NodeListOf<HTMLElement>;

    private isMenuExtended: boolean = false;

    public bsModalRef: BsModalRef;

    constructor (
        private renderer: Renderer2,
        private modalService: BsModalService
    ) { }

    public ngAfterViewInit () : void {
        this.animatedEntries = this.mainMenu.nativeElement.getElementsByClassName('animated');

        // for cascading effect of consistently appearing elements
        for (let i = 0; i < this.animatedEntries.length; i++) {
            this.animatedEntries.item(i).style.animationDelay = `${i * 50}ms`;
        }
    }

    public openModal () : void {
        const modalConfig = {
            'animated': true,
            'keyboard': true,
            'backdrop': true,
            'ignoreBackdropClick': false,
            'class': 'custom-modal'
        };

        this.bsModalRef = this.modalService.show(QuoteModalComponent, modalConfig);
    }

    public toggleMenu () : void {
        const mainMenuElement: HTMLElement = this.mainMenu.nativeElement;
        const toggleButtonElement: HTMLElement = this.toggleButton.nativeElement;

        const extendedClass: string = 'extended';
        const isActiveClass: string = 'is-active';
        const fadeInDownClass: string = 'fadeInDown';

        this.isMenuExtended = !this.isMenuExtended;

        if (this.isMenuExtended) {
            this.renderer.addClass(mainMenuElement, extendedClass);
            this.renderer.addClass(toggleButtonElement, isActiveClass);
        } else {
            this.renderer.removeClass(mainMenuElement, extendedClass);
            this.renderer.removeClass(toggleButtonElement, isActiveClass);
        }

        for (let i = 0; i < this.animatedEntries.length; i++) {
            const animatedElement: Element = this.animatedEntries.item(i);
            if (this.isMenuExtended) {
                this.renderer.addClass(animatedElement, fadeInDownClass);
            } else {
                this.renderer.removeClass(animatedElement, fadeInDownClass);
            }
        }
    }
}
