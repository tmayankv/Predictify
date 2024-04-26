import React, { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';

const Profile = () => {
  const [profile, setProfile] = useState((localStorage.getItem('username')) || {
    name: '',
    email: '',
    address: '',
    phone: '',
    countryCode: '',
    image: '',
    bio: '',
    dob: '',
    gender: '',
    password: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ ...profile });

  console.log(localStorage.getItem('username'))
  useEffect(() => {
    fetchBio();
  }, []);

  const fetchBio = () => {
    fetch(`http://127.0.0.1:5000/api/profile/${localStorage.getItem("username")}`) // Assuming this endpoint returns the user's profile including bio
      .then((response) => response.json())
      .then((data) => setProfile(data))
      .catch((error) => console.error('Error fetching profile:', error));
  };
  console.log(profile);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    setEditMode(true);
    setEditedProfile({ ...profile });
  };

  const handleSave = () => {
    // Perform validation and update profile API call
    fetch(`http://127.0.0.1:5000/api/profile/${localStorage.getItem("username")}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedProfile),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to update profile');
      })
      .then((data) => {
        setProfile(data);
        setEditMode(false);
      })
      .catch((error) => console.error('Error updating profile:', error));
  };

  const handleImageChange = (e) => {
    // Handle image upload using /upload endpoint
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    fetch('http://127.0.0.1:5000/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Image uploaded:', data);
        setEditedProfile((prev) => ({ ...prev, image: data.image_url }));
      })
      .catch((error) => console.error('Error uploading image:', error));
  };

  const handleCancel = () => {
    setEditedProfile({ ...profile });
    setEditMode(false);
  };


  return (
    <div className="container mx-auto mt-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">User Profile</h1>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center">
          {editMode && <label className="w-32">Image:</label>}
          <div className="relative">
            <img src={editedProfile.image} alt="Profile" className="w-32 h-32 rounded-full" />
            {editMode && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="bg-gray-100 border z-10 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                />
            )}
          </div>
        </div>
        <div className="flex items-center">
          <label className="w-32">Name:</label>
          {editMode ? (
            <>
              <input
                type="text"
                name="name"
                value={editedProfile.name}
                onChange={handleInputChange}
                className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              />
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none ml-4"
                onClick={handleEdit}
              >
                Edit
              </button>
            </>
          ) : (
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
              className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          )}
        </div>
        <div className="flex items-center">
          <label className="w-32">Email:</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleInputChange}
            className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex items-center">
          <label className="w-32">Address:</label>
          <input
            type="text"
            name="address"
            value={profile.address}
            onChange={handleInputChange} 
            className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex items-center">
          <label className="w-32">Phone:</label>
          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleInputChange} 
            className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        {/* Other input fields */}
        <div className="flex items-center">
          <label className="w-32">Bio:</label>
          <input
            type="text"
            name="bio"
            value={profile.bio}
            onChange={handleInputChange}
            className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex items-center">
          <label className="w-32">Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={profile.dob}
            onChange={handleInputChange}
            className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex items-center">
          <label className="w-32">Gender:</label>
          <input
            type="text"
            name="gender"
            value={profile.gender}
            onChange={handleInputChange}
            className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex items-center">
          <label className="w-32">Password:</label>
          <input
            type="password"
            name="password"
            value="********"
            disabled 
            className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          />
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
                onClick={ handleCancel }
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
              onClick={handleEdit}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
