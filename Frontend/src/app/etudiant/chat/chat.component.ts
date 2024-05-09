// chat.component.ts

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/public/login/userservice';
import { MatiereService } from '../menu/service/matiere.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
    messages: any[] = [];
    newMessage: string = '';
    InfoEtud:any;
    userId:any;
    user:any;

    @ViewChild('messageContainer') private messageContainer?: ElementRef<HTMLDivElement>;
    @ViewChild('messageInput') private messageInput?: ElementRef<HTMLInputElement>;
    @ViewChild('sendButton') private sendButton?: ElementRef<HTMLButtonElement>;
  

    constructor(private http: HttpClient,private UserService:MatiereService) { }

    ngOnInit(): void {
        this.fetchMessages();
        setInterval(() => {
            this.fetchMessages();
        }, 100); 
        this.getInfoEtud();
        this.userId = this.UserService.getIdUser().subscribe(userId => {
            this.user=userId;
          });
          
    }
   fetchMessages() {
    const lastUpdateTimestamp = this.messages.length > 0 ? this.messages[this.messages.length - 1].timestamp : 0;
    this.http.get<any[]>(`http://localhost:3000/chat?lastUpdateTimestamp=${lastUpdateTimestamp}`).subscribe(data => {
        if (data.length > 0) {
            const tempMessages = [...this.messages]; // Copie temporaire des messages existants
            data.forEach(newMessage => {
                const exists = tempMessages.some(existingMessage =>
                    existingMessage.id_user === newMessage.id_user && existingMessage.message === newMessage.message
                );
                if (!exists) {
                    this.messages.push(newMessage);
                    tempMessages.push(newMessage); // Ajouter le nouveau message à la copie temporaire
                }
            });
            this.scrollToBottom();
            this.getInfoEtud();
        }
    });
}
resetInput() {
    if (this.messageInput) {
      this.messageInput.nativeElement.value = ''; // Réinitialiser la valeur de l'input à une chaîne vide
    }
  }

resetInputAndButton() {
    if (this.messageInput && this.sendButton) {
        this.messageInput.nativeElement.value = ''; // Réinitialiser le champ d'entrée
        if (this.sendButton.nativeElement) {
            this.sendButton.nativeElement.disabled = true; // Désactiver temporairement le bouton après l'envoi
            setTimeout(() => {
                if (this.sendButton?.nativeElement) {
                    this.sendButton.nativeElement.disabled = false; // Réactiver le bouton après un court délai
                }
            }, 100);
        }
    }
}



sendMessage() {
    if (this.newMessage.trim() !== '') {
        const user = this.user;
        console.log(user); 
        this.http.post('http://localhost:3000/chat', { user, message: this.newMessage }).subscribe(() => {
            this.newMessage = '';
            this.resetInput();
            this.resetInputAndButton(); // Réinitialiser le champ d'entrée et le bouton après l'envoi
            this.fetchMessages(); // Rafraîchir la liste des messages après l'envoi
            setTimeout(() => {
                this.scrollToBottom(); // Faire défiler vers le bas après le rafraîchissement
            }, 100);
        });
    }
    this.getInfoEtud();
    this.newMessage = '';
}
    scrollToBottom() {
        if (this.messageContainer && this.messageContainer.nativeElement) {
            this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
        }
    }




    getInfoEtud() {
        this.http.get<any[]>('http://localhost:3000/chat/all').subscribe((data: any[]) => {
            this.InfoEtud = data;
            console.log(this.InfoEtud);
    
        });
    }
    getUserName(userId: any): string {
        const user = this.InfoEtud.find((u: any) => u.id_user === userId);
        console.log(user);
        return user ? user.fullname : 'Utilisateur inconnu';
    }
    
    
}




