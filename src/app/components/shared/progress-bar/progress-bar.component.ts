import {AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild} from "@angular/core";

@Component({
    selector: 'progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnChanges, AfterViewInit {
    @ViewChild('barLine') private barLine: ElementRef;

    @Input() public progress: number = 0;

    @Input() public styleHeight: number = 3;
    @Input() public styleBorderRadius: number = 3;
    @Input() public styleColors: string[] = [];

    constructor () {}

    public ngOnChanges () : void {
        this.setBarLineColors();
    }

    public ngAfterViewInit () : void {
        this.setBarLineColors();
    }

    private setBarLineColors () {
        if (this.barLine && this.styleColors.length) {
            const barElement: HTMLElement = this.barLine.nativeElement;
            barElement.style.background = `linear-gradient(to right, ${this.styleColors.join(', ')})`;
        }
    }
}
