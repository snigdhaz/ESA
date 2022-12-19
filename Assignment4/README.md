1. Clone the repository.
2. Navigate to the directory.
3. Run command : `npm init`
4. Install dependencies : `npm install express express-rate-limit mongoose memory-cache jsonwebtoken --save`
5. Install and use nodemon : `npm install --save-dev nodemon`
6. In the package.json file, add `"start": ""nodemon index.js` under `scripts`
```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon index.js"
  },
```
7. In `index.js` replace `<PASSWORD>` with the password provided in the submission file
8. Run the file using the command : `npm start`
9. Test the API on http://localhost:3000/

## API
***Authentication***

**Request URL**: /login
Under Headers, add Authorization Key as 'Bearer <generated_token>'
**Request URL**: /inbound/sms

***Outbound***

**Request URL**: /outbound/sms

