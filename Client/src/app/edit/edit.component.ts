import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editRestaurant: {
    name:"",
    type:"",
    reviews:[{}]
  };
  
  error: any;
  _id:any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService

  ) { }

  ngOnInit() {
    this._route.params.subscribe((params:Params) => this._id=params['id']);
    this.getRestaurnatsfromServices();
    // console.log("222222222222222",this.id  )
  }

  getRestaurnatsfromServices(){
    console.log(this._id)
    let observable = this._httpService.findbyId(this._id);
    console.log("this is the id", this._id)
    observable.subscribe(data => {
      console.log("sd;fajsf",data)
      this.editRestaurant = data['data']
      console.log(this.editRestaurant)
    })
}



  changePet(): void{
    let observable = this._httpService.changeThePet(this.editRestaurant);
    let obs = this._httpService.showPetById(this.editRestaurant)

    observable.subscribe(data => {
      if ((data as any).message == "Error"){
        this.error = "All fields must to be at minimum 3 characters!"
        console.log("this is the errrrrrrr",this.error)
      }
      else {
        this._router.navigate(['/view/'])
      }
    })
  }


}

