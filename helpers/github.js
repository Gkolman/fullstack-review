const axios = require('axios');
// const config = require('../config.js');


var getReposByUsername = (username) => {
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    method: 'get',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${TOKEN}`
    }
  };
  return axios(options)
}



var checkIfRepoExists = (repoid) => {

  // querry the database looking for repoid

}



module.exports = {
  getReposByUsername : getReposByUsername
}