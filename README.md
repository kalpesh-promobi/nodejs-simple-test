# Instructions

Fork this repo, and when done issue a pull request for review.

# Requirements

1. This app must serve an index.ejs page
2. The index acts as a "contact us" form
3. The app must process the form POST, validate the parameters
4. If there are validation errors, the user should be notified about them
5. If there are no errors, the app should log the results and save the result to a mongo database

# Running app
1. Install and run mongodb (Mongodb configuration can be changed in app/config.js)
2. npm install
3. `node server.js`
4. Executing tests `mocha test`

PS: Added one more path to view submitted contact requests
http://localhost:5000/contacts
