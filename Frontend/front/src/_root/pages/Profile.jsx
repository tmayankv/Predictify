import React, { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';

const Profile = () => {
  const [profile, setProfile] = useState({
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
  
  const username = localStorage.getItem('username');
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/profile/${username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          throw new Error('Failed to fetch profile data');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    if (username) {
      fetchProfileData();
    }
  }, [username]); // Dependency array ensures this effect runs when username changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    setEditMode(true);
    setEditedProfile({ ...profile });
  };

  const handleSave = async () => {
    try {
      const method = username ? 'PUT' : 'POST'; // Determine method based on whether profile exists
      const url = username ? `http://127.0.0.1:5000/api/profile/${username}` : 'http://127.0.0.1:5000/api/profile';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedProfile),
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        setEditMode(false);
      } else {
        throw new Error('Failed to save profile');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/profile/${username}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Image uploaded:', data);
        setEditedProfile((prev) => ({ ...prev, image: data.image_url }));
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
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
                    className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                  />
              )}
            </div>
          </div>
          <div className="flex items-center">
            <label className="w-32">Name:</label>
            {editMode ? (
              <input
                type="text"
                name="name"
                value={editedProfile.name}
                onChange={handleInputChange}
                className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              />
            ) : (
              <input
                type="text"
                name="name"
                value={profile.name}
                disabled
                className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              />
            )}
          </div>
          <div className="flex items-center">
  <label className="w-32">Email:</label>
  {editMode ? (
    <input
      type="email"
      name="email"
      value={editedProfile.email}
      onChange={handleInputChange}
      className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
    />
  ) : (
    <input
      type="email"
      name="email"
      value={profile.email}
      disabled
      className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
    />
  )}
</div>
<div className="flex items-center">
  <label className="w-32">Address:</label>
  {editMode ? (
    <input
      type="text"
      name="address"
      value={editedProfile.address}
      onChange={handleInputChange}
      className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
    />
  ) : (
    <input
      type="text"
      name="address"
      value={profile.address}
      disabled
      className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
    />
  )}
</div>
<div className="flex items-center">
  <label className="w-32">Phone:</label>
  {editMode ? (
    <>
      <input
        type="text"
        name="countryCode"
        value={editedProfile.countryCode}
        onChange={handleInputChange}
        className="w-20 bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
      />
      <input
        type="text"
        name="phone"
        value={editedProfile.phone}
        onChange={handleInputChange}
        className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
      />
    </>
  ) : (
    <input
      type="text"
      name="phone"
      value={`${profile.countryCode} ${profile.phone}`}
      disabled
      className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
    />
  )}
</div>
<div className="flex items-center">
  <label className="w-32">Bio:</label>
  {editMode ? (
    <textarea
      name="bio"
      value={editedProfile.bio}
      onChange={handleInputChange}
      className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
    />
  ) : (
    <textarea
      name="bio"
      value={profile.bio}
      disabled
      className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
    />
  )}
</div>
<div className="flex items-center">
  <label className="w-32">Date of Birth:</label>
  {editMode ? (
    <input
      type="text"
      name="dob"
      value={editedProfile.dob}
      onChange={handleInputChange}
      className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
    />
  ) : (
    <input
      type="text"
      name="dob"
      value={profile.dob}
      disabled
      className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
    />
  )}
</div>
<div className="flex items-center">
  <label className="w-32">Gender:</label>
  {editMode ? (
    <input
      type="text"
      name="gender"
      value={editedProfile.gender}
      onChange={handleInputChange}
      className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
    />
  ) : (
    <input
      type="text"
      name="gender"
      value={profile.gender}
      disabled
      className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
    />
  )}
</div>
<div className="flex items-center">
  <label className="w-32">Password:</label>
  {editMode ? (
    <input
      type="password"
      name="password"
      value={editedProfile.password}
      onChange={handleInputChange}
      className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
    />
  ) : (
    <input
      type="password"
      name="password"
      value={profile.password}
      disabled
      className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
    />
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
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                onClick={handleEdit}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    );
    
};

export default Profile;
