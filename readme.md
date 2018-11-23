# RESTful Routing

## REST 
- REspresentational State Transfer
- a architecture for mapping between HTTP routes and CRUD

## 7 RESTful ROUTES

Name       | Path          | HTTP Verb | Purpose                                          | Mongoose Method
---------- | :-----------: | :-------: | ------------------------------------------------ | ---------------
   INDEX   | /dogs         | GET       | List of all dogs                                 | Dog.find()
   NEW     | /dogs/new     | GET       | Show new dog form                                | N/A
   CREATE  | /dogs         | POST      | Add new dog to DB, then redirect somewhere       | Dog.create()
   SHOW    | /dogs/:id     | POST      | Show info about one clicked(specific) dog        | Dog.findById(id, callback)
   EDIT    | /dogs/:id/edit| POST      | Show edit form for one dog                       | Dog.findById(id, callback)
   UPDATE  | /dogs/:id     | POST      | Update a particular dog, then redirect somewhere | Dog.findByIdAndUpdate(id, newData, callback)
   DESTROY | /dogs/:id     | POST      | Delete a particular dog, then redirect somewhere | Dog.findByIdAndRemove(id, callback)

## Nested ROUTES

Name     | Path                 |
-------- | :------------------: |
NEW     | dogs/:id/comments/new |
CREATE  | dogs/:id/comments     |

## Authentication
### JWT - JSON Web Token
### Generating Auth Token Methods:
* User.findByToken
* user.generateAtuhToken

## HTTP Status Codes

### 1xx Informational

### 2xx Success
* 200 OK
* 201 Created
* 204 No Content

### 3xx Redirection
* 304 Not Modified

### 4xx Client Error
* 400 Bad Request
* 401 Unauthorized
* 403 Forbidden
* 404 Not Found
* 406 Not Acceptable
* 409 Conflict

### 5xx Server Error
* 500 Internal Server Error