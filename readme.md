# RESTful Routing

## REST 
- REspresentational State Transfer
- a architecture for mapping between HTTP routes and CRUD

## 7 RESTful ROUTES

Name       | Path          | HTTP Verb | Purpose                                          | Mongoose Method
---------- | ------------- | --------- | ------------------------------------------------ | ---------------
1. INDEX   | /dogs         | GET       | List of all dogs                                 | Dog.find()
2. NEW     | /dogs/new     | GET       | Show new dog form                                | N/A
3. CREATE  | /dogs         | POST      | Add new dog to DB, then redirect somewhere       | Dog.create()
4. SHOW    | /dogs/:id     | POST      | Show info about one clicked(specific) dog        | Dog.findById(id, callback)
5. EDIT    | /dogs/:id/edit| POST      | Show edit form for one dog                       | Dog.findById(id, callback)
6. UPDATE  | /dogs/:id     | POST      | Update a particular dog, then redirect somewhere | Dog.findByIdAndUpdate(id, newData, callback)
7. DESTROY | /dogs/:id     | POST      | Delete a particular dog, then redirect somewhere | Dog.findByIdAndRemove(id, callback)

## Nested ROUTES

Name     | Path                  |
-------- | --------------------- |
NEW     | dogs/:id/comments/new |
CREATE  | dogs/:id/comments     |

Markdown | Less | Pretty
--- | --- | ---
*Still* | `renders` | **nicely**
1 | 2 | 3