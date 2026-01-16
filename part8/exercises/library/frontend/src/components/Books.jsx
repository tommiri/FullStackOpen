import { useQuery } from '@apollo/client/react'
import { useState } from 'react'
import Select from 'react-select'

import { FIND_BOOK } from '../queries'

import BooksTable from './BooksTable'

const Books = ({ allBooks }) => {
  const [genre, setGenre] = useState('')

  const filteredBooksResult = useQuery(FIND_BOOK, {
    variables: { genre },
    skip: !genre,
  })

  const books = genre ? filteredBooksResult.data?.allBooks : allBooks

  const uniqueGenres = [...new Set(allBooks.flatMap((b) => b.genres))]

  const selectOptions = uniqueGenres.map((g) => ({ label: g, value: g }))

  return (
    <>
      <h2>books</h2>

      {genre ? (
        <div>
          showing books with genre <strong>{genre}</strong>
        </div>
      ) : (
        <div>
          showing <strong>all</strong> books
        </div>
      )}

      {!filteredBooksResult.loading ? (
        <BooksTable books={books} />
      ) : (
        <div>loading...</div>
      )}

      <Select
        name="genre"
        isClearable
        placeholder="Filter by genre..."
        options={selectOptions}
        value={selectOptions.find((option) => option.value === genre) || null}
        onChange={(selectedOption) => setGenre(selectedOption?.value || '')}
        styles={{
          container: (base) => ({
            ...base,
            maxWidth: '300px',
            marginBottom: '0.5em',
          }),
        }}
      />
    </>
  )
}

export default Books
