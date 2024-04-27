import React, { useState, useEffect } from 'react';
import IncomeChart from '../../components/charts/IncomeChart';

const IncomeComponent = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [formData, setFormData] = useState({
    username: localStorage.getItem('username'),
    amount: '',
    source: '',
    recurring: false,
    day: '',
    month: '',
    year: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/income/${localStorage.getItem('username')}`);
      if (!response.ok) {
        console.log("Fetching");
        throw new Error('Failed to fetch income data');
      }
      const data = await response.json();
      setIncomeData(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching income data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'recurring' ? value === 'true' : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, amount, source, recurring, day, month, year } = formData;
    if (!username || !amount || !source || !recurring || !day || !month || !year) {
      alert('Please fill in all fields');
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
      alert('Income added successfully');
      fetchData();
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
        <h2 className="text-xl font-semibold mb-2">Income Data</h2>
        <ul>
          {Array.isArray(incomeData) &&
            incomeData.map((income) => (
              <li key={income.id}>
                Username: {income.username}, Amount: {income.amount}, Source: {income.source}
              </li>
            ))}
        </ul>
      </div>
      <div>
          <>
            <h1 className='text-2xl font-bold text-white text-center mb-4'>Income Charts So Far</h1>
            <IncomeChart incomeData={incomeData} />
          </>
      </div>
    </div>
  );
};

export default IncomeComponent;
