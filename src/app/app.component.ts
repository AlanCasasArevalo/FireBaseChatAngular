import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';

// angular/angularfire2
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  messages: Observable<any[]>;

  constructor(database: AngularFirestore) {
    this.messages = database.collection('messages').valueChanges();
  }
}
