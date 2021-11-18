import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  data = [{ gender: '' }];
  grupos = [{ gender: '', counter: [0] }];
  constructor(private http: HttpClient) {
    this.personList().subscribe(data => {
      console.log(data);
      this.data = data;
      this.grupos = this.data.reduce((acc = [], value) => {
        const index = acc.findIndex(per => per.gender === value.gender);
        console.log(index);
          if (index >= 0)  {
            acc[index].counter.push(1)
          } else {
            acc.push({ gender: value.gender, counter: [1] })
          };
      return acc;
    }, [{ gender: '', counter: [0] }])
  });
}

personList() {
  return this.http.get<[]>('http://localhost:3000/api/usuario/list')
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
