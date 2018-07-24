const express = require('express')
const bodyParser = require('body-parser');
const request = require('request');
const apikey ='cab828e283a8483e88a8ef506d81445f';
const app = express();
var counter = 0;
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))
app.get('/', function(req, res){
	counter = counter+1;
	console.log('Visited ' + counter + ' times')
res.render('index',{weather:null, error:null, visited:counter})
})
app.post('/', function(req,res){
	//res.render('index');

	let city = req.body.city;
//	console.log(city);
	//console.log(apikey);
	let url =`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apikey}`;
//	console.log('Url: '+url);
	request(url, function(err,response,body){
		if(err){
			res.render('index',{weather:null, error:'Error, please try again!', visited: counter});
		}
		else{
			let weather = JSON.parse(body);
			if(weather.main == undefined){
				console.log(weather);
				res.render('index', {weather:null, error:'Error parsing!, please try again', visited: counter});
			}
			else {
			//	console.log('posted successfully');
				let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}`;
				console.log(weatherText);
				res.render('index', {weather:weatherText, error:null, visited: counter});
			}
		}
	})
})
app.listen(3000,function(){
console.log('Example app listening on port 3000!')

})
