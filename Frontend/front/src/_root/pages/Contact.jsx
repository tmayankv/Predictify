import React, { useState, useEffect } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    username: localStorage.getItem('username'),
    email: '',
    message: '',
    image: '',
  });
  const [formError, setFormError] = useState('');
  const [alert, setAlert] = useState(false);
  const [complaintNumber, setComplaintNumber] = useState('');
  const [submissionTime, setSubmissionTime] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)
    try {
      const response = await fetch('/api/contactforms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form. Server returned'+ response.status);
      }
      const data = await response.json();
      console.log(data);
      setComplaintNumber(data.complaint_number);
      setAlert(true);
      setFormData({
        username: '',
        email: '',
        message: '',
        image: '',
      });
      document.getElementById('image-input').value = ''; // Clear the file input field
      setSubmissionTime(Date.now()); // Store the submission time
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormError('Error submitting form. Please try again later.');
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false);
    }, 5000);

    return () => clearTimeout(timeout); // Clear the timeout on component unmount
  }, [alert]);

  return (
    <div className="container mx-auto mt-8 flex flex-col w-[75vw]">
      {alert && (
        <div className="bg-indigo-900 text-center py-4 lg:px-4">
          <div className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
            <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">{localStorage.getItem("username")},</span>
            <span className="font-semibold mr-2 text-left flex-auto">your complaint has been successfully registered with Ref. Number: {complaintNumber}</span>
            <svg className="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/>
            </svg>
          </div>
        </div>
      )}
      <h1 className="text-2xl font-bold mb-4 text-white self-center">Contact Us</h1>
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
          id='image-input'
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
