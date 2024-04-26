import React, { useState, useEffect } from 'react';

const IncomeComponent = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    amount: '',
    source: '',
    recurring: '',
    day: '',
    month: '',
    year: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/income'); // Assuming the backend API is hosted at /api/income
      const data = await response.json();
      setIncomeData(data);
    } catch (error) {
      console.error('Error fetching income data:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://127.0.0.1:5000/api/income', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }); // Assuming the backend API is hosted at /api/income
      alert('Income added successfully');
      fetchData(); // Fetch updated data after adding income
      setFormData({
        username: '',
        amount: '',
        source: '',
        recurring: '',
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
      <h1 className="text-2xl font-bold mb-4">Income Management</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="border p-2 rounded-md"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
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
  value={formData.recurring}
  onChange={handleInputChange}
  required
>
  <option value="">Select Recurring</option>
  <option value="Yes">Yes</option>
  <option value="No">No</option>
</select>
<div className="flex gap-2">
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
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg"
        >
          Add Income
        </button>
      </form>
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Income Data</h2>
        <ul>
          {incomeData.map((income) => (
            <li key={income.id}>
              Username: {income.username}, Amount: {income.amount}, Source: {income.source}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IncomeComponent;
