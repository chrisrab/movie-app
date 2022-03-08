import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../App.css'
import uniqid from 'uniqid'

function Description({ movies }) {
  //const [movie, setMovie] = useState([])
  const { id } = useParams()
  const anyMovie = movies.filter((movie) => movie.id === id)
  const [reviews, setReviews] = useState([])

  const movie = anyMovie[0]
  console.log(movie)
  console.log(reviews)

  useEffect(() => {
    console.log('hi')
    fetch(`http://localhost:3000/movies/${id}/reviews`)
      .then((res) => res.json())
      .then((data) => setReviews(data))
  }, [])

  if (!movie) {
    return <h2>Movie Not Found</h2>
  }

  const { title, image, genre, description } = movie

  function renderReviews(reviews) {
    let getScores = reviews.map(function (e) {
      return parseInt(e.score)
    })

    function average(array) {
      return array.reduce((a, b) => a + b, 0) / array.length
    }

    let reviewArray = reviews.map(function (e) {
      return [e.review, e.score]
    })

    const shortArray = reviewArray.slice(0, 5)

    const averageScoreNotFound = <h3>There are no reviews yet</h3>
    const averageScoreFound = (
      <h3> Average user review score for this film: {Math.round(average(getScores) * 10) / 10}/10</h3>
    )
    console.log(average(getScores))
    return (
      <div>
        {reviews.length > 0 ? averageScoreFound : averageScoreNotFound}
        <h2>Most recent reviews: </h2>
        <ul>
          {shortArray.map((review) => (
            <li className="reviews" key={uniqid()}>
              "{review[0]}" {review[1]}/10
            </li>
          ))}
        </ul>
      </div>
    )
  }

  function handleSubmit(event) {
    event.preventDefault()
    let review = event.target[0].value
    let score = event.target[1].value

    const payload = { review, score }

    fetch(`http://localhost:3000/movies/${id}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((movie) => {
        console.log(movie)
        setReviews(movie.reviews)
      })
  }

  return (
    <div className="description-container">
      <h2>{title}</h2>
      <img src={image} alt={title} style={bigImageStyle} />
      <h3>{genre}</h3>
      <p className="movie-desc">{description}</p>
      <form className="review-form" onSubmit={handleSubmit}>
        <textarea className="review" type="text" name="review" placeholder="Write review here..." required></textarea>
        <input
          className="score-box"
          type="number"
          name="score"
          placeholder="Review score out of 10"
          min="0"
          max="10"
          required
        ></input>
        <input type="submit" value="Submit"></input>
      </form>
      <div>{renderReviews(reviews)}</div>
    </div>
  )
}

const bigImageStyle = {
  width: '400px',
  height: '600px',
}

export default Description

//method="POST" action="http://localhost:3000/movies/godzilla/reviews"
