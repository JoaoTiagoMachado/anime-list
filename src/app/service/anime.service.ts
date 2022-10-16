import { Show } from './../table/show.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AnimeService implements OnDestroy {

  subscription = new Subscription();
  private showUrl = 'http://localhost:8080/shows'; 

  constructor(private http: HttpClient) {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addAnime(anime: any) {
    return this.http.post<any>('http://localhost:8080/shows/save', anime);
  }

  getAnime(): Observable<Show[]> {
    return this.http.get<Show[]>(this.showUrl);
  }

  deleteAnime(id: number): Observable<any>{
    const url = `${this.showUrl}/${id}`;
    return this.http.delete(url);
  }
}
