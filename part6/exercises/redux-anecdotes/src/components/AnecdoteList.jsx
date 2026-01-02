import { useDispatch, useSelector } from 'react-redux'
import { upvoteAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const anecdoteStyle = {
  padding: '5px',
  border: '1px solid black',
  margin: '5px 0 5px 0',
}

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <li style={anecdoteStyle}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes} votes
        <button onClick={handleClick}>vote</button>
      </div>
    </li>
  )
}

const listStyle = {
  listStyleType: 'none',
  padding: 0,
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === 'ALL') {
      return anecdotes
    } else {
      return anecdotes.filter(({ content }) => {
        const normalizedContent = content.toLowerCase()
        const normalizedFilter = filter.toLowerCase()

        return normalizedContent.includes(normalizedFilter)
      })
    }
  })
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  const handleUpvote = (anecdote) => {
    dispatch(upvoteAnecdote(anecdote))
    dispatch(notify(`You voted for '${anecdote.content}'`))
  }

  return (
    <ul style={listStyle}>
      {sortedAnecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => handleUpvote(anecdote)}
        />
      ))}
    </ul>
  )
}

export default AnecdoteList
