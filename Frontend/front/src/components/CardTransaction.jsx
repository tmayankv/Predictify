import { IndianRupee } from 'lucide-react';
import React from 'react';
const CardTransaction = ({
  card,
  transactionAmount,
  setTransactionAmount,
  transactionType,
  setTransactionType,
  message,
  setMessage,
  handleTransaction,
  handleDeleteCard,
}) => {
  return (
    <div key={card.id} className=" rounded-lg shadow-md p-4 flex flex-col mt-4" style={{background:"url('https://imgs.search.brave.com/jQqfZkS1W_kw9DpnUv-X7PtGVbJObtMEUPfZA2hAKLo/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzI2LzA1LzY2/LzM2MF9GXzcyNjA1/NjY2MV9jMWpXT3Zq/ckQwaktIRHVlQWEw/TkpHVVJxRXpTSDFy/Yi5qcGc')"}}>
      <div className="mb-4  text-white">
        <h2 className="text-xl font-semibold capitalize">{card.cardtype}</h2>
        <div className="text-gray-400">Card:- {card.cardnumber}</div>
        <div className="text-gray-600 flex">Balance:<IndianRupee /> {card.balance}</div>
      </div>
      <div className="flex gap-2 flex-col">
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
          <option value="Credit">credit</option>
          <option value="Debit">debit</option>
        </select>
        <input
          type="text"
          placeholder="Enter message for transaction"
          className="border p-2 rounded-md flex-1"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={() => handleTransaction(card.id, transactionType)}
          className={`flex justify-center items-center bg-${transactionType === 'Credit' ? 'green' : 'red'}-500 hover:bg-${
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
  );
};

export default CardTransaction;
