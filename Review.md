# Review Questions

## What is Node.js?
  A runtime environment that allows js to be run outside of the browser.

## What is Express?
  Express is a Node.js module that abstracts out some of the Node.js functions and makes it simpler. Used to build restful web servers.

## Mention two parts of Express that you learned about this week.
  Express allows us to parse the body of our req object, and using express.Router to route through my application.

## What is Middleware?
  Intercepts data between the req and res to perform useful functions on it.

## What is a Resource?
  Key principle of restful API's: everything is a resource.

## What can the API return to help clients know if a request was successful?
  Status codes and messages.

## How can we partition our application into sub-applications?
  By organizing parts of the application into separated directories.

## What is express.json() and why do we need it?
  express.json() is middleware that allows us to use information stored in the body of the HTTP request.
