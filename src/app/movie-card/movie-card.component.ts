import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SynopsisComponent } from '../synopsis/synopsis.component';
import { DirectorComponent } from '../director-view/director-view.component';
import { GenreComponent } from '../genre-view/genre-view.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  
  movies: any[]=[];
  //movies declared as an array
  user: any={};
  favoriteMovies: any[]=[];

  constructor(
    public UserRegistrationService: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
   
  }

  getMovies(): void {
    this.UserRegistrationService.getAllMovies().subscribe((res: any)=>{
      this.movies=res;
      return this.movies;
    })
  }

  getFavoriteMovies(): void {
    this.UserRegistrationService.getUser().subscribe((res: any)=>{
      console.log("res=fave movies",res)
      this.favoriteMovies=res.favoriteMovies;
      return this.favoriteMovies;
    })
  }

  openGenreDialog(name: string, genreName: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Genre: genreName    
        }
    });
  }

  openDirectorDialog(name: string, bio: string, birthyear: string, deathyear: string): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birthyear: birthyear,
        Deathyear: deathyear
      }
    });
  }

  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Name: title,
        Description: description
      }
    });
  }

  onToggleFavMovie(id: string): void {
    console.log("click", id)
    if(!this.favoriteMovies.includes(id)) {
      this.UserRegistrationService.addFavoriteMovie(id).subscribe((res)=>{
        this.favoriteMovies=res.favoriteMovies;
        this.snackBar.open('Movie added to favorites.', 'OK', {
          duration: 3000
       })
      }, (res) => {
      
        this.snackBar.open(res.message, 'OK', {
          duration: 4000
        });
      })
    } else {
      this.UserRegistrationService.removeFavoriteMovie(id).subscribe((res)=>{
        this.favoriteMovies=res.favoriteMovies;
        this.snackBar.open('Movie removed from favourites.', 'OK', {
          duration: 3000
       })
      }, (res) => {
        this.snackBar.open(res.message, 'OK', {
          duration: 4000
        });
      })
    }
  }
}