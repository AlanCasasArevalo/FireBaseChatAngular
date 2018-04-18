import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Message } from '../models/message.model';

// Able FireAuth
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Message>;

  public messages: Message[] = [];
  public user: any = {};

  constructor(
    private afs: AngularFirestore,
    public afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe( user => {
      console.log(` El user que ha venido al autenciar es:`);
      console.log(user);
      if (!user) {
        return;
      }

      this.user.name = user.displayName;
      this.user.uid = user.uid;

    });
  }

  login( provider: string ) {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }

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
