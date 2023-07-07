#  Varthak Assignment

## Features

- JWT Based Authentication
- Role Based Authorization
- Create Book
- Seel All Books
- Password Hashing
- See All Books Create before 10 min. and Earlier
- See All Books Created within last 10 min.
- logs (You can see all logs in logger.txt or in CLI)


## Tech Stack

**Server:** Node.js, Express.js, Mongoose, TypeScript.

**Database:** MongoDB.

**NPM Packages:** bcrypt, express, dotenv, jsonwebtoken, mongoose, @types/bcrypt, @types/express, @types/jsonwebtoken, @types/mongoose

## Run Locally

Clone the project

```bash
  git clone https://github.com/raj8888/Varthak_Assignment.git
```

Go to the project directory

```bash
  cd Varthak_Assignment
```

Install dependencies

```bash
  npm install
```

Start the server (Download nodemon npm library globally)

```bash
  npm install -g nodemon
```

```bash
  nodemon index.ts
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`mongoDBURL`

`port`

`JWT_SECRET`



## API Reference

#### Welcome

```http
  GET /api
```

## For Login And Registration


#### User Register

```http
  POST /api/users/register
```

#### User Login

```http
  POST /api/users/login
```

## For Books


#### For Create Book
- Authorization Required
- Only `CREATOR` can create books

```http
  POST /api/books
```

#### Retrieve all books created 10 minutes ago and earlier

```http
  GET /api/books?old=1
```

#### Retrieve all books created less than 10 minutes ago

```http
  GET /api/books?new=1
```

#### VIEWER/CREATOR can see all books created by them 

```http
  GET /api/books/
```

#### VIEW_ALL can see all books

```http
  GET /api/books/
```



**Authentication Required All Routes Except Login and Register**

## Backend Deployed Demo[https://strange-ruby-pajamas.cyclic.app](
https://strange-ruby-pajamas.cyclic.app)


## Author

- [@raj8888](https://github.com/raj8888)

