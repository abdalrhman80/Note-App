import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  baseUrl: string = 'https://note-sigma-black.vercel.app/api/v1/notes'
  noteList: BehaviorSubject<any> = new BehaviorSubject<any>(null)
  constructor(private _HttpClient: HttpClient) {
    this.getUserNotes().subscribe({
      next: response => this.noteList.next(response.notes),
      error: () => this.noteList.next(null)
    })
  }
  getUserNotes(): Observable<any> {
    return this._HttpClient.get(this.baseUrl)
  }
  addNote(noteData: any): Observable<any> {
    return this._HttpClient.post(this.baseUrl, noteData)
  }
  updateNote(noteData: any, noteId: string): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}/${noteId}`, noteData)
  }
  deleteNote(noteId: string): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}/${noteId}`)
  }
}
