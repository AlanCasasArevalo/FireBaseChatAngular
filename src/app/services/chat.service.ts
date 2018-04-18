import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Message } from '../models/message.model';


@Injectable()
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Message>;

  public messages: Message[] = [];

  constructor(private afs: AngularFirestore) { }

  loadMessagesFromFirebase() {
    this.itemsCollection = this.afs.collection<Message>('messages', ref => ref
                                                                          .orderBy('date', 'desc')
                                                                          .limit(5));

    return this.itemsCollection.valueChanges()
                .map( (messages: Message[]) => {
                console.log(messages);

                this.messages = [];
                for (const message of messages) {
                  this.messages.unshift( message );
                }

                return this.messages;

                // this.messages = messages;
               });
  }

  addNewMessageToFirebase( text: string ) {
    const message: Message = {
      name : 'Demo',
      message: text,
      date: new Date().getTime()
    };

    return this.itemsCollection.add( message );
  }

}
