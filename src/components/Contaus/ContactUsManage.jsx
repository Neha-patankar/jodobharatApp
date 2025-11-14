import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Base_url } from '../../apiConfig/api';

export const ContactUsManage = () => {
  const [contacts, setContacts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    phone: '',
    email: '',
    address: '',
    image: null,
  });

  const fetchContacts = async () => {
    try {
      const res = await axios.get(`${Base_url}/api/contact`);
      setContacts(res.data);
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`${Base_url}/api/contact/${id}`);
    fetchContacts();
  };

  const handleEditSubmit = async () => {
    const data = new FormData();
    data.append('phone', editForm.phone);
    data.append('email', editForm.email);
    data.append('address', editForm.address);
    if (editForm.image) {
      data.append('image', editForm.image);
    }

    await axios.put(`${Base_url}/api/contact/${editId}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    setEditId(null);
    fetchContacts();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Contact Us Submissions</h2>

      {contacts.map((contact) => (
        <div key={contact._id} className="bg-white p-4 rounded shadow mb-4">
          {editId === contact._id ? (
            <>
              <input
                className="border p-2 w-full mb-2"
                value={editForm.phone}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                placeholder="Phone"
              />
              <input
                className="border p-2 w-full mb-2"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                placeholder="Email"
              />
              <textarea
                className="border p-2 w-full mb-2"
                value={editForm.address}
                onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                placeholder="Address"
              />
              <input
                type="file"
                onChange={(e) => setEditForm({ ...editForm, image: e.target.files[0] })}
                className="mb-2"
              />
              <button onClick={handleEditSubmit} className="bg-blue-600 text-white px-3 py-1 rounded">
                Save
              </button>
            </>
          ) : (
            <>
              {contact.image && (
                <img
                  src={`${Base_url}/uploads/${contact.image}`}
                  alt="contact"
                  className="h-24 w-24 object-cover rounded-full mb-2"
                />
              )}
              <h3 className="text-lg font-semibold">Phone: {contact.phone}</h3>
              <p>Email: {contact.email}</p>
              <p className="mb-2">Address: {contact.address}</p>
              <button
                onClick={() => {
                  setEditId(contact._id);
                  setEditForm({
                    phone: contact.phone,
                    email: contact.email,
                    address: contact.address,
                    image: null,
                  });
                }}
                className="bg-yellow-600 text-white px-3 py-1 mr-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(contact._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};
