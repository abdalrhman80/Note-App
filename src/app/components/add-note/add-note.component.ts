import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent {
  @Input() visible1!: boolean;
  @Output() visibleChange = new EventEmitter<boolean>();
  noteDetails: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    content: new FormControl(null, [Validators.required])
  })

  constructor(private _NoteService: NoteService) { }
  hideDialog() {
    this.visible1 = false;
    this.visibleChange.emit(this.visible1);
  }

  sendNoteDetails(formContent: FormGroup) {
    if (formContent.valid) {
      this._NoteService.addNote(formContent.value).subscribe(
        () => {
          this.hideDialog();
          this.noteDetails.reset();
          this._NoteService.getUserNotes().subscribe(response => this._NoteService.noteList.next(response.notes))
        }
      )
    }
  }
}
