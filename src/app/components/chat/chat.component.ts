import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { element } from 'protractor';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  message = '';
  element: any;

  constructor( private _chatServices: ChatService ) {
    this._chatServices.loadMessagesFromFirebase()
        .subscribe( () => {
          setTimeout(() => {
            this.element.scrollTop = this.element.scrollHeight;
          }, 200);
        });

  }

  ngOnInit() {
    this.element = document.getElementById('app-messages');
  }

  sendMessage() {
    console.log(this.message);

    if (this.message.length === 0) {
      return;
    }

    this._chatServices.addNewMessageToFirebase(this.message)
        .then( () => this.message = '')
        .catch( (err) => console.log(`Error ${err}`));
  }

}
