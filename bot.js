var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/schedule/;botRegexCstand = /^\/conference/;botRegexDL = /^\/roster/i;botRegexSalt = /^\/salt/;botRegexDstand = /^\/division/;botRegexRules = /^\/rules/
      botRegexAd=/^\/advance/;botRegexdying = /^\/dying/; botRegexSC = /^\/next/i; botODB = /(.*\s+)(.*odb)(\s+.*)/i; botGMLBOT = /^\/gmlbot/;botRegexPow = /^\/power/;
      botRegexP = /^\/PDL/i;  botRegexTw = /^\/twitch/i; botRegexSb = /^\/sub/; botRegexSh = /^\/schedulingrules/; botRegexHurt = /^\/hurt/i;
  var teamAb = ["NE","NO","ARI","PHI","CLE","TEN","OAK","DAL","IND","SEA","CIN","PIT","JAC"
                ,"BAL","SD","DEN","MIN","ATL","KC","NYG","GB","DET","HOU","STL","CHI","CAR",
                "MIA","BUF","SF","WAS","NYJ","TB"]
  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage("http://daddyleagues.com/GML/schedules");
    this.res.end();
  }
  else if(request.text && botRegexDstand.test(request.text)) {
    this.res.writeHead(200);
    postMessage("https://daddyleagues.com/gml/standings");
    this.res.end();
  }
  else if(request.text && botRegexPow.test(request.text)) {
    this.res.writeHead(200);
    postMessage("https://daddyleagues.com/gml/standing/ranking");
    this.res.end();
  }
  else if(request.text && botRegexCstand.test(request.text)) {
    this.res.writeHead(200);
    postMessage("https://daddyleagues.com/gml/standings/conference");
    this.res.end();
  }  
  else if(request.text && botRegexDL.test(request.text)) {
    this.res.writeHead(200);
    postMessage("http://daddyleagues.com/gml/team/"+request.text.substring(8,11)+"/roster");
    this.res.end();
  } 
  else if(request.text && botRegexSalt.test(request.text)) {
    this.res.writeHead(200);
    postMessage("http://i1.kym-cdn.com/photos/images/facebook/000/918/952/d5a.png");
    this.res.end();
  } 
  else if(request.text && botRegexAd.test(request.text)) {
    this.res.writeHead(200);
    postMessage("http://www.hackcollege.com/wp-content/uploads/2013/02/kno_advance.jpg");
    this.res.end();
  }
  else if(request.text && botRegexRules.test(request.text)) {
    this.res.writeHead(200);
    postMessage("https://daddyleagues.com/gml/rules");
    this.res.end();
  } 
  else if(request.text && botRegexdying.test(request.text)) {
    this.res.writeHead(200);
    postMessage("https://i.imgflip.com/xgtsl.jpg");
    this.res.end();
  } 
  else if(request.text && botRegexSC.test(request.text)) {
    this.res.writeHead(200);
    postMessage("http://daddyleagues.com/GML/team/"+request.text.substring(6,9)+"/schedule");
    this.res.end();
  }
  else if(request.text && botRegexP.test(request.text)) {
    this.res.writeHead(200);
    var req = request.text.substring(5,request.text.length);
    var rep = req.replace(/ /,"+");
    postMessage("http://daddyleagues.com/GML/players?name="+rep+"&position=all&team=all");
    this.res.end();
  }  

  else if(request.text && botRegexTw.test(request.text)) {
    this.res.writeHead(200);
    postMessage("http://www.twitch.tv/"+request.text.substring(8,request.text.length));
    this.res.end();
  } 
  else if(request.text && botRegexSb.test(request.text)) {
    this.res.writeHead(200);
    postMessage("http://www.reddit.com/r/maddenall32");
    this.res.end();
  } 
  else if(request.text && botRegexSh.test(request.text)) {
    this.res.writeHead(200);
    postMessage("https://docs.google.com/document/d/16cJD6ers2J59C9t3_fTZdvtz--membWK1-DrwN6KIWM/pub");
    this.res.end();
  } 
  else if(request.text && botRegexHurt.test(request.text)) {
    this.res.writeHead(200);
    postMessage("http://www.daddyleagues.com/gml/players?name=&position=all&team="+request.text.substring(6,9)+"&injured=1");
    this.res.end();
  } 
  else if(request.text && botODB.test(request.text)) {
    this.res.writeHead(200);
    postMessage("OBJ*");
    this.res.end();
  } 
  else if(request.text && botGMLBOT.test(request.text)) {
    this.res.writeHead(200);
    postMessage("http://media3.giphy.com/media/YCseTHF2I6CCA/giphy.gif");
    this.res.end();
  }
  else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage(response) {
  var botResponse,options, body, botReq;

  botResponse = response

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

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


exports.respond = respond;
