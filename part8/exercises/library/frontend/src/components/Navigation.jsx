import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <nav style={{ marginBottom: '1em' }}>
      <Link to="/">
        <button>authors</button>
      </Link>
      <Link to="/books">
        <button>books</button>
      </Link>
      <Link to="/new">
        <button>add new book</button>
      </Link>
    </nav>
  )
}

export default Navigation
