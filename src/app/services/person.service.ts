import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  data:any[] = [];
  grupos:any[] = [];
  constructor(private http: HttpClient) {
    this.personList().subscribe(data => {
      this.data = data;
      const masculinos = data.filter(per => per.gender == 'm');
      const femeninos = data.filter(per => per.gender == 'f');
      const otros = data.filter(per => per.gender == 'otro');
      this.grupos = [masculinos.length, femeninos.length, otros.length]
  });
}

personList() {
  return this.http.get<[any]>('http://localhost:3000/api/usuario/list')
}
personGet(id: string) {
  return this.http.get<[any]>('http://localhost:3000/api/usuario/' + id)
}
personEdit(id: string, body: any) {
  return this.http.put('http://localhost:3000/api/usuario/' + id, body)
}
personDelete(id: string) {
  return this.http.delete('http://localhost:3000/api/usuario/' + id)
}
personCreate(body: any) {
  return this.http.post('http://localhost:3000/api/usuario/create', body)
}

}
