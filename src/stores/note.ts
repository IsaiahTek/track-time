import { defineStore } from "pinia";

interface Note{
    id: String,
    title: String,
    details: String,
    date: Date,
}
type Notes = Note[]

export const useNoteStore = defineStore('note', {
    state: (): Notes => ([]),
    actions:{
        add(note:Note){
            console.log(`Adding ${note}`);
        },
        update(note:Note){
            console.log(`Updating ${note}`);
        },
        delete(id:String){
            console.log(`Deleting ${id}`);
        }
    }
});