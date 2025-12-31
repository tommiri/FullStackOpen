import { useDispatch, useSelector } from 'react-redux'
import { upvoteAnecdote } from '../reducers/anecdoteReducer'

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
  const anecdotes = useSelector((state) => state)

  return (
    <ul style={listStyle}>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => dispatch(upvoteAnecdote(anecdote.id))}
        />
      ))}
    </ul>
  )
}

export default AnecdoteList
