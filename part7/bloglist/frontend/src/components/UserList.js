import { Link, useHistory } from 'react-router-dom'

import React from 'react'
import { Table } from 'semantic-ui-react'
import { useSelector } from 'react-redux'

const UserList = () => {
  const users = useSelector((state) => state.users)
  const history = useHistory()

  return (
    <Table singleLine selectable textAlign='center'>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>User</Table.HeaderCell>
          <Table.HeaderCell>Blogs created</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body style={{ cursor: 'pointer' }}>
        {users.map((user) => {
          return (
            <Table.Row
              onClick={() => history.push(`/users/${user.id}`)}
              key={user.id}
            >
              <Table.Cell>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </Table.Cell>
              <Table.Cell>{user.blogs.length}</Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  )
}

export default UserList
