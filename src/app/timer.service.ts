import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class TimerService {

    private play: boolean = false;
    private pause: boolean = false;
    private reset: boolean = true;
    public playPauseReset$ = new EventEmitter();

    public playTimer() {
        this.play = true;
        this.pause = false;
        this.reset = false;

        this.playPauseReset$.emit({
            play: this.play
        });
    }

    public pauseTimer() {
        this.play = false;
        this.pause = true;
        this.reset = false;

        this.playPauseReset$.emit({
            pause: this.pause
        });
    }

    public resetTimer() {
        this.play = false;
        this.pause = false;
        this.reset = true;

        this.playPauseReset$.emit({
            reset: this.reset
        });
    }

}
