import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Table } from 'react-bootstrap'

const UserList = () => {
  const users = useSelector(({ users }) => users)

  if (!users) {
    return <div>loading users...</div>
  }

  const byAlphabetical = (a, b) => {
    if (a.name < b.name) {
      return -1
    }
    if (a.name > b.name) {
      return 1
    }
    return 0
  }

  const sortedUsers = [...users].sort(byAlphabetical)

  return (
    <>
      <h1 className="mb-3">Users</h1>

      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default UserList
