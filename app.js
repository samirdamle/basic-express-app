var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

var toDos = [
    {
        title: 'Get milk',
        completed: false
    },
    {
        title: 'Dump trash',
        completed: false
    }
];

var listToDos = function (req, res) {
    var html = '<ol>';
    for(var i = 0; i < toDos.length; i++){
        html = html + '<li><a href="/' + i + '">' + toDos[i].title + '</a></li>';
    }
    html = html + '</ol>';

    res.send(html);
};

var getToDoById = function (req, res) {
    var id = parseInt(req.params.id);
    if(id >= toDos.length){
        res.send('Can\'t find your To Do No.' + id);
    }

    res.send('<a href="/">Back</a><p>To Do No.' + (id + 1) + ': ' + toDos[id].title + '!</p>');
};

var createToDo = function(req, res){
    var toDo = req.body;
    if((toDo.title !== undefined) && (toDo.completed !== undefined)){
        toDos.push(toDo);
    }

    res.send('Created To Do: ' + toDo.title);
};

app.get('/', listToDos);
app.get('/:id', getToDoById);
app.post('/', createToDo);

app.listen(3000, function () {
    console.log('to-do-app listening on port 3000!');
});