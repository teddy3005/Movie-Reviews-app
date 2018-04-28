import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  restaurant:any;
  clicked = false
  _id:any 

  constructor(private _route: ActivatedRoute, 
  private _router: Router,
  private _httpService: HttpService) { }

  ngOnInit() {
    this._route.params.subscribe((params:Params) => this._id=params['id']);
    this.findbyId();
  }
 
  findbyId(){
    let observable = this._httpService.findbyId(this._id);
    observable.subscribe(data => {
      this.restaurant = data['data']
      console.log("this is movie******", this.restaurant)
    })
  }

  // deleteReview(movie,review){
  //   console.log("ts e*****", movie, movie._id)
  //   let observable = this._httpService.deleteReview(movie,review);
  //   // console.log("this the delete*****", restaurant)
  //   observable.subscribe(data => {
  //     // console.log("this the delete*****", restaurant)
  //     this.findbyId()
  //     this.ngOnInit()
  //     // this._router.navigate(['/'])
  //   })
    
  // }

 
}
