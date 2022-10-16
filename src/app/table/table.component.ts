import { AfterViewInit, Component, ViewChild, OnInit, OnChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { AnimeService } from '../service/anime.service';
import { Show } from './show.model';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [AnimeService]
})
export class TableComponent implements OnInit, OnChanges {

  subscription = new Subscription();

  //list: Show[] = []

  displayedColumns: string[] = ['name', 'currentEpisode', 'totalEpisode', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(private animeService: AnimeService) { }

  ngOnInit(): void {
    this.getList();
  }

  ngOnChanges() {
    this.dataSource._updateChangeSubscription();
  }

  getList(): void {
    this.animeService.getAnime()
      .subscribe({
        next: data => {
          this.dataSource.data = data as any;
          this.dataSource.paginator = this.paginator;
        }
      });
  }

  refresh() {
    this.getList();
    this.dataSource._updateChangeSubscription();
  }

  removeAnime(id: number, index: number) {
    this.animeService.deleteAnime(id).subscribe();
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }
  addEpisode(show: Show){
    show.currentEpisode = show.currentEpisode + 1;
    this.animeService.addAnime(show).subscribe();
  }

  subtractEpisode(show: Show){
    show.currentEpisode = show.currentEpisode - 1;
    this.animeService.addAnime(show).subscribe();
  }
}