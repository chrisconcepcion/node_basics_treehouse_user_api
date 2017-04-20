  // app.js
  // Problem: We need a simple way to look at a user's badge count and javascript points
  // Solution: Use node.js to connnect to Treehouse's API to get profile information to print out

// ./ is mandatory
  const profile = require('./profile.js');

// put these arguments when using node to start the app
// node app.js chalkers
  const users = process.argv.slice(2);
  users.forEach(profile.get)
