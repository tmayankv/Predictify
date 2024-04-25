import React, { useState, useEffect } from 'react';
import IncomeChart from '../../components/charts/IncomeChart';

const IncomeComponent = () => {
  const [incomes, setIncomes] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    amount: '',
    source: '',
    recurring: '',
    day: '',
    month: '',
    year: ''
  });

  const { username, amount, source, recurring, day, month, year } = formData;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchIncomes();
  }, []);

  const fetchIncomes = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/api/income');
      if (!response.ok) {
        throw new Error('Error fetching incomes');
      }
      const data = await response.json();
      setIncomes(data);
    } catch (error) {
      setError('Error fetching incomes. Please try again.');
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/api/income', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Error adding income');
      }
      setFormData({
        username: '',
        amount: '',
        source: '',
        recurring: '',
        day: '',
        month: '',
        year: ''
      });
      fetchIncomes();
    } catch (error) {
      setError('Error adding income. Please check your inputs.');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/income/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Error deleting income');
      }
      fetchIncomes(); // Refresh incomes after deletion
    } catch (error) {
      setError('Error deleting income. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div>

    <div className='w-1/4 flex flex-col'>
      <h1>Income Tracker</h1>
      <form onSubmit={handleSubmit} className='flex flex-col'>
      <input
  type="text"
  placeholder="Username"
  name="username"
  value={username}
  onChange={handleInputChange}
  className="bg-gray-800 text-white border border-gray-600 rounded-md px-4 py-2 mb-4 focus:outline-none focus:border-blue-500"
/>
<input
  type="number"
  placeholder="Amount"
  name="amount"
  value={amount}
  onChange={handleInputChange}
  className="bg-gray-800 text-white border border-gray-600 rounded-md px-4 py-2 mb-4 focus:outline-none focus:border-blue-500"
/>
<input
  type="text"
  placeholder="Source"
  name="source"
  value={source}
  onChange={handleInputChange}
  className="bg-gray-800 text-white border border-gray-600 rounded-md px-4 py-2 mb-4 focus:outline-none focus:border-blue-500"
/>
<select
  name="recurring"
  value={recurring}
  onChange={handleInputChange}
  className="bg-gray-800 text-white border border-gray-600 rounded-md px-4 py-2 mb-4 focus:outline-none focus:border-blue-500"
>
  <option value="">Select</option>
  <option value="Yes">Yes</option>
  <option value="No">No</option>
</select>
<input
  type="text"
  placeholder="Day"
  name="day"
  value={day}
  onChange={handleInputChange}
  className="bg-gray-800 text-white border border-gray-600 rounded-md px-4 py-2 mb-4 focus:outline-none focus:border-blue-500"
/>
<input
  type="text"
  placeholder="Month"
  name="month"
  value={month}
  onChange={handleInputChange}
  className="bg-gray-800 text-white border border-gray-600 rounded-md px-4 py-2 mb-4 focus:outline-none focus:border-blue-500"
/>
<input
  type="text"
  placeholder="Year"
  name="year"
  value={year}
  onChange={handleInputChange}
  className="bg-gray-800 text-white border border-gray-600 rounded-md px-4 py-2 mb-4 focus:outline-none focus:border-blue-500"
/>

        <button type="submit">Add Income</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h2>Incomes</h2>
      <ul>
        {incomes?.map((income) => (
          <li key={income.id}>
            {/* Display income details */}
            <button onClick={() => handleDelete(income.id)}>Delete</button>
          </li>
        ))}
      </ul>

    </div>
    <IncomeChart />
        </div>
  );
};

export default IncomeComponent;
