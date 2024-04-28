import React, { useState, useEffect } from 'react';
import IncomeChart from '../../components/charts/IncomeChart';
import { IncomeTable } from '../../components';

const IncomeComponent = () => {
  const [valid, setValid] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const [formData, setFormData] = useState({
    username: localStorage.getItem('username'),
    amount: '',
    source: '',
    recurring: false,
    day: '',
    month: '',
    year: '',
  });

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'recurring' ? value === 'true' : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const { username, amount, source, recurring, day, month, year } = formData;
    if (!username || !amount || !source || !recurring || !day || !month || !year) {
      setAlertMessage('Please fill in all fields');
      setShowAlert(true);
      return;
    }
    try {
      const response = await fetch('/api/income', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to add income');
      }
      setAlertMessage('Income added successfully');
      setValid(!valid)
      setShowAlert(true);
      // fetchData(); // Update fetched data after successful submission
      setFormData({
        username: '',
        amount: '',
        source: '',
        recurring: false,
        day: '',
        month: '',
        year: '',
      });
    } catch (error) {
      console.error('Error adding income:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {showAlert && (
        <div className="bg-indigo-900 text-center py-4 lg:px-4">
          <div className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
            <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
              {localStorage.getItem('username')},
            </span>
            <span className="font-semibold mr-2 text-left flex-auto">{alertMessage}</span>
            <svg
              className="fill-current opacity-75 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
            </svg>
          </div>
        </div>
      )}
      <h1 className="text-2xl font-bold mb-4 text-white italic text-center">Income Management</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col gap-2 ">
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              className="border p-2 rounded-md"
              value={formData.amount}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="source"
              placeholder="Source"
              className="border p-2 rounded-md"
              value={formData.source}
              onChange={handleInputChange}
              required
            />
            <select
              name="recurring"
              className="border p-2 rounded-md"
              value={formData.recurring.toString()} 
              onChange={handleInputChange}
              required
            >
              <option value="">Select Recurring</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            <div className="flex gap-2 max-[700px]:flex-wrap">
              <input
                type="number"
                name="day"
                placeholder="Day"
                className="border p-2 rounded-md flex-1"
                value={formData.day}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="month"
                placeholder="Month"
                className="border p-2 rounded-md flex-1"
                value={formData.month}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="year"
                placeholder="Year"
                className="border p-2 rounded-md flex-1"
                value={formData.year}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg my-2"
        >
          Add Income
        </button>
      </form>
      <div className="mt-4">
        <IncomeTable valid={valid}  />
      </div>
      <div>
        <>
          <h1 className="text-2xl font-bold text-white text-center mb-4">Income Charts So Far</h1>
          <IncomeChart valid={valid} />
        </>
      </div>
    </div>
  );
};

export default IncomeComponent;
