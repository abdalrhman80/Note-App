import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NoteService } from 'src/app/services/note.service';
@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit {
  @Input() visible2!: boolean;
  @Input() noteId!: string;
  @Input() noteTitle!: string;
  @Input() noteContent!: string;
  @Output() visibleChange = new EventEmitter<boolean>();
  updateNoteForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    content: new FormControl(null, [Validators.required])
  })

  constructor(private _NoteService: NoteService) { }
  ngOnInit(): void {
    this.updateNoteForm.setValue({ title: this.noteTitle, content: this.noteContent })
  }
  
  hideDialog() {
    this.visible2 = false;
    this.visibleChange.emit(this.visible2);
  }

  updateNote(formContent: FormGroup) {
    this._NoteService.updateNote(formContent.value, this.noteId).subscribe(() => {
      this._NoteService.getUserNotes().subscribe(response => this._NoteService.noteList.next(response.notes))
      this.hideDialog();
    })
  }
}
