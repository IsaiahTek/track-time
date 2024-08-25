interface Duration{
    weeks?:number,
    days?:number,
    hours:number,
    minutes:number,
    seconds:number,
    milliseconds?:number,
    // millisecondsFraction:number
    toMilliseconds?():number,
    // getMillisecondsFraction():number
};

interface Note{
    id: String,
    title: String,
    details: String,
    date: number,
}
type Notes = Note[]

type DurationState = {duration: number}