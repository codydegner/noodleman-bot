var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      baileyRegex = /^\/bailey$/,
      chaseRegex = /^\/chase$/,
      spencerRegex = /^\/spencer$/;

  if(request.text && baileyRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage("Existence is torment.");
    this.res.end();
  } else if(request.text && chaseRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage("REEEEEE.");
    this.res.end();
  } else if(request.text && spencerRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage("Poop monster.");
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage(var input) {
  var botResponse, options, body, botReq;

  botResponse = input;

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;