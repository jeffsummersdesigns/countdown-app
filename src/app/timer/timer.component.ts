import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { TimerService } from '../timer.service';

@Component({
    selector: 'timer',
    templateUrl: './timer.component.html',
    styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {
    private playPauseResetUnsubscribe: any;

    start = 10;
    ticks = 0;
    
    minutesDisplay: number = 0;
    hoursDisplay: number = 0;
    secondsDisplay: number = 10;

    message: string = "Blast Off!"
    countCompleted: boolean = false;

    sub: Subscription;

    constructor(private timerService: TimerService) {        
    }

    ngOnInit() {
        this.playPauseResetUnsubscribe = this.timerService.playPauseReset$.subscribe((res: any) => this.playPauseReset(res));
    }

    ngOnDestroy() {
        this.playPauseResetUnsubscribe.unsubscribe();;
    }

    private playPauseReset(res: any) {
        if(res.play) {
            this.startTimer();
        } else if(res.pause) {
            this.pauseTimer();
        } else if (res.reset) {
            this.resetTimer();
        }
    }

    private startTimer() {
        let timer = Observable.timer(0, 1000);
        this.sub = timer.subscribe(
            t => {
                this.ticks = this.start - t; // decrement starting time by 1 every second
                //console.log(this.ticks);
                if(this.ticks == 0) { 
                    this.sub.unsubscribe(); // unsubscribe when reaching 0 so ticks don't go negative
                    this.countCompleted = true;
                }
                this.secondsDisplay = this.getSeconds(this.ticks);
                this.minutesDisplay = this.getMinutes(this.ticks);
                this.hoursDisplay = this.getHours(this.ticks);
            }
        );
    }

    private pauseTimer() {
        this.start = this.ticks;
        if (this.sub) this.sub.unsubscribe();
    }

    private resetTimer() {
        this.start = 10; // set start time back at 10 seconds
        this.ticks = 0;
        this.countCompleted = false;

        this.minutesDisplay = 0;
        this.hoursDisplay = 0;
        this.secondsDisplay = 10;
        if (this.sub) this.sub.unsubscribe();
    }

    private getSeconds(ticks: number) {
        return this.pad(ticks % 60);
    }

    private getMinutes(ticks: number) {
         return this.pad((Math.floor(ticks / 60)) % 60);
    }

    private getHours(ticks: number) {
        return this.pad(Math.floor((ticks / 60) / 60));
    }

    private pad(digit: any) { 
        return digit <= 9 ? '0' + digit : digit;
    }
}
