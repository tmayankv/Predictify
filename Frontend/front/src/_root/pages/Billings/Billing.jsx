import React, { useState, useEffect } from 'react';
import { CardTransaction, TransactionTable } from '../../../components';

const Billing = () => {
  const [cards, setCards] = useState([]);
  const [transactionHist, setTransactionHist] = useState([]);
  const [cardType, setCardType] = useState('Mastercard');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [currentBalance, setCurrentBalance] = useState('');
  const [transactionAmount, setTransactionAmount] = useState('');
  const [transactionType, setTransactionType] = useState('Credit');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCardsData();
    handleTransactionhistory();
  }, []);

  const fetchCardsData = async () => {
    try {
      const response = await fetch(`/api/cards/${localStorage.getItem('username')}`);
      if (!response.ok) {
        throw new Error('Failed to fetch cards data');
      }
      const data = await response.json();
      setCards(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching cards:', error);
      setError('Error fetching cards. Please try again.');
    }
  };

  const handleAddCard = async () => {
    setError('');
    try {
      const formData = {
        username: localStorage.getItem('username'),
        cardnumber: cardNumber,
        cardtype: cardType,
        cvv: cvv,
        expirymonth: expiryMonth,
        expiryyear: expiryYear,
        balance: currentBalance,
      };

      const response = await fetch('/api/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to add card');
      }

      const data = await response.json();
      setCards([...cards, data]);
      setMessage('Card added successfully');
      clearFormFields();
      fetchCardsData();
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
      
      const updatedCards = cards.card_details.filter((card) => card.id !== id);
      console.log(updatedCards);
      setCards(updatedCards);
      setMessage('Card deleted successfully');
    } catch (error) {
      console.error('Error deleting card:', error);
      setError('Error deleting card. Please try again.');
    }
  };
  

  const handleTransactionhistory = async () => {
    try {
      const response = await fetch(`/api/cards/${localStorage.getItem("username")}/transactions`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch transaction history');
      }
      const data = await response.json();
      setTransactionHist(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching transaction history:', error);
      setError('Error fetching transaction history. Please try again.');
    }
  };

  const handleTransaction = async (cardId, transactionType) => {
    const transaction= transactionType === 'Debit'? 'debit':'credit'
    console.log(transaction)
    setError('');
    try {
      const formData = {
        amount: parseFloat(transactionAmount),
        type: transactionType,
        message: message,
      };

      const response = await fetch(`/api/cards/${cardId}/${transaction}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to complete transaction');
      }

      const data = await response.json();
      const updatedCards = cards.card_details.map((card) =>
        card.id === cardId ? { ...card, balance: data.balance } : card
      );
      handleTransactionhistory();
      fetchCardsData();
      setCards(updatedCards);
      setMessage('Transaction completed successfully');
      setTransactionAmount('');
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
    setCurrentBalance('');
  };
console.log(cards.card_details)
  return (
    <div className="container mx-auto p-4 w-[82vw]">
      <h1 className="text-3xl text-white itlaic font-bold mb-4 text-center">Billing Management</h1>

      <div className="rounded-lg shadow-md p-4 mb-10 text-white"  style={{ background: 'linear-gradient(to top, rgba(2, 0, 94, 0.5), rgba(0, 0, 0, 0.8))', backdropFilter: 'blur(10px)' }}>
          <h2 className="text-xl font-semibold mb-2 ">Add New Card</h2>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
       

        {cards?.card_details &&
          cards.card_details.map((card) => (
            <CardTransaction
              key={card.id}
              card={card}
              transactionAmount={transactionAmount}
              setTransactionAmount={setTransactionAmount}
              transactionType={transactionType}
              setTransactionType={setTransactionType}
              message={message}
              setMessage={setMessage}
              handleTransaction={handleTransaction}
              handleDeleteCard={handleDeleteCard}
            />
          ))}
      </div>
      <div>

      {(transactionHist && transactionHist.transaction_history) && (
       <TransactionTable transactionHist= {transactionHist}/>
        )}
        </div>
    </div>
  );
};

export default Billing;
