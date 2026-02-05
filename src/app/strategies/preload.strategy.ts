import { Injectable, isDevMode } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { mergeMap, Observable, of, shareReplay, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data?.['preload']) {
      if (isDevMode()) {
        console.log(`Preloading ${route.path}`);
      }

      return timer(2000).pipe(
        mergeMap(() => load()),
        shareReplay(1)
      )
    }

    return of(null);
  }
}
