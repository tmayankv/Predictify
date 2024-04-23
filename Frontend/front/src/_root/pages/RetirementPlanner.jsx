import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend } from '@syncfusion/ej2-react-charts';
const RetirementPlanner = () => {
  const [formData, setFormData] = useState({
    age: '',
    currentIncome: '',
    retirementAge: '',
    desiredIncome: '',
    currentSavings: '',
    riskTolerance: '',
  });
  const [result, setResult] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(`https://api.example.com/investment-suggestions?risk=${formData.riskTolerance}`);
        setSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching investment suggestions:', error);
      }
    };

    fetchSuggestions();
  }, [formData.riskTolerance]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateRetirement = () => {
    const requiredSavings = 5000000;
    const expectedCorpus = 10000000;
    const labels = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5']; // Example labels
    const corpusData = [1000000, 2000000, 3000000, 4000000, 5000000]; // Example data

    const chartData = {
      labels: labels,
      corpusData: corpusData,
    };
    

    setResult({ requiredSavings, expectedCorpus, chartData });
    setChartData(chartData);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    calculateRetirement();
  };
  
  const primaryXAxis = { valueType: 'Category', title: 'Years' };
  const primaryYAxis = { title: 'Corpus Amount (INR)' };
  const legendSettings = { visible: true };
  return (
    <div className="container mx-auto p-4">
      <h1 className="md:text-2xl text-xl text-white text-center  font-bold mb-4">Retirement Planner</h1>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8">
         <div className="flex flex-wrap justify-between gap-4 flex-2">
           <div className="w-full md:w-1/2">
             <label htmlFor="age" className="block text-sm font-semibold mb-1">Age</label>
             <input
               type="number"
               id="age"
               name="age"
               value={formData.age}
               onChange={handleChange}
               placeholder="Enter your age"
               className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out"
               required
             />
           </div>
           <div className="w-full md:w-1/2">
             <label htmlFor="currentIncome" className="block text-sm font-semibold mb-1">Current Income (INR)</label>
             <input
               type="number"
               id="currentIncome"
               name="currentIncome"
               value={formData.currentIncome}
               onChange={handleChange}
               placeholder="Enter your current income"
               className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out"
               required
             />
           </div>
           <div className="w-full md:w-1/2">
             <label htmlFor="retirementAge" className="block text-sm font-semibold mb-1">Retirement Age</label>
             <input
               type="number"
               id="retirementAge"
               name="retirementAge"
               value={formData.retirementAge}
               onChange={handleChange}
               placeholder="Enter your retirement age"
               className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out"
               required
             />
           </div>
           <div className="w-full md:w-1/2">
             <label htmlFor="desiredIncome" className="block text-sm font-semibold mb-1">Desired Retirement Income (INR)</label>
             <input
               type="number"
               id="desiredIncome"
               name="desiredIncome"
               value={formData.desiredIncome}
               onChange={handleChange}
               placeholder="Enter your desired retirement income"
               className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out"
               required
             />
           </div>
           <div className="w-full md:w-1/2">
             <label htmlFor="currentSavings" className="block text-sm font-semibold mb-1">Current Savings (INR)</label>
             <input
               type="number"
               id="currentSavings"
               name="currentSavings"
               value={formData.currentSavings}
               onChange={handleChange}
               placeholder="Enter your current savings"
               className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out"
               required
             />
           </div>
           <div className="w-full md:w-1/2">
             <label htmlFor="riskTolerance" className="block text-sm font-semibold mb-1">Risk Tolerance</label>
             <select
               id="riskTolerance"
               name="riskTolerance"
               value={formData.riskTolerance}
               onChange={handleChange}
               className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out"
               required
             >
               <option value="">Select Risk Tolerance</option>
               <option value="low">Low</option>
               <option value="medium">Medium</option>
               <option value="high">High</option>
             </select>
           </div>
           <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg w-full md:w-auto hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500 transition-all duration-300 ease-in-out">
             Calculate
           </button>
         </div>
        </form>

      {result && (
        <div className="mt-8">
          <h2 className="text-lg font-bold mb-4">Results</h2>
          <p>Required Savings: INR {result.requiredSavings}</p>
          <p>Expected Corpus: INR {result.expectedCorpus}</p>
          <div className="mt-4">
            <h3 className="text-lg font-bold mb-2">Investment Suggestions</h3>
            <ul>
              {suggestions.map((item) => (
                <li key={item.id} className="mb-2">
                  {item.name} - INR {item.amount}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-2">Retirement Projection Chart</h3>
            <ChartComponent id="chart" primaryXAxis={primaryXAxis} primaryYAxis={primaryYAxis} legendSettings={legendSettings}>
              <Inject services={[Legend]} />
              <SeriesCollectionDirective>
                <SeriesDirective type="Line" dataSource={chartData.corpusData} xName="labels" yName="corpusData" name="Corpus Growth" />
              </SeriesCollectionDirective>
            </ChartComponent>
          </div>
        </div>
      )}
    </div>
  );
};

export default RetirementPlanner;
