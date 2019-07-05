
import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { isValid } from './helpers';
import { takeUntil } from 'rxjs/operators';

export class BaseComponent implements OnDestroy {

  ngUnsubscribe = new Subject();
  pipeUnsubscribe = takeUntil(this.ngUnsubscribe);

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.ngUnsubscribe.unsubscribe();
  }

  isValid = (value: any) => isValid(value);
}
