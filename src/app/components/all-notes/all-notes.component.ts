import { Component, OnInit, ViewChild } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';
import { MenuItem } from 'primeng/api';
import { ConfirmationService, MessageService } from 'primeng/api';

export interface User {
  _id: string;
  title: string;
  content: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

@Component({
  selector: 'app-all-notes',
  templateUrl: './all-notes.component.html',
  styleUrls: ['./all-notes.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class AllNotesComponent implements OnInit {
  notes: User[] = []
  menuItems: MenuItem[] | undefined;
  visible1: boolean = false;
  visible2: boolean = false;
  noteId!: string
  noteTitle!: string
  noteContent!: string
  notFoundFlag: boolean = false
  @ViewChild('OptionsMenu') OptionsMenu: any

  constructor(
    private _NoteService: NoteService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getUserNotes()
    this.menuItems = [
      {
        label: 'Edit',
        icon: 'fa-solid fa-edit',
        command: () => this.showDialog2()
      },
      {
        label: 'Delete',
        icon: 'fa-solid fa-trash',
        command: () => this.deleteNote(this.noteId)
      }
    ];
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Add new note' });
  }

  showOptions(event: Event, id: string, title: string, content: string) {
    this.OptionsMenu.toggle(event);
    this.noteId = id
    this.noteTitle = title
    this.noteContent = content
  }
  getUserNotes() {
    // this._NoteService.noteList.subscribe((response) => this.notes = response)
    this._NoteService.noteList.subscribe({
      next: response => this.notes = response,
      error: () => {
        this.notFoundFlag = true
      }
    })
  }
  // getUserNotes() {
  //   // this._NoteService.getUserNotes().subscribe(response => this.notes = response.notes)
  //   this._NoteService.noteList.subscribe((response) => this.notes = response)
  // }
  deleteNote(id: string) {
    this._NoteService.deleteNote(id).subscribe(() =>
      this._NoteService.getUserNotes().subscribe(response => this._NoteService.noteList.next(response.notes))
    )
  }

  showDialog1() {
    this.visible1 = true;
  }
  hideDialog1(event: boolean) {
    this.visible1 = event
  }

  showDialog2() {
    this.visible2 = true;
  }
  hideDialog2(event: boolean) {
    this.visible2 = event
  }
}
