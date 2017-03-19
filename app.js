var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

var logger = function(request, response, next){
  console.log("Logging...")
  // console.log(request.headers.user-agent);
  next();
}

app.use(logger);

//Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

//Static resources
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(request, response){
    response.render('index',{
      title: 'Customers'
    });
  // response.send('Hello');
});

app.post('/calculate',function(request, response){
  var answer = Number(request.body.firstNum) + Number(request.body.secondNum);
  response.render('index',{
    answer: answer.toLocaleString()
  });
});

app.listen(3000, function(){
  console.log("Server Started on port 3000...")
});
