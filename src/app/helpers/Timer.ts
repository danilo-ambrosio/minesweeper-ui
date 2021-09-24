import { timer } from "rxjs";

export class Timer {
    seconds: number;
    minutes: number;
    stopped = false;

    constructor(elapsedTime: number) {
        this.minutes = elapsedTime > 60 ? Math.floor(elapsedTime / 60) : 0;
        this.seconds = elapsedTime > 60 ? elapsedTime % 60 : elapsedTime;
    }

    start(elapsedTime): Timer {
        const stopwatch = new Timer(elapsedTime);
        timer(0, 1000).subscribe(() => {
            stopwatch.advance();
        });
        return stopwatch;
    }

    advance() {
        if (!this.stopped) {
            if (this.seconds == 59) {
                this.seconds = 0;
                this.minutes++;
            } else {
                this.seconds++;
            }
        }

    }

    stop() {
        this.stopped = true;
    }

}