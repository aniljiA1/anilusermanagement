import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${id}`);
        setUser(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) return <p className="text-center p-4">Loading...</p>;

  if (!user)
    return (
      <div className="p-6">
        <p>User not found.</p>
        <Link to="/" className="text-blue-600 underline">
          Go Back
        </Link>
      </div>
    );

  return (
    <div className="max-w-xl mx-auto mt-6 p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">User Details</h2>

      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone}
      </p>

      <div className="flex gap-4 mt-6">
        <Link
          to={`/edit/${user._id}`}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Edit
        </Link>

        <Link
          to="/"
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Back to List
        </Link>
      </div>
    </div>
  );
};

export default UserDetails;
