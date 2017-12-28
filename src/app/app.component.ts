import { Component }	from '@angular/core';
import { Observable }	from 'rxjs/Rx';

import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/finally';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	countDown;
	count: number = 10;
	message: string = "Blast Off!"
    countCompleted: boolean = false;

		constructor() {

			this.countDown = Observable.timer(0,1000)
          	.take(this.count)
          	.map(()=> --this.count)
          	.finally(() => this.countCompleted = true);;
   }
}
