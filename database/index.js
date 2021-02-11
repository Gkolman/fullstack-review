const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('database connected')
  // we're connected!
});

let repoSchema = new mongoose.Schema({
  repoId: {
    type: Number,
    unique: true
  },
  name: String,
  username: String,
  repolink: String,
  createdAt: String,
  description: String
  // TODO: your schema here!
});

let Repo = mongoose.model('Repo', repoSchema);

var parseTime = (time) => {
  var year = time.slice(0,4)
  var month = time.slice(5,7)
  var day = time.slice(8,10)
  var hour = time.slice(11,13)
  var minute = time.slice(14,16)
  var second = time.slice(17,19)
  var time = year + month + day + hour + minute + second
  console.log('length -> ',time.length)
return parseInt(time)
}


let save = (repo) => {

  var time = parseTime(repo.created_at)
  var newRepo = new Repo({
    repoId: repo.id,
    name: repo.name,
    username: repo.owner.login,
    repolink: repo.html_url,
    createdAt: time,
    description: repo.description
  })
  return newRepo.save()
}


let reposInDb = (repId) => {
  return Repo.find()
  // return Repo.remove()

}

reposInDb()
.then((data) => {
  var sortNewestFirst = data.sort(function(a, b) {
    return b.createdAt - a.createdAt;
  });
  // console.log('sorted -> ', sortNewestFirst)
})
.catch((err) => {
  console.log('err -> ', err)
})

module.exports = {
  'save': save,
  'reposInDb': reposInDb
}