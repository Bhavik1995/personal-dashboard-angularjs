import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Note } from '../shared/note.model';
import { NoteService } from '../shared/note.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {

  constructor(private noteService: NoteService, private router: Router, private notificationService: NotificationService) { }

  showValidationErrors: boolean;

  ngOnInit(): void {
  }

  onFormSubmit(form: NgForm){
    console.log(form.value)

    if(form.invalid) return this.showValidationErrors = true

    const note = new Note(form.value.title, form.value.content);
    console.log(note);


    this.noteService.addNote(note);
    this.notificationService.show("Note Created")
    this.router.navigateByUrl("/notes")
  }

}
