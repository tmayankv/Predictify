import React, { useState, useEffect } from 'react';
import { ExpenseTable } from '../../components';
import ExpenseChart from '../../components/charts/ExpenseChart';
const Expense = () => {
  const [formData, setFormData] = useState({
    username: localStorage.getItem('username'),
    name: '',
    category: '',
    amount: "",
    day:'',
    month:'',
    year:'',
  });
  const [formError, setFormError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
const [alertMessage, setAlertMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, name, category, amount } = formData;
    if (!name || !category || !amount) {
      setFormError('Please fill in all fields');
      setShowAlert(true);
      setAlertMessage('Please fill in all fields');
      return;
    }
    try {
      const response = await fetch('/api/exp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add expense');
      }
  
      setShowAlert(true);
      setAlertMessage('Expense added successfully');
      setFormError('');
      setFormData({
        ...formData,
        name: '',
        category: '',
        amount: '',
        day: null,
        month: null,
        year: null,
      });
      // fetchExpenses();
    } catch (error) {
      console.error('Error adding expense:', error);
      setFormError('Error adding expense. Please try again later.');
      setShowAlert(true);
      setAlertMessage('Error adding expense. Please try again later.');
    }
  };
  return (
    <div className="container mx-auto mt-8">
      {showAlert && (
  <div className="bg-indigo-900 text-center py-4 lg:px-4">
    <div className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
      <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
        {localStorage.getItem('username')},
      </span>
      <span className="font-semibold mr-2 text-left flex-auto">{alertMessage}</span>
      <svg
        onClick={() => setShowAlert(false)}
        className="fill-current opacity-75 h-4 w-4 cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
      </svg>
    </div>
  </div>
)}
      <h1 className="text-3xl font-bold mb-4 text-center text-white">Expenses</h1>
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
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          required
        >
          <option value="">Select Category</option>
          <option value="home">Home</option>
          <option value="work">Work</option>
          <option value="food">Food</option>
          <option value="travel">Travel</option>
          <option value="entertainment">Entertainment</option>
          <option value="health">Health</option>
          <option value="education">Education</option>
          <option value="shopping">Shopping</option>
        </select>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          required
        />
        <div className='flex justify-center gap-5 md:flex-row flex-col mx-2'>
         <input
          type="number"
          name="day"
          placeholder="Day"
          value={formData.day}
          className="border md:w-1/3 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          onChange={handleChange}
          />
        <input
          type="number"
          name="month"
          placeholder="Month"
          value={formData.month}
          className="border border-gray-300 md:w-1/3 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          onChange={handleChange}
          />
        <input
          type="number"
          name="year"
          placeholder="Year"
          value={formData.year}
          className="border border-gray-300 md:w-1/3 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          onChange={handleChange}
          />
          </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
        >
          Add Expense
        </button>
      </form>
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Expense List</h2>
        <ExpenseTable />
        <ExpenseChart />
      </div>
    </div>
  );
};

export default Expense;
