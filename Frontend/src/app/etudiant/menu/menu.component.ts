import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Matiere } from 'src/app/interfaces/matiere';
import { EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatiereService } from './service/matiere.service';
import { UserService } from 'src/app/public/login/userservice';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  public lesmatieres:any;
  InfoEtud:any;

  @Output() matiereSelected: EventEmitter<Matiere> = new EventEmitter();
  constructor(private http: HttpClient, private router: Router,private matiere:MatiereService, private userService :UserService) { }
 
  ngOnInit(): void {
    this.http.get('http://localhost:3000/matiere').subscribe(data => {
      this.lesmatieres = data;
      
    });
    this.matiere.setId(this.userService.getUserId());
   

    
  }
 
  onMatiereSelected(matiere: Matiere): void {
    this.matiereSelected.emit(matiere);
    this.matiere.setMatiereId(matiere.id);
    console.log(matiere.id);
    console.log(this.matiere.getMatiereId());
  }
  document():void{
    this.router.navigate(['etudiant/document'])
  }
  
  
}