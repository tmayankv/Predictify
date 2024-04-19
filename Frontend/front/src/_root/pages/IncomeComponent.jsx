import React, { useState, useEffect } from 'react';

const IncomeComponent = () => {
  const [incomes, setIncomes] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    amount: '',
    recurring: '',
    date: '',
  });

  const fetchIncomes = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/income');
      if (!response.ok) {
        throw new Error('Failed to fetch incomes');
    }
      const data = await response.json();
      setIncomes(data);
      console.log(incomes);
    } catch (error) {
      console.error('Error fetching incomes:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/api/income', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to add income');
      }
      console.log('Income added successfully');
      // Refresh income list after adding new income
      fetchIncomes();
      // Clear form data
      setFormData({ username: '', amount: '', recurring: '', date: '' });
    } catch (error) {
      console.error('Error adding income:', error);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  return (
    <div>
      <h1>Income Management</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
        </label>
        <label>
          Amount:
          <input type="text" name="amount" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />
        </label>
        <label>
          Recurring:
          <input type="text" name="recurring" value={formData.recurring} onChange={(e) => setFormData({ ...formData, recurring: e.target.value })} />
        </label>
        <label>
          Date:
          <input type="date" name="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
        </label>
        <button type="submit">Add Income</button>
      </form>
      <h2>Income List</h2>
      <ul>
        {incomes.map((income) => (
          <li key={income.id}>
            Username: {income.username}, Amount: {income.amount}, Recurring: {income.recurring ? 'Yes' : 'No'}, Date: {income.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncomeComponent;
