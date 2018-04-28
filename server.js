// import { request } from "https";

var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var moment = require("moment");

var app = express();

app.use(express.static( __dirname + '/Client/dist' ));  //connecting the angualar app in express

// app.use(bodyParser.urlencoded({extended: true}));
// configure body-parser
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/my_first_db");
mongoose.Promise = global.Promise;



var MovieSchema = new mongoose.Schema({
    title: { type: String, required: [false, "Title name needs to be at least 3 characters"], minlength: [3, "Name needs to be at least 3 characters"]},
	reviews:[{
		name: { type: String, required: [false, "Name needs to be at least 3 characters"], minlength: [3, "Name needs to be at least 3 characters"]},
		review: {type: String, required: [false, "Review needs to be at least 3 characters"], minlength: [3, "Type needs to be at least 3 characters" ]},
		star: {type: Number, default: 0}
	}],
    
},
    { timestamps: true });

mongoose.model('Movie', MovieSchema);
var Movie = mongoose.model('Movie')


app.post("/create", function(req, res){
	console.log(req.body);
	var movie = new Movie();
    movie.title = req.body.title;
	movie.reviews.push({name:req.body.name,review:req.body.review,star:req.body.star})
	
  	movie.save(function(err){
		if(err){
            console.log("ERROR: ", err);
            res.json({message:"Error", res: err});
		}
		else{
			console.log('You successfully created a movie.' );
			res.json({message: "Success", data : movie});
		}
	})
})

// RETRIEVE ALL movies
app.get('/movies', function(req, res){
	Movie.find({}, function(err, movie){
		if(err){
			console.log("ERROR: ", err);
			res.json({message: "ERROR", error: err});
		}
		else{
			res.json({data:movie})
		}
	})
})



app.put('/review/:id', function (req, res){
	// console.log("push***nw**review", req.body.customer)
	var newReview = req.body
	// console.log("push***nw**review", req.params.id)
	Movie.update({ _id: req.params.id}, {$push: {reviews:{
		name:newReview.name,
		review:newReview.review,
		star:newReview.star,
	}}},
	function(err, movie){
			if (err) {
				console.log("return the error in add review", err);
				res.json({ message: "Error", movie: err})
			}else{
				res.json({ message: "success", data: movie })
			}
		});
	})
app.get('/getReviews/:id', function(req, res){
	Movie.find({_id: req.params.id}, function(err,data){
		if(err){
			res.json({ message: "Error", error:err});
		}
		else{
			res.json({ message: "success",data:movie})
		}
	})
})

app.put('/movies/:id', function(req, res){
	Movie.findOne({_id:req.params.id}, function(err,movie){
		if(err){
			res.json({ messages: "Error", error:err})
		}
		else{
			res.json({ message: "success", data:movie})
		}
	})
})




app.put('/movies/edit/:id', function(req, res){
	Movie.findOne({ _id: req.params.id}, function (err, movie){
		if(movie){
			movie.name = req.body.name;
            // restaurant.type = req.body.type;

		movie.save(function(err){
			if(err){
				res.json({ message: "Error", error: movie.errors })
			}
			else{
				res.json({ message: "success!!!!!!!", data: movie})
			
			}
		})
		}
	})
})

app.put('/reviews/remove/:id', function (req, res) {
    console.log("POST DATA", req.params.id);
    Movie.findOne({ _id: req.params.id }, function (err, author) {
        console.log(req.body)
        for(let i = 0; i < movie.reviews.length; i++){
       		if (req.body._id == movie.reviews[i]._id){
           	movie.reviews.splice(i, 1)

            }
        }
        movie.save(function (err) {

            if (err) {
                console.log("Returned error", err);

                // respond with JSON
                res.json({ message: "Error", error: err })
            }
            else {
                // respond with JSON
                console.log("REMOVED QUOTES");
                res.json({ message: "Success", data: movie })
            }
        })
 
    })
})


app.delete("/delete/:id", function(req, res){
	// console.log("delete is cliked", req.params.id)
	var id = req.params.id
	Movie.remove({ _id: id}, function(err){
		console.log("delete is cliked", req.params.id)
		if(err){
			console.log("ERROR: ", err);
			res.json({message: "ERROR", error: err});
		}
		else{
			res.json({message: "Success"})
		}
	})
})

// app.put('/pets/up/:id', function(req,res){
// 	console.log("hello*****",req.body._id);
// 	Pet.findOne({_id:req.params.id}, function(err, pet){
// 		console.log("the up works*****",req.body._id);
		
// 			pet.like += 1 
// 		pet.save(function (err){
// 			if(err) {
// 				res.json({message: "Error", error:pet.errors})
// 			}
// 			else{
// 				res.json({ message: "success"})
// 			}
// 		})
// 	})
// })

app.get('/movies/:id',function(req, res){
	// console.log("pooooop")
	Movie.findOne({_id:req.params.id}, function(err, movie){
		if (err){
			res.json({ message: "Error", error: err})
		}
		else{
			res.json({ message: "Success", data:movie})
		}
	})
})


// app.delete('/restaurants/remove/:id', function (req, res) {
//     console.log("POST DATA", req.params.id);
//     Pet.remove({ _id: req.params.id }, function (err) {


//         // if there is an error console.log that something went wrong!
//         if (err) {
//             console.log("Returned error", err);
//             // respond with JSON
//             res.json({ message: "Error", error: err })

//         }
//         else { // else console.log that we did well and then redirect to the root route

//             console.log('successfully removed a restaurant!');
//             res.json({ message: "Success" })
//         }
//     })
// })







app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./Client/dist/index.html"))
});

var server = app.listen(8000, function(){
    console.log("listening on port 8000");
    
});


