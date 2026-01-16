import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import Select from 'react-select'

import { EDIT_AUTHOR } from '../queries'

const SetBirthyear = ({ setError, selectOptions }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [setBirthyear] = useMutation(EDIT_AUTHOR, {
    onCompleted: (data) => {
      if (!data.editAuthor) {
        setError('Author not found!')
      }
    },
  })

  const submit = (e) => {
    e.preventDefault()

    setBirthyear({ variables: { name, setBornTo: Number(born) } })

    setName('')
    setBorn('')
  }

  return (
    <>
      <h2>Set birthyear</h2>

      <form onSubmit={submit}>
        <div>
          <label>
            name
            <Select
              name="name"
              isClearable
              placeholder="Select author..."
              options={selectOptions}
              value={
                selectOptions.find((option) => option.value === name) || null
              }
              onChange={(selectedOption) =>
                setName(selectedOption?.value || '')
              }
              styles={{
                container: (base) => ({
                  ...base,
                  maxWidth: '300px',
                  marginBottom: '0.5em',
                }),
              }}
            />
          </label>
        </div>
        <div>
          <label>
            birthdate{' '}
            <input
              type="text"
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </label>
        </div>
        <button type="submit">update author</button>
      </form>
    </>
  )
}

export default SetBirthyear
