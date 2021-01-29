# Movie App Challenge

Create a movie app based on the four screens provided. The app should be able to:

- List all movies
- Locally filter all movies based on search input
- Ability to select and view a single movie and its reviews
- Ability to add a review against a movie
- Show the average of all reviews for each movie

## API

Create a server which stores all movie data in a basic array of objects. The API should have the following endpoints:

`GET /movies`
Returns a list of all movies

`GET /movie/:id`
Return a single movie with all reviews

`POST /movie/:id/review`
Save a new review against a movie

## Client

Create a client app in React which represents the screens provided. You will need to have different routes for each screen and call your server endpoints with the Fetch API.
