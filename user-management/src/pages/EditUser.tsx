import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${id}`);
        setFormData({
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/users/${id}`, formData);
      navigate(`/user/${id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to update user");
    }
  };

  if (loading) return <p className="text-center p-4">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto mt-6 p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Edit User</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update User
        </button>
      </form>
    </div>
  );
};

export default EditUser;
