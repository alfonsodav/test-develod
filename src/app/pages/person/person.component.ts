import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PersonService } from 'src/app/services/person.service';

export interface DialogData {
  id: number;
  name: string;
  gender: string;
}

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  data = [{id: '', name: '', gender: ''}];
  displayedColumns = ['id', 'name', 'gender', 'actions'];

  constructor(private person: PersonService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.list();
  }
  list() {
    this.person.personList().subscribe(data => {
      console.log(data);
      this.dataSource.data = data;
      this.data = data;
    })
  }
  onDelete(id: string) {
    const persona = this.data.find(per => per.id === id) || this.data[0];
    console.log(persona);
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {id: id, name: persona.name, animal: persona.gender},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.person.personDelete(id).subscribe(()=> {
          alert('eliminado correctamente');
          this.list();
        })
      }
      
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  template: `
<div mat-dialogcontent>
<p>Esta seguro de eliminar este usuario?</p>
<h1 mat-dialog-title> Hi {{ data.name }}</h1>
</div>
<div mat-dialog-actions>
<button mat-button (click)="onNoClick()"> No grancias </button>
<button mat-button [mat-dialog-close]="data.id" cdkFocusInitial>Ok</button>
</div>
  `
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
