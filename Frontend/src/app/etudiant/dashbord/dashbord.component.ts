import { Component, OnInit } from '@angular/core';
import { Matiere } from 'src/app/interfaces/matiere';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser'; 
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {
  private modalRef: NgbModalRef | null = null;
  public email: string = '';
  public description: string = '';
 constructor(private modalService: NgbModal,){};
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  public selectedMatiere: Matiere | null = null;

  onMatiereSelected(matiere: Matiere): void {
    this.selectedMatiere = matiere;
  }

  submitForm()
  {
    const templateParams = {
      to_email: this.email,
      subject: 'Subject of the email',
      body: this.description,
    };

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_USER_ID')
      .then((response: any) => {
        console.log('Email sent successfully:', response);
        alert('Email sent successfully.');
      })
      .catch((error: any) => {
        console.error('Error sending email:', error);
        alert('Error sending email. Please try again.');
      });
    }
   
    open(content:any)
    {
      this.modalRef =this.modalService.open(content, { size: 'lg' }); 
    }
}
