import React, { useEffect, useState } from 'react';
import { Base_url } from '../../apiConfig/api';
import Header from '../AdminDashboard/Header';

export const CommitteeManage = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    title: '',
    description: '',
    image: null
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${Base_url}/api/committees`);
      if (!response.ok) {
        throw new Error('Failed to fetch members');
      }
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error('Error fetching members:', error);
      alert('Failed to load members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this member?')) {
      return;
    }

    try {
      const response = await fetch(`${Base_url}/api/committees/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete member');
      }

      alert('Member deleted successfully');
      fetchData();
    } catch (error) {
      console.error('Error deleting member:', error);
      alert('Failed to delete member');
    }
  };

  const handleEditSubmit = async () => {
    if (!editForm.name || !editForm.title || !editForm.description) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', editForm.name);
      formData.append('title', editForm.title);
      formData.append('description', editForm.description);
      
      if (editForm.image) {
        formData.append('image', editForm.image);
      }

      const response = await fetch(`${Base_url}/api/committees/${editId}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update member');
      }

      alert('Member updated successfully');
      setEditId(null);
      setEditForm({
        name: '',
        title: '',
        description: '',
        image: null
      });
      fetchData();
    } catch (error) {
      console.error('Error updating member:', error);
      alert('Failed to update member');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditForm({ ...editForm, image: file });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditForm({
      name: '',
      title: '',
      description: '',
      image: null
    });
  };

  if (loading) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Header/>
      <h2 className="text-3xl font-bold mb-6 text-gray-800 mt-16">Manage Committee Members</h2>
      
      {members.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No committee members found.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {members.map((member) => (
            <div key={member._id} className="bg-white p-6 rounded-lg shadow-md border">
              {editId === member._id ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Edit Member</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      placeholder="Enter member name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      placeholder="Enter member title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      rows="4"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      placeholder="Enter member description"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Image (optional)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full border border-gray-300 rounded-lg p-3"
                    />
                    {editForm.image && (
                      <p className="text-sm text-gray-600 mt-1">
                        Selected: {editForm.image.name}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleEditSubmit}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition duration-200"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    {member.image ? (
                      <img
                        src={`${Base_url}/uploads/committeemember/${member.image}`}
                        alt={member.name}
                        className="h-24 w-24 object-cover rounded-full border-4 border-gray-200 shadow-sm"
                        onError={(e) => {
                          e.target.src = `data:image/svg+xml,${encodeURIComponent(`
                            <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
                              <rect width="96" height="96" fill="#e5e7eb"/>
                              <text x="48" y="48" text-anchor="middle" dy="0.35em" fill="#9ca3af" font-family="Arial" font-size="12">No Image</text>
                            </svg>
                          `)}`;
                        }}
                      />
                    ) : (
                      <div className="h-24 w-24 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-500 text-xs">No Image</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                    <p className="text-blue-600 font-semibold mb-2">{member.title}</p>
                    <p className="text-gray-600 mb-4 leading-relaxed">{member.description}</p>
                    
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setEditId(member._id);
                          setEditForm({
                            name: member.name,
                            title: member.title,
                            description: member.description,
                            image: null
                          });
                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(member._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};