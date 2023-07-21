# Kvisionex

To start the server run command: npm start

Base URL
The base URL for all endpoints is: http://localhost:3000

Endpoints
POST /api/books
Create a new book.

Request Body
{
  "title": "Death of a Salesman",
  "genre": "Drama",
  "author": "Arthur Miller",
  "price": 590,
  "rating": 5
}
Response

Status Code: 200
{
    "status": true,
    "message": "success",
    "data": {
        "title": "Death of a Salesman",
        "author": "Arthur Miller",
        "genre": "Drama",
        "price": 590,
        "rating": 5,
        "_id": "64ba73e1cd3e82983fc4291f",
        "createdAt": "2023-07-21T12:02:41.613Z",
        "updatedAt": "2023-07-21T12:02:41.613Z",
        "__v": 0
    }
}

GET /api/books
fetch all books .

Response
Status Code: 200
{
    "status": true,
    "data": [
        {
            "_id": "64ba5b6a361bb31990cc7c97",
            "title": "Pride and Prejudice",
            "author": "Jane Austen",
            "genre": "Fiction",
            "price": 999,
            "createdAt": "2023-07-21T10:18:18.630Z",
            "updatedAt": "2023-07-21T10:18:18.630Z",
            "__v": 0
        },
        {
            "_id": "64ba5b96361bb31990cc7c99",
            "title": "Leaves of Grass",
            "author": "Walt Whitman",
            "genre": "Poetry",
            "price": 999,
            "createdAt": "2023-07-21T10:19:02.834Z",
            "updatedAt": "2023-07-21T10:19:02.834Z",
            "__v": 0
        }
    ]
}
GET /api/books/:id
Fetch a specific book by its ID.

Input
id - The ID of the book.

Response
Status Code: 200
{
    "status": true,
    "data": {
        "_id": "64ba398809e0373c8b9ac9f5",
        "title": "Dune",
        "author": "Frank Herbert",
        "genre": "Fiction",
        "price": 1509,
        "createdAt": "2023-07-21T07:53:44.470Z",
        "updatedAt": "2023-07-21T07:59:14.165Z",
        "__v": 0
    }
}

GET /api/genre/books
Fetch books by using filter genre

Input
genre

Response
Status Code: 200
{
    "status": true,
    "currentPage": 2,
    "totalPages": 2,
    "totalBooks": 7,
    "data": [
        {
            "_id": "64ba6dd1857afb0d27349547",
            "title": "The Kite Runner",
            "author": "Khaled Hosseini",
            "genre": "Fiction",
            "price": 660,
            "rating": 3.5,
            "createdAt": "2023-07-21T11:36:49.897Z",
            "updatedAt": "2023-07-21T11:36:49.897Z",
            "__v": 0
        },
        {
            "_id": "64ba6dfa857afb0d27349549",
            "title": "The Chronicles of Narnia",
            "author": "C.S. Lewis",
            "genre": "Fiction",
            "price": 1225,
            "rating": 3.5,
            "createdAt": "2023-07-21T11:37:30.119Z",
            "updatedAt": "2023-07-21T11:37:30.119Z",
            "__v": 0
        }
    ]
}

PUT /api/books/:id
Update a specific book by its ID.

Input
id - The ID of the book.

Request Body
{
"price": 880
} 

Response

Status Code: 200
{
    "status": true,
    "data": {
        "_id": "64ba73e1cd3e82983fc4291f",
        "title": "Death of a Salesman",
        "author": "Arthur Miller",
        "genre": "Drama",
        "price": 880,
        "rating": 5,
        "createdAt": "2023-07-21T12:02:41.613Z",
        "updatedAt": "2023-07-21T13:21:40.816Z",
        "__v": 0
    }
}

DELETE /api/books/:id
Delete a specific book by its ID.

Input

id - The ID of the book.

Response
Status Code: 200
{
    "status": true,
    "msg": "Document for given book Id is deleted."
}

Error Handling
If an error occurs, the API will respond with an appropriate status code and error message in the response body.

Status Code: 400 Bad Request
Body:
{
  "message": "Send Required Data"
}
Status Code: 404 Not Found
Body:
{
  "message": "No such book exist"
}