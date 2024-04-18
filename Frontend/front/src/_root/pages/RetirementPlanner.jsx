import React, { useState } from 'react';
import CustomButton from '../../components/CustomButton';

const RetirementPlanner = () => {
  const [currentAge, setCurrentAge] = useState('');
  const [retirementAge, setRetirementAge] = useState('');
  const [annualIncome, setAnnualIncome] = useState('');
  const [currentSavings, setCurrentSavings] = useState('');
  const [desiredRetirementIncome, setDesiredRetirementIncome] = useState('');
  const [investmentReturnRate, setInvestmentReturnRate] = useState('');
  const [yearsInRetirement, setYearsInRetirement] = useState('');
  const [requiredSavings, setRequiredSavings] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();

    const yearsUntilRetirement = retirementAge - currentAge;
    const totalYearsInRetirement = yearsInRetirement;
    const annualExpenses = desiredRetirementIncome * 12;
    const inflationRate = 0.03; // Example inflation rate (3%)
    const investmentRate = investmentReturnRate / 100; // Convert percentage to decimal

    let totalExpenses = 0;
    for (let i = 0; i < totalYearsInRetirement; i++) {
      totalExpenses += annualExpenses * Math.pow(1 + inflationRate, i);
    }

    const futureValue = totalExpenses * Math.pow(1 + investmentRate, yearsUntilRetirement);
    const requiredSavingsAmount = futureValue - currentSavings;

    setRequiredSavings(requiredSavingsAmount.toFixed(2)); // Convert to 2 decimal places
  };

  return (
    <div className="h-screen flex flex-col items-center text-white gap-3">
      <div className="text-2xl">Retirement Planning Calculator</div>
      <form onSubmit={handleCalculate} className="flex flex-col gap-3 items-end" id="retire-form">
        <label>
          Current Age:
          <input type="number" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} />
        </label>
        <label>
          Retirement Age:
          <input type="number" value={retirementAge} onChange={(e) => setRetirementAge(e.target.value)} />
        </label>
        <label>
          Annual Income:
          <input type="number" value={annualIncome} onChange={(e) => setAnnualIncome(e.target.value)} />
        </label>
        <label>
          Current Savings:
          <input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} />
        </label>
        <label>
          Desired Retirement Income:
          <input type="number" value={desiredRetirementIncome} onChange={(e) => setDesiredRetirementIncome(e.target.value)} />
        </label>
        <label>
          Investment Return Rate (%):
          <input type="number" value={investmentReturnRate} onChange={(e) => setInvestmentReturnRate(e.target.value)} />
        </label>
        <label>
          Years in Retirement:
          <input type="number" value={yearsInRetirement} onChange={(e) => setYearsInRetirement(e.target.value)} />
        </label>
        <div>
        <CustomButton type="submit" styles={"bg-blue-300"} title={"Calculate"}>Calculate</CustomButton>
        </div>
      </form>
      {requiredSavings !== null && (
        <div>
          <h2>Required Savings for Retirement:</h2>
          <p>${requiredSavings}</p>
        </div>
      )}
    </div>
  );
};

export default RetirementPlanner;
