import React, { useState, useEffect } from 'react';
import { PlatformSettings } from '../../components';

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
  });
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ ...profile });

  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`/api/profile/${username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setProfile( data);
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
  }, [username]); 

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
      const url = username ? `/api/profile/${username}` : '/api/profile';

      const response = await fetch(url, {
        method:'POST',
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
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setEditedProfile((prevData) => ({
      ...prevData,
      image: imageUrl,
    }));
  };
  const image= profile.image

  return (
    <div className="container mx-auto mt-8 text-white w-[72vw] flex flex-col pt-5"  style={{ background: 'linear-gradient(to top, rgba(82, 130, 194, 0.41), rgba(0, 0, 0, 0.8))', backdropFilter: 'blur(10px)' }}>
      <h1 className="text-2xl text-center font-bold mb-4">User Profile</h1>
      <div className="flex flex-col gap-4 self-center md:w-3/4 lg:w-1/2 xl:w-1/3">
  <div className="flex items-center justify-center">
    {editMode && <label className="w-32">Image:</label>}
    <div className="relative flex-shrink-0 w-32 h-32 hover:scale-125 transition-all duration-500">
      <img src={image !== ''? 'https://imgs.search.brave.com/_1pBgIp4fbMQcMWJUvMDfNao7BP3I3tVuZwYzbUEQ0A/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvcHJldmll/dy0xeC83Ni8yOC91/bmtub3duLXBlcnNv/bi11c2VyLWljb24t/Zm9yLXdlYi12ZWN0/b3ItMzQ3NTc2Mjgu/anBn':image} alt="Profile" className="w-full h-full rounded-full" />
      {editMode && (
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="absolute z-10 inset-0 opacity-0 w-full h-full cursor-pointer"
        />
      )}
    </div>
  </div>
  <div className="flex flex-col">
    <label className="text-white">Name:</label>
    {editMode ? (
      <input
        type="text"
        name="name"
        id='name'
        value={editedProfile.name}
        onChange={handleInputChange}
        className=" rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
      />
    ) : (
      <input
        type="text"
        name="name"
        value={profile.name}
        disabled
        className="rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
      />
    )}
  </div>
  <div className="flex flex-col">
    <label className="text-white">Username:</label>
    <input
      type="text"
      name="username"
      value={profile.username}
      disabled
      className=" rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
    />
  </div>
  <div className="flex flex-col">
    <label className="text-white">Phone:</label>
    {editMode ? (
      <input
        type="text"
        name="phone"
        id='phone'
        value={editedProfile.phone}
        onChange={handleInputChange}
        className=" rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
      />
    ) : (
      <input
        type="text"
        name="phone"
        value={profile.phone === null && 'sadasdsads'}
        disabled
        className=" rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
      />
    )}
  </div>
  <div className="flex flex-col">
    <label className="text-white">Bio:</label>
    {editMode ? (
      <textarea
        name="bio"
        id='bio'
        value={editedProfile.bio}
        onChange={handleInputChange}
        className=" rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
      />
    ) : (
      <textarea
        name="bio"
        value={profile.bio}
        disabled
        className=" rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
      />
    )}
  </div>
  <div className="flex flex-col">
    <label className="text-white">DOB:</label>
    {editMode ? (
      <input
        type="Date"
        name="dob"
        id='dob'
        value={editedProfile.dob}
        onChange={handleInputChange}
        className=" rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
      />
    ) : (
      <input
        type="text"
        name="dob"
        value={profile.dob}
        disabled
        className=" rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
      />
    )}
  </div>
  <div className="flex flex-col">
    <label className="text-white">Gender:</label>
    {editMode ? (
      <input
        type="text"
        name="gender"
        id='gender'
        value={editedProfile.gender}
        onChange={handleInputChange}
        className=" rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
      />
    ) : (
      <input
        type="text"
        name="gender"
        value={profile.gender}
        disabled
        className=" rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
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
      <div className='mt-10'>
      <PlatformSettings />
      </div>
    </div>
  );
};
export default Profile;
