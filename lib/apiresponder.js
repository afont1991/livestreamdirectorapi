exports.respond = function(res, result, error) {
  var responseObject = {
    timestamp: new Date().getTime()
  }

  if(error) {
    responseObject.error = error;
  } else {
    responseObject.result = result;
  }

  res.contentType('json');
  res.end(JSON.stringify(responseObject));
}