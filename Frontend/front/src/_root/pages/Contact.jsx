import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    username: localStorage.getItem('username'),
    email: '',
    message: '',
    image: '',
  });
  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file); // Convert file to URL string
    setFormData((prevData) => ({
      ...prevData,
      image: imageUrl, // Update image field with URL string
    }));
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/api/contactforms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form. Server returned ' + response.status);
      }

      const data = await response.json();
      console.log(data);
      // Assuming your API returns a success message or data, you can handle it here
      // For example, display a success message to the user
      alert('Form submitted successfully!');
      // Reset form data after successful submission
      setFormData({
        username: '',
        email: '',
        message: '',
        image: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormError('Error submitting form. Please try again later.');
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      {formError && <p className="text-red-500">{formError}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          rows={5}
          required
        ></textarea>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
