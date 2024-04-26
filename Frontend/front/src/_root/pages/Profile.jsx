import React, { useState } from 'react';
import { Pencil } from 'lucide-react';

const Profile = () => {
  const initialUser = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    address: '123 Main Street, Cityville',
    phone: '123-456-7890',
    countryCode: '+1',
    image: 'https://s3.amazonaws.com/creativetim_bucket/products/137/thumb/argon-dashboard-pro.jpg?1637855868',
  };

  const [user, setUser] = useState({ ...initialUser });
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...initialUser });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (field) => {
    setEditMode(true);
    setEditedUser({ ...user });
  };

  const handleSave = () => {
  if (!editedUser.name.trim()) {
    alert('Name is required.');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(editedUser.email)) {
    alert('Invalid email format.');
    return;
  }

  if (!editedUser.address.trim()) {
    alert('Address is required.');
    return;
  }

  const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
  if (!phoneRegex.test(editedUser.phone)) {
    alert('Invalid phone number format. Use xxx-xxx-xxxx.');
    return;
  }

  if (editedUser.countryCode.length !== 2) {
    alert('Country code must be 2 characters long.');
    return;
  }

  const allowedTypes = ['image/jpeg', 'image/png'];
  const maxSize = 5 * 1024 * 1024;
  if (editedUser.imageFile) {
    if (!allowedTypes.includes(editedUser.imageFile.type)) {
      alert('Invalid image type. Please upload a JPEG or PNG file.');
      return;
    }
    if (editedUser.imageFile.size > maxSize) {
      alert('Image size exceeds 1MB limit. Please upload a smaller image.');
      return;
    }
  }

    setUser({ ...editedUser });
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditedUser({ ...user });
    setEditMode(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditedUser((prev) => ({ ...prev, image: reader.result }));
      console.log(render.result)
    };
    if (file) {
      reader.readAsDataURL(file);
      console.log(reader.result);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">User Profile</h1>
        
      </div>
      <div className="flex flex-col gap-4">
      <div className="flex items-center">
        {
         editMode && <label className="w-32">Image:</label>
        }
        <div className="relative">
              <img src={user.image} alt="Profile" className="w-32 h-32 rounded-full" />
            <Pencil>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="bg-gray-100 border absolute z-10 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                />
              </Pencil>
        </div>
          </div>
        <div className="flex items-center">
          <label className="w-32">Name:</label>
          {editMode ? (
            <>
              <input
                type="text"
                name="name"
                value={editedUser.name}
                onChange={handleInputChange}
                className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              />
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none ml-4"
                onClick={() => handleEdit('name')}
              >
                Edit
              </button>
            </>
          ) : (
            <p>{user.name}</p>
          )}
        </div>
        <div className="flex items-center">
          <label className="w-32">Email:</label>
          {editMode ? (
            <>
              <input
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleInputChange}
                className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              />
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none ml-4"
                onClick={() => handleEdit('email')}
              >
                Edit
              </button>
            </>
          ) : (
            <p>{user.email}</p>
          )}
        </div>
        <div className="flex items-center">
          <label className="w-32">Address:</label>
          {editMode ? (
            <>
              <input
                type="text"
                name="address"
                value={editedUser.address}
                onChange={handleInputChange}
                className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              />
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none ml-4"
                onClick={() => handleEdit('address')}
              >
                Edit
              </button>
            </>
          ) : (
            <p>{user.address}</p>
          )}
        </div>
        <div className="flex items-center">
          <label className="w-32">Phone:</label>
          {editMode ? (
            <>
              <input
                type="text"
                name="countryCode"
                value={editedUser.countryCode}
                onChange={handleInputChange}
                className="w-20 bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                name="phone"
                value={editedUser.phone}
                onChange={handleInputChange}
                className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              />
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none ml-4"
                onClick={() => handleEdit('phone')}
              >
                Edit
              </button>
            </>
          ) : (
            <p>{`${user.countryCode} ${user.phone}`}</p>
          )}
        </div>
        <div className="flex justify-center gap-4">
        {editMode ? (
          <>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
            onClick={() => handleEdit('all')}
          >
            Edit All
          </button>
        )}
        </div>
      </div>
    </div>
  );
};

export default Profile;