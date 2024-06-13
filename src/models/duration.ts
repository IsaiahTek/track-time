export class Duration implements Duration{
    weeks:number;
    days:number;
    hours:number;
    minutes:number;
    seconds:number;
    milliseconds:number;
    millisecondsLeft = this.totalMilliseconds;
    isTimeUp = this.totalMilliseconds <= 0

    private _totalMilliseconds = 0;

    private get totalMilliseconds(){
       return this._totalMilliseconds;   
    }

    private set totalMilliseconds(milliseconds:number){
        this._totalMilliseconds = milliseconds;
    }

    private _tickID : number | undefined = 0;
    private _isPaused = false;

    public tickTime(){
        let tickID
        if(!this.totalMilliseconds){
            this.totalMilliseconds = this.toMilliseconds()
        }
        if(this.totalMilliseconds){
            tickID = setInterval(()=>{
                if(this.totalMilliseconds){
                    this.totalMilliseconds = this.totalMilliseconds - 100;
                }
            }, 100)
        }
        this._tickID = tickID;
        return tickID;
    }

    pauseTick(){
        clearInterval(this._tickID);
        // this._tickID = undefined;
        this._isPaused = true;
    }

    now(){
        let newDuration = Duration.toDuration(this.totalMilliseconds)
        this.weeks = newDuration.weeks;
        this.days = newDuration.days;
        this.hours = newDuration.hours;
        this.minutes = newDuration.minutes;
        this.seconds = newDuration.seconds;
        this.milliseconds = newDuration.milliseconds;
        this.millisecondsLeft = this.totalMilliseconds;
        this.isTimeUp = this.totalMilliseconds <= 0;
        return this;
    }

    private weeksToMilliseconds():number{
        return this.weeks * 7 * 24 * 60 * 60 * 1000;
    }

    private daysToMilliseconds():number{
        return this.days * 24 * 60 * 60 * 1000;
    }

    private hoursToMilliseconds():number{
        return this.hours * 60 * 60 * 1000;
    }

    private minutesToMilliseconds():number{
        return this.minutes * 60 * 1000;
    }

    private secondsToMilliseconds():number{
        return this.seconds * 1000;
    }

    toMilliseconds():number{
        let totalMilliseconds = this.weeksToMilliseconds() + this.daysToMilliseconds() + this.hoursToMilliseconds() + this.minutesToMilliseconds() + this.secondsToMilliseconds() + this.milliseconds;
        return totalMilliseconds;
    }

    static toSeconds(milliseconds:number):number{
        return Math.floor(milliseconds/(1000));
    }

    static toDuration(milliseconds:number):Duration{
        let weeks = Math.floor(milliseconds / (7 * 24 * 60 * 60 * 1000));
        let weeksMillisecondsRemainder = milliseconds % (7 * 24 * 60 * 60 * 1000)

        let days = Math.floor(weeksMillisecondsRemainder / (24 * 60 * 60 * 1000));
        let daysMillisecondsRemainder = weeksMillisecondsRemainder % (24 * 60 * 60 * 1000);
        
        let hours = Math.floor(daysMillisecondsRemainder / (60 * 60 * 1000));
        let hoursMillisecondsRemainder = daysMillisecondsRemainder % (60 * 60 * 1000)

        let minutes = Math.floor(hoursMillisecondsRemainder / (60 * 1000));
        let minutesMillisecondsRemainder = hoursMillisecondsRemainder % (60 * 1000);

        let seconds = Math.floor(minutesMillisecondsRemainder / (1000));
        let secondssMillisecondsRemainder = minutesMillisecondsRemainder % (1000);
        
        return new Duration({weeks:weeks, days: days, hours: hours, minutes: minutes, seconds:seconds, milliseconds: secondssMillisecondsRemainder})
    }

    constructor(duration:{weeks?:number, days?:number, hours?:number, minutes?:number, seconds?:number, milliseconds?:number}){
        this.weeks = duration.weeks??0;
        this.days = duration.days??0;
        this.hours = duration.hours??0;
        this.minutes = duration.minutes??0;
        this.seconds = duration.seconds??0;
        this.milliseconds = duration.milliseconds??0;
    }

}