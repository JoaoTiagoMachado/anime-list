import { AnimeService } from './../service/anime.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {Location} from '@angular/common'; 

@Component({
  selector: 'app-add-anime',
  templateUrl: './add-anime.component.html',
  styleUrls: ['./add-anime.component.scss']
})
export class AddAnimeComponent {
  animeForm = this.fb.group({
    name: [null, Validators.required],
    currentEpisode: [null, Validators.required],
    totalEpisode: [null, Validators.required]
  });

  constructor(private fb: FormBuilder, private animeService: AnimeService) { }

  onSubmit(): void {
    console.log(this.animeForm.value);
    this.animeService.addAnime(this.animeForm.value).subscribe();
    location.replace('/table')
  }
}
