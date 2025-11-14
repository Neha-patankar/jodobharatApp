// import React, { useEffect, useState } from 'react';
// import { deleteAbout, getAllAbout, updateAbout } from '../api/aboutApi';

// export const ManageAboutUs = () => {
//   const [aboutData, setAboutData] = useState([]);
//   const [editId, setEditId] = useState(null);
//   const [editForm, setEditForm] = useState({ title: '', description: '', mission : '', vision: '', values: '' });

//   const fetchData = async () => {
//     const res = await getAllAbout();
//     setAboutData(res.data);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleDelete = async (id) => {
//     await deleteAbout(id);
//     fetchData();
//   };

//   const handleEditSubmit = async () => {
//     await updateAbout(editId, editForm);
//     setEditId(null);
//     fetchData();
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Manage About Us</h2>
//       {aboutData.map((item) => (
//         <div key={item._id} className="bg-white p-4 rounded shadow mb-4">
//           {editId === item._id ? (
//             <>
//               <input
//                 className="border p-2 w-full mb-2"
//                 value={editForm.title}
//                 onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
//               />
//               <textarea
//                 className="border p-2 w-full mb-2"
//                 value={editForm.description}
//                 onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
//               />
//               <textarea
//                 className="border p-2 w-full mb-2"
//                 value={editForm.mission}
//                 onChange={(e) => setEditForm({ ...editForm, mission: e.target.value })}
//               />
//               <textarea
//                 className="border p-2 w-full mb-2"
//                 value={editForm.vision}
//                 onChange={(e) => setEditForm({ ...editForm, vision: e.target.value })}
//               />
//                <textarea
//                 className="border p-2 w-full mb-2"
//                 value={editForm.values}
//                 onChange={(e) => setEditForm({ ...editForm, values: e.target.value })}
//               />
//               <button onClick={handleEditSubmit} className="bg-blue-600 text-white px-3 py-1 rounded">
//                 Save
//               </button>
//             </>
//           ) : (
//             <>
//               <h3 className="text-xl font-bold">{item.title}</h3>
//               <p className="mb-2">{item.description}</p>
//               <button
//                 onClick={() => {
//                   setEditId(item._id);
//                   setEditForm({ title: item.title, description: item.description, mission: item.mission, vision: item.vision,  values: item.values });
//                 }}
//                 className="bg-yellow-600 text-white px-3 py-1 mr-2 rounded"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(item._id)}
//                 className="bg-red-600 text-white px-3 py-1 rounded"
//               >
//                 Delete
//               </button>
//             </>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Base_url } from '../../apiConfig/api';

export const ManageAboutUs = () => {
  const [aboutData, setAboutData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    mission: '',
    vision: '',
    values: ''
  });



  // GET
  const fetchData = async () => {
    try {
      const res = await axios.get(API_BASE);
      setAboutData(res.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${Base_url}/api/about/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  // UPDATE
  const handleEditSubmit = async () => {
    try {
      await axios.put(`${API_BASE}/${editId}`, editForm);
      setEditId(null);
      fetchData();
    } catch (error) {
      console.error('Error updating:', error);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage About Us</h2>
      {aboutData.map((item) => (
        <div key={item._id} className="bg-white p-4 rounded shadow mb-4">
          {editId === item._id ? (
            <>
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
              <textarea
                className="border p-2 w-full mb-2"
                value={editForm.mission}
                onChange={(e) => setEditForm({ ...editForm, mission: e.target.value })}
              />
              <textarea
                className="border p-2 w-full mb-2"
                value={editForm.vision}
                onChange={(e) => setEditForm({ ...editForm, vision: e.target.value })}
              />
              <textarea
                className="border p-2 w-full mb-2"
                value={editForm.values}
                onChange={(e) => setEditForm({ ...editForm, values: e.target.value })}
              />
              <button onClick={handleEditSubmit} className="bg-blue-600 text-white px-3 py-1 rounded">
                Save
              </button>
            </>
          ) : (
            <>
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="mb-2">{item.description}</p>
              <button
                onClick={() => {
                  setEditId(item._id);
                  setEditForm({
                    title: item.title,
                    description: item.description,
                    mission: item.mission,
                    vision: item.vision,
                    values: item.values
                  });
                }}
                className="bg-yellow-600 text-white px-3 py-1 mr-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
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
