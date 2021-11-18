import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.scss']
})
export class PersonEditComponent implements OnInit {
  personForm = new FormGroup({
    name: new FormControl(
      { value: '', disabled: false },
      [Validators.required]),
    gender: new FormControl(
      { value: '', disabled: false },
      [Validators.required, Validators.pattern('^[0-9]*\.?[0-9]*$')])
  });
  constructor(private personService: PersonService, private activate: ActivatedRoute) { }

  ngOnInit(): void {
    this.activate.params.subscribe(data => {
      if (data.id) {
        this.getPerson(data.id);
      }
    })
  }
  getPerson(id: any) {
    this.personService.personGet(id).subscribe(data => {
      this.personForm.controls.gender.setValue(data[0].gender);
      this.personForm.controls.name.setValue(data[0].name);
    });
  }
  onSave() {
    const person = {
      gender: this.personForm.controls.gender.value,
      name: this.personForm.controls.name.value
    }
    this.personService.personCreate(person).subscribe(data => {
      alert('Creado correctamente');
      console.log(data);
    }, error => {
      alert('ocurrio un error');
      console.log(error);
    })
  }

}
