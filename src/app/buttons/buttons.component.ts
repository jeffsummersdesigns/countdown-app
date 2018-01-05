import { Component, OnInit, OnDestroy } from '@angular/core';
import { TimerService } from '../timer.service';

@Component({
    selector: 'buttons',
    templateUrl: './buttons.component.html',
    styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit, OnDestroy {

    private playPauseResetUnsubscribe: any;
    public play: boolean;

    constructor(private timerService: TimerService) {
    }

    ngOnInit() {
        this.playPauseResetUnsubscribe = this.timerService.playPauseReset$.subscribe((res: any) => this.setPlay(res));       
    }

    ngOnDestroy() {
        this.playPauseResetUnsubscribe.unsubscribe();
    }

    private setPlay(res: any) {
        (res.play) ? this.play = true : this.play = false;
    }

    playTimer() {
        this.timerService.playTimer();
    }

    pauseTimer() {
        this.timerService.pauseTimer();
    }

    resetTimer() {
        this.timerService.resetTimer();
    }

}