const express = require('express'),
    mysql = require('mysql'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    app = express();

app.use(cors());
app.use(bodyParser())

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ToDoList'
})

app.listen(8080, ()=> {console.log('App is working!')})

conn.connect(err => {
    if(err) {
        console.log(err)
    }
    else {
        console.log('DB connected!')
    }
})

let dbData;
      
function serverUpdate() {
    conn.query('SELECT * FROM List ORDER BY date', (err, result, field) => {
        dbData = result
    })
}

serverUpdate()

app.get('/', (req, res) => {
    res.send(dbData)
})

app.post('/', (req, res) => {
    let data = [req.body.id, req.body.task, req.body.date, req.body.isDone, req.body.operation]
    if (data[4] == 'isDone') conn.query('UPDATE `list` SET `isDone`=' + data[3] + ' WHERE `id`=' + data[0])
    if (data[4] == 'delete') conn.query('DELETE FROM `list` WHERE `id`=' + data[0])
    if (data[4] == 'add' && (data[1] = '' || data[2] == null)) conn.query('INSERT INTO `list`(`id`, `task`, `date`, `isDone`) VALUES (?,?,?,?)', data)
    serverUpdate()
})