import React, { useState, useEffect } from 'react';

const Billing = () => {
  const [cards, setCards] = useState([]);
  const [cardType, setCardType] = useState('Mastercard');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [currentBalance, setCurrentBalance] = useState(0);
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState('Credit');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCardsData();
  }, []);

  const fetchCardsData = async () => {
    try {
      const response = await fetch(`/api/cards/${localStorage.getItem('username')}`);
      const data = await response.json();
      setCards(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  const handleAddCard = async () => {
    setError('');
    try {
      const response = await fetch('/api/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: localStorage.getItem("username"),
          cardnumber: cardNumber,
          cardtype: cardType,
          cvv,
          expirymonth: expiryMonth,
          expiryyear: expiryYear,
          balance: currentBalance,
        }),
      });
      const data = await response.json();
      setCards([...cards, data]);
      setMessage('Card added successfully');
      clearFormFields();
    } catch (error) {
      console.error('Error adding card:', error);
      setError('Error adding card. Please try again.');
    }
  };

  const handleDeleteCard = async (id) => {
    setError('');
    try {
      await fetch(`/api/cards/${id}`, {
        method: 'DELETE',
      });
      setCards(cards.filter((card) => card.id !== id));
      setMessage('Card deleted successfully');
    } catch (error) {
      console.error('Error deleting card:', error);
      setError('Error deleting card. Please try again.');
    }
  };

  const handleEditCard = async (id, updatedData) => {
    setError('');
    try {
      const response = await fetch(`/api/cards/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      const data = await response.json();
      const updatedCards = cards.map((card) => (card.id === id ? data : card));
      setCards(updatedCards);
      setMessage('Card updated successfully');
    } catch (error) {
      console.error('Error updating card:', error);
      setError('Error updating card. Please try again.');
    }
  };

  const handleTransaction = async (cardId) => {
    setError('');
    try {
      const response = await fetch(`/api/cards/${cardId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(transactionAmount),
          type: transactionType,
          message,
        }),
      });
      const data = await response.json();
      const updatedCards = cards.map((card) =>
        card.id === cardId ? { ...card, balance: data.balance } : card
      );
      setCards(updatedCards);
      setMessage('Transaction completed successfully');
      setTransactionAmount(0);
      setMessage('');
    } catch (error) {
      console.error('Error completing transaction:', error);
      setError('Error completing transaction. Please try again.');
    }
  };

  const clearFormFields = () => {
    setCardNumber('');
    setExpiryMonth('');
    setExpiryYear('');
    setCvv('');
    setCurrentBalance(0);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Billing Management</h1>

      {/* Error Message */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Add Card Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
          <h2 className="text-xl font-semibold mb-2">Add New Card</h2>
          <div className="flex flex-col gap-2">
            <label htmlFor="cardType">Card Type:</label>
            <select
              id="cardType"
              className="border p-2 rounded-md"
              value={cardType}
              onChange={(e) => setCardType(e.target.value)}
            >
              <option value="Mastercard">Mastercard</option>
              <option value="Visacard">Visacard</option>
            </select>
            <input
              type="text"
              placeholder="Card Number"
              className="border p-2 rounded-md"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
            <div className="flex gap-2 flex-wrap">
              <input
                type="number"
                placeholder="Expiry Month"
                className="border p-2 rounded-md flex-1"
                value={expiryMonth}
                onChange={(e) => setExpiryMonth(e.target.value)}
              />
              <input
                type="number"
                placeholder="Expiry Year"
                className="border p-2 rounded-md flex-1"
                value={expiryYear}
                onChange={(e) => setExpiryYear(e.target.value)}
              />
            </div>
            <input
              type="text"
              placeholder="CVV"
              className="border p-2 rounded-md"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
            <input
              type="number"
              placeholder="Current Balance"
              className="border p-2 rounded-md"
              value={currentBalance}
              onChange={(e) => setCurrentBalance(parseFloat(e.target.value))}
            />
            {message && <div className="text-green-500 mb-2">{message}</div>}
            <button
              onClick={handleAddCard}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg"
            >
              Add Card
            </button>
          </div>
        </div>

        {/* Transaction History Section */}
        {cards.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
            <h2 className="text-xl font-semibold mb-2">Transaction History</h2>
            <div className="overflow-y-auto max-h-60">
              <ul className="divide-y divide-gray-300">
                {cards.map((card) => (
                  <li key={card.id} className="py-2">
                    <div className="flex justify-between">
                      <div>{card.type === 'Credit' ? 'Credited' : 'Debited'}:</div>
                      <div>{card.amount} USD</div>
                    </div>
                    <div className="text-sm text-gray-500">{card.cardNumber}</div>
                    <div className="text-sm text-gray-500">{card.message}</div>
                    <div className="text-sm text-gray-500">{card.date}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Display Cards */}
      {cards.map((card) => (
        <div key={card.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col mt-4">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">{card.type} Card</h2>
            <div className="text-gray-600">{card.cardNumber}</div>
            <div className="text-gray-600">Balance: {card.balance} USD</div>
          </div>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Enter transaction amount"
              className="border p-2 rounded-md flex-1"
              value={transactionAmount}
              onChange={(e) => setTransactionAmount(parseFloat(e.target.value))}
            />
            <select
              className="border p-2 rounded-md"
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
            >
              <option value="Credit">Credit</option>
              <option value="Debit">Debit</option>
            </select>
            <input
              type="text"
              placeholder="Enter message for transaction"
              className="border p-2 rounded-md flex-1"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              onClick={() => handleTransaction(card.id)}
              className={`bg-${transactionType === 'Credit' ? 'green' : 'red'}-500 hover:bg-${
                transactionType === 'Credit' ? 'green' : 'red'
              }-600 text-white px-3 py-1 w-1/2 rounded-lg flex`}
            >
              {transactionType === 'Credit' ? 'Credit' : 'Debit'}
            </button>
          </div>
          <button
            onClick={() => handleDeleteCard(card.id)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 mt-4 rounded-lg"
          >
            Delete Card
          </button>
        </div>
      ))}
    </div>
  );
};

export default Billing;
