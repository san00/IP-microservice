const express = require('express');
const app = express();
const requestIp = require('request-ip');
const browserLanguage = require('express-guess-lang');
const useragent = require('express-useragent');

//use dependencies in the app
app.use(browserLanguage.init());
app.use(useragent.express());

//use get call to return information as json
app.get("/",function(request, response){
  
  const ipaddress = requestIp.getClientIp(request);
  const language =  request.getLanguages()[0].name + "-" + request.getRegions();
  const software = request.useragent.platform + ", " + request.useragent.os + ", " + request.useragent.version;
       
  response.json({'ipaddress':ipaddress, 'language':language,'software':software});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
