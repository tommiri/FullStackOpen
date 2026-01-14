import { useQuery } from '@apollo/client/react'

import { ALL_AUTHORS } from '../queries'

import SetBirthyear from './SetBirthyear'

const Authors = ({ setError }) => {
  const result = useQuery(ALL_AUTHORS)

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  const selectOptions = authors.map((a) => {
    return {
      value: a.name,
      label: a.name,
    }
  })

  return (
    <>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born ?? 'unknown'}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Prop drilling :( */}
      <SetBirthyear setError={setError} selectOptions={selectOptions} />{' '}
    </>
  )
}

export default Authors
