import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  constructor(private personService: PersonService) { }

  ngOnInit(): void {
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
