import React, { useEffect, useState } from 'react'
import { fetchUsers, deleteUser } from '../api'
import { User } from '../types'
import UserList from '../components/UserList'
import Spinner from '../components/Spinner'


export default function Home() {
const [users, setUsers] = useState<User[]>([])
const [loading, setLoading] = useState(false)
const [error, setError] = useState<string | null>(null)


useEffect(() => {
let mounted = true
setLoading(true)
fetchUsers()
.then((data) => mounted && setUsers(data))
.catch((err) => mounted && setError(err.message || 'Failed to load users'))
.finally(() => mounted && setLoading(false))
return () => { mounted = false }
}, [])


const handleDelete = async (id: number) => {
if (!confirm('Are you sure you want to delete this user?')) return
try {
setLoading(true)
await deleteUser(id)
// JSONPlaceholder returns empty but we'll remove locally for UX
setUsers((s) => s.filter((u) => u.id !== id))
} catch (err: any) {
alert('Delete failed: ' + (err.message || err))
} finally {
setLoading(false)
}
}


return (
<div>
<div className="toolbar">
<h2>Users</h2>
<a className="btn" href="/create">+ Create</a>
</div>


{loading && <Spinner />}
{error && <div className="error">{error}</div>}


{!loading && !error && (
<UserList users={users} onDelete={handleDelete} />
)}
</div>
)
}