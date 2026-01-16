import { Link } from 'react-router-dom'

const Navigation = ({ token, onLogout }) => {
  return (
    <nav style={{ marginBottom: '1em' }}>
      <Link to="/">
        <button>authors</button>
      </Link>

      <Link to="/books">
        <button>books</button>
      </Link>

      {token ? (
        <>
          <Link to="/new">
            <button>add new book</button>
          </Link>
          <Link to="/recommended">
            <button>recommended</button>
          </Link>
          <button onClick={onLogout}>logout</button>
        </>
      ) : (
        <Link to="/login">
          <button>login</button>
        </Link>
      )}
    </nav>
  )
}

export default Navigation
