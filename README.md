# Pinterest Clone - GraphQL, ReactJS, NodeJS, Mysql


## Description:

This project was made in as a way to practice my GraphQL skills.
I also used it to learn how to implement an ORM into my
back-end, which in this case I used Sequelize. It replicats the
famous column layout that Pinteres uses, and it exemplifies
several small features present in the real website. I made a
GraphQL API for my backend using Apollo Server, which allowed a
wall between the clients and the API. The user can also login
with their google account, and all info related to the user is
saved in a ClearDB MySQL database. If the user wants to upload a
pin, the image (and other details) are inserted to the database
and uploaded to Cloudinary as an image storage.

### Features Include:
- Authentication with Google OAUTH
- Upload an 'Pin', which is an image together with:
  - A title
  - A Description
  - A URL
- Save Pins they enjoyed from other people
- Delete their own pins

## Time Taken:

2 weeks

## Technologies Used:

- TypeScript
- ReactJS
- GraphQL
- Apollo
- NodeJS
- ExpressJS
- MySQL
- Sequelize ORM
- Google OAUTH

### Front End:

This repository is for the front-end. The front-end is hosted on Netlify.

### Back End

The back-end is hosted on a Heroku Dyno. 
The back-end repository is: https://github.com/machadop1407/pinterest-clone-backend


## Design:

### Database:

3 Tables:
- Users: Stores user first and last name, email, and googleId
- Pins: Stores all pins uploaded to the platform. Information for each pin include the cloudinary image id, googleId of the user that uploaded, a title, a description, and an optional url.
- SavedPins: Stores all pins that were saved by a user. Each saved pin stores the cloudinar image id and the googleId of the user saving the pin.


### Server-Side:
Apollo Server: 
- Express server with a graphql enpoint:
  - Mutations and queries are sent to the front end and handled with Apollo-Client.
  - Sequelize ORM is used for database requests
  
### Front-End:

Front End fully developed in ReactJS using the create-react-app boiler plate
