import { useQuery } from '@apollo/client/react'

import { GET_FAVORITE_GENRE } from '../queries'

import BooksTable from './BooksTable'

const Recommended = ({ allBooks }) => {
  const userResult = useQuery(GET_FAVORITE_GENRE)

  const favoriteGenre = userResult.data?.me.favoriteGenre

  const filteredBooks = allBooks.filter((b) => b.genres.includes(favoriteGenre))

  return (
    <>
      <h2>recommended books</h2>
      <div>
        books in your favorite genre <strong>{favoriteGenre}</strong>
      </div>
      {filteredBooks.length > 0 ? (
        <BooksTable books={filteredBooks} />
      ) : (
        <div>no books found with genre {favoriteGenre} :(</div>
      )}
    </>
  )
}

export default Recommended
