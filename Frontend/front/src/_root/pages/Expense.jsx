import React, { useState, useEffect } from 'react';

const Expenses = () => {
  const [formData, setFormData] = useState({
    username: localStorage.getItem('username'),
    name: '',
    category: '',
    amount: '',
  });
  const [formError, setFormError] = useState('');
  const [alert, setAlert] = useState(false);
  const [expenseList, setExpenseList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/exp', {
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
      setAlert(true);
      setFormData({
        name: '',
        category: '',
        amount: '',
      });
      fetchExpenses();
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormError('Error submitting form. Please try again later.');
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await fetch(`/api/exp/${localStorage.getItem('username')}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch expenses');
      }

      const data = await response.json();
      console.log(data)
      if (Array.isArray(data)) {
        setExpenseList(data);
      } else {
        setExpenseList([]);
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      {alert && <div className="bg-green-500 text-white p-2 mb-4">Expense added successfully</div>}
      {formError && <div className="bg-red-500 text-white p-2 mb-4">{formError}</div>}
      <h1 className="text-2xl font-bold mb-4">Expenses</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Expense Name"
          value={formData.name}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
        >
          Add Expense
        </button>
      </form>
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Expense List</h2>
        <ul>
          {expenseList.map((expense) => (
            <li key={expense.id}>
              Name: {expense.name}, Category: {expense.category}, Amount: {expense.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Expenses;
