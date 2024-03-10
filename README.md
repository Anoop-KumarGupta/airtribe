# airtribe
An API for online Tutoring platform, having functionalities like creating a course, updating course, course registration, etc.
For installing the required dependencies, use the code:- (npm install) in the terminal. This will create a folder call node_modules in your working folder.

libraries that i have used:
1) express framework
2) mongoose for database part
3) jsonwebtoken(jwt) for authentication (signup and logging)
4) bcrypt for converting the simple password into hashed one.
5) validator for validating the properties of Model
6) dotenv for environment variables
7) morgan just a middleware for development purpose, it logs the req details like URL, status, etc.

applications used for development:
1) postman: it is an API development tool for building, testing, and managing APIs.
2) mongoDB compass: it is a graphical user interface (GUI) for MongoDB, providing visual exploration, query optimization, and data manipulation capabilities.

Architecture followed:
I have followed MVC architecture for better code visibility and modularity. MVC (Model-View-Controller) is a software architectural pattern separating application logic into three interconnected components: model, view, and controller. Model: manages data and business logic. View: presents data to users. Controller: handles user input and updates the model/view accordingly. It promotes modularity, scalability, and reusability in software development.

Resources in the API:
1) course: this api have functionalities to create, update, delete a course.
2) user: We are having two different kinds of users. one is Instructors, who can create courses and others are the students who can register for the courses.
