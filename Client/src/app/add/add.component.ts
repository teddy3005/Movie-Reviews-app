import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';




@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  movie:any;
  newMovie: any;
  error: any;
  reviews: any;
  restaurant:any;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService) { }

  ngOnInit() {
    this.restaurant = this._httpService.restaurant;
    this.newMovie = { 
      title: "",};
    this.reviews = {
      name: "",
      review:"",
      star:""
    }
  }


  onButtonClickCreate(): void{
    console.log("sdfasdfasdf")
    
   let create = this._httpService.addMovie(this.newMovie);
  //  let obs = this._httpService.showPetById(this.newRestaurant)
  //  console.log("111111111111111111",this.newRestaurant)
    create.subscribe (data => {
       if(this.newMovie.title.length <3){
        this.error = "Title needs to be at least 3 characters"
      }
      else if(this.newMovie.review.length <3){
        this.error = "The review needs to be at least 3 characters"
      }
      else{
        this._router.navigate(['' + this.movie._id])
      }
      
      
      
      
      
      
      
      
      
      // if ((data as any).message == "Error"){
      //   console.log("111111111111111111",this.newMovie)
      //   this.error = "all fields must be minimum of 3 characters"
      // }
      // else{
      //   this._router.navigate([''])
      // }


     
      
    })
  }

}


