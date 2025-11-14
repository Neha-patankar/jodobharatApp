// src/components/ClientManage.js
import React, { useEffect, useState } from 'react';
import { getAllClients, deleteClient, updateClient, addClient } from '../api/clientApi';

export const ClientManage = () => {
  const [clients, setClients] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', company: '', description: '' });
  const [newForm, setNewForm] = useState({ name: '', company: '', description: '', logo: null });

  const fetchData = async () => {
    const res = await getAllClients();
    setClients(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await deleteClient(id);
    fetchData();
  };

  const handleEditSubmit = async () => {
    const formData = new FormData();
    formData.append('name', editForm.name);
    formData.append('company', editForm.company);
    formData.append('description', editForm.description);

    await updateClient(editId, formData);
    setEditId(null);
    fetchData();
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newForm.name);
    formData.append('company', newForm.company);
    formData.append('description', newForm.description);
    formData.append('logo', newForm.logo);

    await addClient(formData);
    setNewForm({ name: '', company: '', description: '', logo: null });
    fetchData();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Clients</h2>

      {/* Add New Client Form */}
      <form onSubmit={handleAddSubmit} className="bg-gray-100 p-4 rounded mb-6">
        <h3 className="font-semibold mb-2">Add New Client</h3>
        <input
          className="border p-2 w-full mb-2"
          placeholder="Name"
          value={newForm.name}
          onChange={(e) => setNewForm({ ...newForm, name: e.target.value })}
        />
        <input
          className="border p-2 w-full mb-2"
          placeholder="Company"
          value={newForm.company}
          onChange={(e) => setNewForm({ ...newForm, company: e.target.value })}
        />
        <textarea
          className="border p-2 w-full mb-2"
          placeholder="Description"
          value={newForm.description}
          onChange={(e) => setNewForm({ ...newForm, description: e.target.value })}
        />
        <input
          type="file"
          onChange={(e) => setNewForm({ ...newForm, logo: e.target.files[0] })}
          className="mb-2"
        />
        <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded">Add Client</button>
      </form>

      {/* List Clients */}
      {clients.map((client) => (
        <div key={client._id} className="bg-white p-4 rounded shadow mb-4">
          {editId === client._id ? (
            <>
              <input
                className="border p-2 w-full mb-2"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              />
              <input
                className="border p-2 w-full mb-2"
                value={editForm.company}
                onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
              />
              <textarea
                className="border p-2 w-full mb-2"
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              />
              <button onClick={handleEditSubmit} className="bg-blue-600 text-white px-3 py-1 rounded">
                Save
              </button>
            </>
          ) : (
            <>
              {client.image && (
                <img
                  src={`${Base_url}/uploads/${client.image}`}
                  alt="client"
                  className="h-24 w-24 object-cover rounded-full mb-2"
                />
              )}
              <h3 className="text-xl font-bold">{client.name}</h3>
              <p className="font-semibold">{client.company}</p>
              <p className="mb-2">{client.description}</p>
              <button
                onClick={() => {
                  setEditId(client._id);
                  setEditForm({
                    name: client.name,
                    company: client.company,
                    description: client.description,
                  });
                }}
                className="bg-yellow-600 text-white px-3 py-1 mr-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(client._id)}
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
