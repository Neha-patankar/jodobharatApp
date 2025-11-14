import React, { useEffect, useState } from 'react';
import { getAllCertificates, deleteCertificate, updateCertificate } from '../api/certificateApi';
import { Base_url } from '../../apiConfig/api';

export const ManageCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    title: '',
    description: '',
  });

  const fetchData = async () => {
    const res = await getAllCertificates();
    setCertificates(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await deleteCertificate(id);
    fetchData();
  };

  const handleEditSubmit = async () => {
    const formData = new FormData();
    formData.append('name', editForm.name);
    formData.append('title', editForm.title);
    formData.append('description', editForm.description);

    await updateCertificate(editId, formData);
    setEditId(null);
    fetchData();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Certificates</h2>
      {certificates.map((certificate) => (
        <div key={certificate._id} className="bg-white p-4 rounded shadow mb-4">
          {editId === certificate._id ? (
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
              {certificate.image && (
                <img
                  src={`${Base_url}/uploads/${certificate.image}`}
                  alt="certificate"
                  className="h-24 w-24 object-cover rounded-full mb-2"
                />
              )}
              <h3 className="text-xl font-bold">{certificate.name}</h3>
              <p className="font-semibold">{certificate.title}</p>
              <p className="mb-2">{certificate.description}</p>
              <button
                onClick={() => {
                  setEditId(certificate._id);
                  setEditForm({
                    name: certificate.name,
                    title: certificate.title,
                    description: certificate.description,
                  });
                }}
                className="bg-yellow-600 text-white px-3 py-1 mr-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(certificate._id)}
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
