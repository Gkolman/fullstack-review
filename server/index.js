const express = require('express');
let app = express();
var bodyParser = require('body-parser');
var axios = require('axios');
var gitHelpers = require('../helpers/github.js')
var dbHelpers =  require('../database/index.js')
let port;

if (process.env.PORT) {
    port = process.env.PORT
} else {
    port = 1128
}


app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  console.log('this is working')
  console.log('info -> ', req.body.data)
  gitHelpers.getReposByUsername(req.body.data)
  .then(repos => {
    for (var repo of repos.data) {
      dbHelpers.save(repo)
    }
    res.end()
  })
  .catch( (err ) => {
    console.log('err -> ', err)
    res.end()
  })
});

app.get('/repos', function (req, res) {
  console.log('this is working')
  console.log('info -> ', req.body)

  dbHelpers.reposInDb()
  .then( (repos) => {
    var sortNewestFirst = repos.sort(function(a, b) {
      return b.createdAt - a.createdAt;
    });
    res.send(sortNewestFirst)
  })
  .catch((err)=> {
    console.log('err -> ', err)
    res.end()
  })

  // querry the data base

  // come up with a way to parse through the current dates


  // querry the database and get 25 repositories by the data


});

app.get('', function (req, res) {
  console.log('this is working')
  console.log('info -> ', req.body)

  // querry the data base

  // come up with a way to parse through the current dates


  // querry the database and get 25 repositories by the data

  res.end()

});


app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

