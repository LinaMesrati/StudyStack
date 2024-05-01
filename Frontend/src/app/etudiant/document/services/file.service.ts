import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private apiUrl = 'http://localhost:3000/document';

  constructor(private http: HttpClient) { }

  getPDFFiles() {
    return this.http.get(this.apiUrl);
  }
}
