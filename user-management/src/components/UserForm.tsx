import React, { useState } from 'react'
import { User } from '../types'


type Props = {
initial?: Partial<User>
onSubmit: (user: User) => void
submitLabel?: string
}


export default function UserForm({ initial = {}, onSubmit, submitLabel = 'Save' }: Props) {
const [name, setName] = useState(initial.name || '')
const [email, setEmail] = useState(initial.email || '')
const [phone, setPhone] = useState(initial.phone || '')


const handleSubmit = (e: React.FormEvent) => {
e.preventDefault()
// Basic validation
if (!name.trim() || !email.trim()) return alert('Name and email are required')
onSubmit({ name: name.trim(), email: email.trim(), phone: phone.trim() })
}


return (
<form className="card form" onSubmit={handleSubmit}>
<label>
Name
<input value={name} onChange={(e) => setName(e.target.value)} required />
</label>


<label>
Email
<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
</label>


<label>
Phone
<input value={phone} onChange={(e) => setPhone(e.target.value)} />
</label>


<div className="form-actions">
<button type="submit">{submitLabel}</button>
</div>
</form>
)
}