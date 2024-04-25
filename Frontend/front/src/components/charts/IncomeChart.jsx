import React, { useState, useEffect } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, ColumnSeries, Inject, Tooltip, Legend } from '@syncfusion/ej2-react-charts';

const IncomeChart = () => {
  const [incomeData, setIncomeData] = useState([]);

  useEffect(() => {
    fetchIncomeData();
  }, []);

  const fetchIncomeData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/graph/yuvi'); // Replace 'username' with the actual username
      if (!response.ok) {
        throw new Error('Error fetching income data');
      }
      const data = await response.json();
      setIncomeData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center p-2 w-full rounded-lg" style={{ background: 'linear-gradient(to top, rgb(2, 0, 94, 0.5), rgba(0, 0, 0, 0.8))', backdropFilter: 'blur(10px)' }}>
      <ChartComponent
        id="charts"
        className="min-[390px]:w-[85%] max-[1200px]:w-[88%] max-[225px]:w-[65%]"
        height="80%"
        style={{ textAlign: 'center', color: 'white' }}
        primaryXAxis={{
          valueType: 'Category',
          labelStyle: { color: 'white' } 
        }}
        primaryYAxis={{
          labelFormat: '${value}',
          lineStyle: { width: 0 },
          interval: 500,
          majorTickLines: { width: 0 },
          minorTickLines: { width: 0 },
          labelStyle: { color: 'white' } 
        }}
        width="75%"
        legendSettings={{ visible: false }}
        chartArea={{ border: { width: 0 } }}
        title="Income Chart"
        tooltip={{ enable: true }}
      >
        <Inject services={[ColumnSeries, Tooltip, Legend]} />
        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={incomeData}
            xName="x"
            yName="y"
            type="Column"
          />
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
};

export default IncomeChart;
