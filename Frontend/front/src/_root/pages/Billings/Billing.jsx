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
    <div className="flex justify-center mx-auto p-4 text-white">
      <h1 className="lg:text-3xl text-xl font-bold mb-4">Billing Management</h1>
         </div>
  );
};

export default Billing;
