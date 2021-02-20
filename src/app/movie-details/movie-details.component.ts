import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieModel } from '../models/MovieModel';
import { SubCategory } from '../models/SubCatgory';
import { HomeService } from '../services/home.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private homeService: HomeService,
    private sanitizer: DomSanitizer
  ) { }

  model: MovieModel = null;
  film: File = null;

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(param => {
      var movieId = +param.get('id');
      if (movieId) {
        this.homeService.GetMovie(movieId).subscribe(movie => {
          this.model = movie;
          for (let i = 0; i < this.model.links.length; i++) {
            const link = this.model.links[i].movLink;
            if (link !== null && link !== '' && !link.startsWith('http')) {
              const urlImage = 'assets/videos/' + link;
              fetch(urlImage).then(res => res.blob()).then(blob => {
                var file = new File([blob], link);
                this.film = file;
                var id = $('#mov');
                id[0].src = URL.createObjectURL(this.film);
                id.parent()[0].load();
              })
            }
          }

        }, ex => {
          console.log(ex);
        })

      }
    })
  }

  getEmbedLink(strLink: string) {
    if (strLink !== null && strLink !== '') {
      if (strLink.includes('watch?v=')) {
        var link = strLink.replace('watch?v=', 'embed/');
        return this.sanitizer.bypassSecurityTrustResourceUrl(link);
      } else if (strLink.includes('youtu.be')) {
        var link = strLink.replace('youtu.be', 'youtube.com/embed/');
        return this.sanitizer.bypassSecurityTrustResourceUrl(link);
      }
    }
    return strLink;
  }

  GetMovieByActors(id: number) {
    this.router.navigate(['/home', id]);
  }

  DownloadVideo(link: string) {
    if (link) {
      if (link.startsWith('http')) {
        window.location.href = link;
      } else {
        window.location.href = 'assets/videos/' + link;
      }
    }
  }

}
