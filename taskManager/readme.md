Project dependencies:
bcrypt - for hashing the user password
morgan - for logging requests 
body-parser - for parsing request body
dotenv - for placing the PORT in the enviroment variables
express - for running the server
jws - for creating / verifying the tokens


Running the server:
Install dependencies:
npm i

Run the server:
npm start


Api Documentation:
the base URL for any request is:
http://localhost:5000
Any error in any request will result in a message sent in the response.
======================================================================
USERS:

- Registering:
POST	http://localhost:5000/register
Body (REQUIRED): 	fullname, email, password 

Response should be: "User created"

- Logging in:
POST	http://localhost:5000/login
Body (REQUIRED): 	email, password

- Getting User info
GET	http://localhost:5000/users/info
Query parameters (REQUIRED:	userId, 

- Getting all users:
GET	http://localhost:5000/users/getAllUsers
Query parameters (Optional):
	hasTasks 		(hasTasks = 1 -> get all users who have tasks)
				(hasTasks = 0 -> get all users with no tasks)
	tasInfo
				(hasTasks = 1 -> get the task info for the users)
				(hasTasks = 0 -> get with no task info)
- Delete User
DELETE	http://localhost:5000/users/
Query parameters (REQUIRED):	userId

- Update User
PATCH	http://localhost:5000/users/
Query parameters (REQUIRED):	userId
Body parameters (OPTIONAL): fullName, email, password
NOTE: provide those field you wish to update
======================================================================

======================================================================
NOTE: For all queries regarding categories & tasks you have to provide
a token in the Header Authorization
======================================================================

======================================================================
CATEGORIES:

- Getting all categories
GET	http://localhost:5000/categories/all

- Get category by ID
GET	http://localhost:5000/categories/
Query parameters (Required):	categoryId

- Creating a category:
POST	http://localhost:5000/categories/
Body parameters (Required):	name

- Updating a category:
PATCH	http://localhost:5000/categories/
Query parameters (Required):	categoryId
Body parameters (Required): name

- Deleting a category:
Delete	http://localhost:5000/categories/
Query parameters (Required):	categoryId
======================================================================

======================================================================
TASKS:

- Creating a task:
POST http://localhost:5000/tasks
Body paramers (REQUIRED): userId, categoryId, title, description, dueDate (like: 2023-05-30T14:30:00Z)

- Querying tasks:
GET http://localhost:5000/tasks
Query parameters (REQUIRED): userId
Optional query parameters can include: 
	taskId, 
	complete (boolean), 
	description (keyWord),
	categoryId
NOTE: You will be presented with all tasks for the user


- Updating a task:
PATCH http://localhost:5000/tasks
Query parameters (REQUIRED): userId, taskId
Body parameters (OPTIONAL): title, description, complete

- Toggeling a task complete (true / false)
PATCH http://localhost:5000/tasks/toggle
Query parameters (REQUIRED): userId, taskId

- Deleting a task:
DELETE http://localhost:5000/tasks
Query parameters (REQUIRED): userId, taskId
======================================================================


