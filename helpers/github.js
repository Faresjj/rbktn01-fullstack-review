const request = require('request');
const config = require('../config.js');

let getReposByUsername = (userName) => {
  return new Promise(function(resolve, reject) {


  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url:`https://api.github.com/users/${userName}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, function(error, response, body) {
    if (error) {
      console.log('oh myGod! error');
      reject(error)
    } else {
      var array = JSON.parse(body);
      var result = [];
      for (var i = 0; i < array.length; i++) {
        var obj = {}
        obj.userName = userName
        obj.repoName = array[i].name
        obj.url = array[i].html_url
        //obj.owner = owner
        //obj.id = id
        result.push(obj);
      }
      resolve(result)
    }
  })

    })

}

module.exports.getReposByUsername = getReposByUsername;