import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../api";
import UserForm from "../components/UserForm";
import Spinner from "../components/Spinner";
import { User } from "../types";

export default function CreateUser() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreate = async (user: User) => {
    try {
      setLoading(true);
      const res = await createUser(user);
      // JSONPlaceholder returns an object with a random id
      navigate(`/users/${res.id}`);
    } catch (err: any) {
      alert("Failed to create user: " + (err.message || err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create User</h2>
      {loading ? (
        <Spinner />
      ) : (
        <UserForm submitLabel="Create" onSubmit={handleCreate} />
      )}
    </div>
  );
}
