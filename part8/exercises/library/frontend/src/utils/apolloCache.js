import { ALL_AUTHORS, ALL_BOOKS } from '../queries'

export const addBookToCache = (cache, bookToAdd) => {
  cache.updateQuery({ query: ALL_BOOKS }, (data) => {
    if (!data?.allBooks) {
      return null
    }
    const { allBooks } = data

    const bookExists = allBooks.some((book) => book.id === bookToAdd.id)

    if (bookExists) {
      return { allBooks }
    }

    return {
      allBooks: allBooks.concat(bookToAdd),
    }
  })

  cache.updateQuery({ query: ALL_AUTHORS }, (data) => {
    if (!data?.allAuthors) {
      return null
    }
    const { allAuthors } = data

    const authorExists = allAuthors.some(
      (author) => author.id === bookToAdd.author.id
    )

    if (authorExists) {
      return { allAuthors }
    }

    return {
      allAuthors: allAuthors.concat(bookToAdd.author),
    }
  })
}
