import React from 'react'
import { User } from '../types'
import { Link } from 'react-router-dom'


type Props = {
users: User[]
onDelete: (id: number) => void
}


export default function UserList({ users, onDelete }: Props) {
return (
<div className="table">
<div className="table-header">
<div>Name</div>
<div>Email</div>
<div>Phone</div>
<div>Actions</div>
</div>
{users.map((u) => (
<div key={u.id} className="table-row">
<div>{u.name}</div>
<div>{u.email}</div>
<div>{u.phone ?? '-'}</div>
<div className="actions">
<Link to={`/users/${u.id}`}>View</Link>
<Link to={`/edit/${u.id}`}>Edit</Link>
<button onClick={() => u.id && onDelete(u.id)}>Delete</button>
</div>
</div>
))}
</div>
)
}