import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies = [];
  movie = {};

  // check:{title:"", description: "", _id:""};
  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _httpService:HttpService,) {}
  
    ngOnInit() {
    this.getAll();
    // this.getPet();
  }

  getAll(){
  let observable = this._httpService.getMovies();
  observable.subscribe(data => {
    console.log("*******got_DATA***",data);
    this.movies = data['data']
    this.movies.sort(function (a, b) {
      if (a.type < b.type) {
        return -1;
      }
      if (a.type > b.type) {
        return 1;
      }
      return 0
    })
  })
}


showPet(movie){
  console.log("1kjahglfkjsadhflas",movie)
  this._httpService.showPet(movie)
}






deleteIt(restaurant){
  console.log("ts e*****", restaurant, restaurant._id)
  let observable = this._httpService.deleteIt(restaurant);
  // console.log("this the delete*****", restaurant)
  observable.subscribe(data => {
    // console.log("this the delete*****", restaurant)
    this.getAll()
    // this._router.navigate(['/'])
  })
  
}

}
