import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
  restaurant: any;
  constructor(private _http: HttpClient) {}


getMovies(){
  return this._http.get('/movies')
}

addMovie(newMovie){
  return this._http.post('/create',newMovie);
}


showPet(movie){
  console.log("at the service", movie)
  this.restaurant = movie

  }

newReview(_id,review){
  console.log("this is in the services",_id)
  return this._http.put('/review/'+ _id, review)
}

findbyId(_id){
  return this._http.get('/movies/'+_id)
}

// changeThePet(editRestaurant){
//   this.movie = editRestaurant
//   console.log('/pets/edit/' + this.movie._id)
//   return this._http.put('/movies/edit/' + this.movie._id,this.movie)
// }

// showPetById(movie) {
//   return this._http.get('/movies/' + movie._id, this.movie)

  // }
getReviews(review){
  return this._http.get('/getReviews/'+review._id )
}

deleteReview(restaurant, review){
  console.log("99999999999999"+restaurant)
  return this._http.put('/reviews/remove/' +restaurant._id,review)
}

deleteIt(movie){
  console.log("delete at Services" + movie._id)
  return this._http.delete('/delete/'+ movie._id)
  }




}