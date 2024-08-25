import { NoteDb } from "@/models/note-db";
import { defineStore } from "pinia";

const noteDb = new NoteDb();
type NoteStoreType = {
    notes: Notes,
    totalPagesFetched: number
}
const nextPageToFetch = (currentPage:number, totalNotes: number):number=>{
    return totalNotes != 0 && (totalNotes % 50 == 0)
        ? currentPage+1
        : totalNotes == 0
            ? 0
            : currentPage;
}
export const useNoteStore = defineStore('note', {
    state: (): NoteStoreType => ({
        notes: [],
        totalPagesFetched: 0
    }),
    actions:{
        add(note:Note){
            noteDb.add(note);
        },
        update(note:Note){
            noteDb.update(note);
        },
        delete(id:number){
            noteDb.delete(id);
        },
        async getNoteByDate(date:number):Promise<Note[]>{
            const note = this.notes.filter((note)=>note.date == date);
            if(note.length){
                return note;
            }else{
                const nextPage = nextPageToFetch(this.totalPagesFetched, this.notes.length);
                const fetchedNote = await noteDb.fetch(nextPage, 50);
                if(fetchedNote != undefined){
                    
                    console.log("LENGTH ", this.notes.length);

                    (fetchedNote as Note[]).forEach((note, index)=>{
                        if(!this.notes.some((eN)=>(
                            eN.id == note.id
                        ))){
                            this.notes.push(note)
                        }
                    });
                    console.log("LENGTH ", this.notes.length)
                    this.totalPagesFetched = nextPage;
                }
                return this.notes.filter((note)=>note.date == date);
            }
        }
    }
});