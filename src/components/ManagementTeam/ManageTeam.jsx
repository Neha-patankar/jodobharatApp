import React, { useEffect, useState } from 'react';
import { getAllMembers, deleteMember, updateMember } from '../api/managementApi';
import { Base_url } from '../../apiConfig/api';

export const ManageManagementTeam = () => {
  const [members, setMembers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    title: '',
    description: '',
  });

  const fetchData = async () => {
    const res = await getAllMembers();
    setMembers(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await deleteMember(id);
    fetchData();
  };

  const handleEditSubmit = async () => {
    const formData = new FormData();
    formData.append('name', editForm.name);
    formData.append('title', editForm.title);
    formData.append('description', editForm.description);

    await updateMember(editId, formData);
    setEditId(null);
    fetchData();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Management Team</h2>
      {members.map((member) => (
        <div key={member._id} className="bg-white p-4 rounded shadow mb-4">
          {editId === member._id ? (
            <>
              <input
                className="border p-2 w-full mb-2"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              />
              <input
                className="border p-2 w-full mb-2"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
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
              {member.image && (
                <img src={`${Base_url}/uploads/${member.image}`} alt="member" className="h-24 w-24 object-cover rounded-full mb-2" />
              )}
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="font-semibold">{member.title}</p>
              <p className="mb-2">{member.description}</p>
              <button
                onClick={() => {
                  setEditId(member._id);
                  setEditForm({
                    name: member.name,
                    title: member.title,
                    description: member.description,
                  });
                }}
                className="bg-yellow-600 text-white px-3 py-1 mr-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(member._id)}
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
