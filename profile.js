  // app.js
  // Problem: We need a simple way to look at a user's badge count and javascript points
  // Solution: Use node.js to connnect to Treehouse's API to get profile information to print out
  //you must require https module to use https
  const https = require('https');
  const http = require('http');

  function printError(error) {
    console.error(error.message);
  }


  //function to print message to console
  function printMessage(username, badgeCount, points) {
    const message = `${username}, has ${badgeCount} total badge(s) and ${points} points in Javascript`
    console.log(message);
  }

  function get(username) {
    try {
    // Connect to the API URL (https://teamtreehouse.com/username.json)
    const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
      if (response.statusCode === 200) {
        // read the data
        let body = "";
        response.on('data', data => {
          body += data.toString();
        });

        // parse the data
        response.on('end', () => {
          try {
            const profile = JSON.parse(body);

            let badgeCount = profile.badges.length
            let points = profile.points.JavaScript
            // print the data
            printMessage(username, badgeCount, points);
          } catch(error) {
            printError(error)
          }
        });
    } else {
      const message = `There was an error getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`
      const statusCodeError = new Error(message);
      printError(statusCodeError);
    }
  });

    //prints error in console if request fails
    request.on('error', error => console.error(`Problem with request: ${error.message}`));

  } catch(error){printError(error);}
}


module.exports.get = get;
