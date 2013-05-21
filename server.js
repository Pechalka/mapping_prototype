var express = require('express')
  , app = express()
  , layouts = require('express-ejs-layouts');

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser()); 
app.use(express.static(__dirname ));

app.use(express.session({ secret: 'zzzzzzz'} ));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('layout', 'layout');

app.use(layouts);

var mappings = [
    { from : '1', to : '2', type : 'def'},
    { from : '1', to : '2', type : 'eql'},
    { from : '1', to : '2', type : 'none'},
    { from : '1', to : '2', type : 'def'}            
];

app.get('/', function(req, res){
    res.render('edit', { m:   mappings });
});

app.post('/mapping/update', function(req, res){
   // console.log(req.body);
    mappings = req.body.mappings;
    res.json(mappings);
});



app.listen(8080, function(){
  console.log("Express server listening on port %d", '8080');
});