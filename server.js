const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const db = require('./db/pgconfig.js')

// if you are using mongo/mongoose uncomment this line
// const Message = require('./db/Message');

// if you are using postgres, uncomment this line
const pool = require('./db/pgconfig');

app.use(bodyParser.json());

app.post('/api/messages',(req,res)=>{
   db.query('INSERT INTO MESSAGES (name,message) VALUES ($1,$2)',[req.body.name,req.body.message])
    .then(result=>{
      console.log(result);
      res.status(201).end()
    })
    .catch(error=>{
      console.log(error);
      res.status(400).end()
    })
})

app.get('/api/messages',(req,res)=>{
  db.query('SELECT * FROM messages')
   .then(result=>{
     console.log(result.rows);
     res.send(result.rows).end()
   })
   .catch(error=>{
     console.log(error);
     res.status(400).end()
   })
})

app.put('/api/messages/:id',(req,res)=>{
  db.query('UPDATE messages SET (name,message)=($1,$2) WHERE id=$3',[req.body.name,req.body.message,req.params.id])
   .then(result=>{
     console.log(result);
     res.status(200).end()
   })
   .catch(error=>{
     console.log(error);
     res.status(400).end()
   })
})

app.delete('/api/messages/:id',(req,res)=>{
  db.query('DELETE FROM messages WHERE id=$1',[req.params.id])
   .then(result=>{
     console.log(result);
     res.status(200).end()
   })
   .catch(error=>{
     console.log(error);
     res.status(400).end()
   })
})

app.get('/api/messages/:id',(req,res)=>{
  db.query('SELECT * FROM messages WHERE id=$1',[req.params.id])
   .then(result=>{
     console.log(result);
     res.send(result.rows[0]).end()
   })
   .catch(error=>{
     console.log(error);
     res.status(400).end()
   })
})

app.use((req,res,next) => {
  res.status(404).send('That route does not exist');
});

const port = 3000;

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
