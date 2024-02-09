# Installation

To run the Node server locally, follow these steps:

1. Clone this repository to your local machine using the following command:
   `git clone https://github.com/fazal-a/NidaMumtaz-NodeTS-TypeORM-PgSQL.git`

2. Navigate to the project directory: `cd NidaMumtaz-NodeTS-TypeORM-PgSQL`

3. Install the dependencies: `npm install`

4. Start the development server: `npm run dev`

# Testing

## Getting file names and content

- **get all files names with file extension:**
- Endpoint: `http://localhost:5000/files/getFiles/`
- Method: `get`
- Sample Body:
 ```json
 {
  "fileExtension": "txt"
}
 ```

- **get one file content with file name:**
- Endpoint: `http://localhost:5000/files/fileContent/`
- Method: `get`
- Sample Body:
 ```json
 {
  "fileName":"test.txt"
}
 ```

## Download Content From Urls

- **download content from urls:**
- Endpoint: `http://localhost:5000/content/downloadContent/`
- Method: `get`
- Sample Body:
 ```json
 {
  "urls":["https://jsonplaceholder.typicode.com/posts/1",
    "https://jsonplaceholder.typicode.com/posts/2",
    "https://jsonplaceholder.typicode.com/posts/3"]
}
 ```

## User CRUD

- **Login User:**
- Endpoint: `http://localhost:5000/users/login`
- Method: `POST`
- Sample Body:
 ```json
 {
   "email": "abbas@test.com",
   "password": "password1"
 }
 ```

- **Get User:**
- Endpoint: `http://localhost:5000/users/getUser`
- Method: `POST`
- Sample Body:
 ```json
 {
   "email": "fazal@test.com"
 }
 ```

- **Create User:**
- Endpoint: `http://localhost:5000/users/createUser`
- Method: `POST`
- Header: `token: `
- Sample Body:
 ```json
 {
   "name": "fazal",
   "email": "fazal@test.com",
   "password": "password"
 }
 ```

- **Update User:**
- Endpoint: `http://localhost:5000/users/update?id=<id>`
- Method: `PUT`
- Header: `token: `
- Params: Replace `<id>` with the user ID
- Sample Body:
 ```json
 {
   "name": "fazal",
   "email": "fazal@test.com"
 }
 ```

- **Delete User:**
- Endpoint: `http://localhost:5000/users/delete?id=<id>`
- Method: `DELETE`
- Header: `token: `
- Params: Replace `<id>` with the user ID

## Posts CRUD

- **get all posts:**
- Endpoint: `http://localhost:5000/posts/`
- Method: `get`
- Header: `token: `

- **get post by id:**
- Endpoint: `http://localhost:5000/posts/getPost?id=<id>`
- Method: `get`
- - Params: Replace `<id>` with the user ID

- **Create Post:**
- Endpoint: `http://localhost:5000/posts/addPost`
- Method: `POST`
- Header: `token: `
- Sample Body:
 ```json
 {
  "postTitle": "Sunshine",
  "user":{"id":1,"name":"","email":"","password":""},
  "postDescription":""
}
 ```

- **Update Post:**
- Endpoint: `http://localhost:5000/posts/update?id=<id>`
- Method: `PUT`
- Header: `token: `
- Sample Body:
 ```json
 {
  "postTitle": "Sunshine",
  "postDescription":""
}
 ```

- **Delete Post:**
- Endpoint: `http://localhost:5000/posts/delete?id=<id>`
- Method: `DELETE`
- Header: `token: `
- Params: Replace `<id>` with the post ID
