# CS 474 REST API Assignment

## How to use

1. Clone the repository.
2. Navigate to the directory.
3. Run command : `npm init`
4. Install dependencies : `npm install express body-parser mongoose --save`
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
9. Test the API on http://localhost:3000/rest/v1/

## REST API
***GET Product***
**Request URL**: /rest/v1/products
***GET User***
**Request URL**: /rest/v1/users
**GET User id***
**Request URL**: /rest/v1/users/<user_id>
***PUT CartItem API***
**Request URL**: /rest/v1/users/<user_id>/cart
***Retrieve UserCart***
**Request URL**: /rest/v1/users/<user_id>/cart


