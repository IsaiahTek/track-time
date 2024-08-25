import { QueryResult } from "@tauri-apps/plugin-sql";
import { BaseModel } from "./base-db-model";

export class NoteDb extends BaseModel{
    constructor(){
        super();
        this.table = 'notes';
        // this.dropTable();
        this.createTableIfNotExist([
            'id INTEGER PRIMARY KEY',
            'title TEXT',
            'details TEXT',
            'date TEXT'
        ]);
    }
    async fetch(offset: number, amount: number): Promise<Note[]|any> {
        try{
            const result = await (await this.databaseObject).select<Note[]>(`SELECT * FROM ${this.table} LIMIT ${offset}, ${amount} `);
            console.log("NOTEs", result)
            return result;
        }catch(e){
            // 
        }
    }
    async add(note: Note): Promise<QueryResult|any> {
        try {
            const result = await (await this.databaseObject).execute(`INSERT INTO ${this.table} (title, details, date) VALUES($1, $2, $3)`, [note.title, note.details, note.date]);
            return result;
        } catch (error) {
            // 
        }
    }
    async update(modifiedNote: Note): Promise<QueryResult> {
        return (await this.databaseObject).execute(`UPDATE ${this.table} SET(title, details, date) VALUES($1, $2, $3) WHERE id = $4`, [modifiedNote.title, modifiedNote.details, modifiedNote.date, modifiedNote.id]);
    }
}