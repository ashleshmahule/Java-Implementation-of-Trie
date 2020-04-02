const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

router.get('/',function(req,res){
  res.sendFile(__dirname + '/index.html');
});

router.get('/Trie.js',function(req,res){
  res.sendFile(__dirname + '/Trie.js');
});

router.get('/Node.js',function(req,res){
  res.sendFile(__dirname + '/Node.js');
});

router.get('/main.css',function(req,res){
  res.sendFile(__dirname + '/main.css');
});

router.get('/tree.css',function(req,res){
  res.sendFile(__dirname + '/tree.css');
});
router.get('/p5.min.js',function(req,res){
  res.sendFile(__dirname + '/p5.min.js');
});


app.use('/', router);
app.listen(process.env.PORT || 5000);

console.log('Running at Port 5000');