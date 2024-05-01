import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../document.service';
import { FileService } from './services/file.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  pdfFiles:any= [];

  constructor(private documentService: DocumentService,private fileService:FileService,private http:HttpClient) { }
  ngOnInit(): void {
    this.fileService.getPDFFiles().subscribe(
      files => {
        this.pdfFiles = files;
        console.log("PDF files:", this.pdfFiles);
      },
      error => {
        console.error('Error retrieving PDF files:', error);
      }
    );
  }
  
}
  
