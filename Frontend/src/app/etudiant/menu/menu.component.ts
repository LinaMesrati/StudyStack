import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Matiere } from 'src/app/interfaces/matiere';
import { EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  public lesmatieres:any;

  @Output() matiereSelected: EventEmitter<Matiere> = new EventEmitter();
  constructor(private http: HttpClient, private router: Router) { }
 
  ngOnInit(): void {
    this.http.get('http://localhost:3000/matiere').subscribe(data => {
      this.lesmatieres = data;
    });
  }

  onMatiereSelected(matiere: Matiere): void {
    this.matiereSelected.emit(matiere);
  }
  document():void{
    this.router.navigate(['etudiant/document'])
  }
}