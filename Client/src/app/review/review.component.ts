import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
newReview:any;
movie: any;
error: any;
_id:any;

  constructor(private _route: ActivatedRoute, 
    private _router: Router,
    private _httpService: HttpService) { }

  ngOnInit() {
    this.newReview = {name:"",review:"",star:""}
    this.movie = this._httpService.movie;
    this._route.params.subscribe((params:Params) => this._id=params['id']);
    this.getAllRestaurants()
    // console.log(this.restaurant)
  }

  getAllRestaurants(){
    console.log("is this the id", this._id)
    let observable = this._httpService.findbyId(this._id);
    observable.subscribe(data =>{
      this.movie=data['data']
      console.log("this the rest data", this.movie)
    })
  
  }
  onSubmit():void{
    // console.log("hit the button",this.newReview.customer,this.newReview.star,this.newReview.reviews)
    let observable = this._httpService.newReview(this.movie._id, this.newReview);
    observable.subscribe(data =>{
      if(this.newReview.name.length <3){
        this.error = "Name needs to be at least 3 characters"
      }
      else if(this.newReview.review.length <3){
        this.error = "The review needs to be at least 3 characters"
      }
      else if(this.newReview.star.lenght ==0){
        this.error = "invalid rating"
      }
      else{
        this._router.navigate(['/view/' +this.movie._id])
      }
    }
    )
  }


}
