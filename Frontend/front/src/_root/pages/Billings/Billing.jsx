import React, { useState } from 'react';

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
  const [transactions, setTransactions] = useState([]);

  const validateCardNumber = (cardNum) => {
    return /^\d{16}$/.test(cardNum); // 16-digit card number validation
  };

  const validateExpiryMonth = (month) => {
    const numericMonth = parseInt(month, 10);
    return numericMonth >= 1 && numericMonth <= 12; // Month range validation
  };

  const validateExpiryYear = (year) => {
    const currentYear = new Date().getFullYear();
    return /^\d{4}$/.test(year) && parseInt(year, 10) > currentYear; // Year format and future year validation
  };

  const isUniqueCard = (cardNum) => {
    return !cards.some((card) => card.cardNumber === cardNum); // Check if card number is unique
  };

  const handleAddCard = () => {
    if (!validateCardNumber(cardNumber)) {
      alert('Invalid card number. Please enter a 16-digit card number.');
      return;
    }

    if (!validateExpiryMonth(expiryMonth)) {
      alert('Invalid expiry month. Please enter a month between 01 and 12.');
      return;
    }

    if (!validateExpiryYear(expiryYear)) {
      alert('Invalid expiry year. Please enter a 4-digit year greater than the current year.');
      return;
    }

    if (!isUniqueCard(cardNumber)) {
      alert('Card number must be unique.');
      return;
    }

    const newCard = {
      id: Math.random().toString(36).substr(2, 9),
      type: cardType,
      cardNumber,
      expiryMonth,
      expiryYear,
      cvv,
      balance: parseFloat(currentBalance),
      transactions: [],
    };

    setCards([...cards, newCard]);
    setCardNumber('');
    setExpiryMonth('');
    setExpiryYear('');
    setCvv('');
    setCurrentBalance(0);
    setMessage('');
    alert('Card added successfully');
  };

  const handleDeleteCard = (cardId) => {
    const updatedCards = cards.filter((card) => card.id !== cardId);
    setCards(updatedCards);
    alert('Card deleted successfully');
  };

  const handleTransaction = (cardId) => {
    const cardIndex = cards.findIndex((card) => card.id === cardId);
    const updatedCards = [...cards];
    const amount = parseFloat(transactionAmount);
    const type = transactionType;

    if (type === 'Credit') {
      updatedCards[cardIndex].balance += amount;
    } else {
      if (updatedCards[cardIndex].balance < amount) {
        alert('Insufficient balance');
        return;
      }
      updatedCards[cardIndex].balance -= amount;
    }

    const transaction = {
      amount,
      type,
      cardNumber: cards[cardIndex].cardNumber,
      message,
      date: new Date().toLocaleString(),
    };
    updatedCards[cardIndex].transactions.push(transaction);
    setCards(updatedCards);
    setTransactions([...transactions, transaction]);
    setMessage('');
    setTransactionAmount(0);
    alert('Transaction completed successfully');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Billing Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Add Card Section */}
       
        {transactions.length >0 &&
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
          <h2 className="text-xl font-semibold mb-2">Transaction History</h2>
          <div className="overflow-y-auto max-h-60">
            <ul className="divide-y divide-gray-300">
              {transactions.map((transaction, index) => (
                <li key={index} className="py-2">
                  <div className="flex justify-between">
                    <div>{transaction.type === 'Credit' ? 'Credited' : 'Debited'}:</div>
                    <div>{transaction.amount} USD</div>
                  </div>
                  <div className="text-sm text-gray-500">{transaction.cardNumber}</div>
                  <div className="text-sm text-gray-500">{transaction.message}</div>
                  <div className="text-sm text-gray-500">{transaction.date}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
}

        {/* Card Details Section */}
        {cards.map((card) => (
          <div key={card.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col">
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
                className={`bg-${transactionType === 'Credit' ? 'green' : 'red'}-500 hover:bg-${transactionType === 'Credit' ? 'green' : 'red'}-600 text-white px-3 py-1 w-1/2 rounded-lg flex`}
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
         <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
          <h2 className="text-xl font-semibold mb-2">Add New Card</h2>
          <div className="flex flex-col gap-2">
            <select
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
            <button onClick={handleAddCard} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg">
              Add Card
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Billing;
