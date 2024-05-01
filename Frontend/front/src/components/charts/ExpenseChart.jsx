import React, { useState, useEffect } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, SplineAreaSeries, Inject, DateTime, Tooltip, Legend, Highlight } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';


const ExpenseChart = ({ valid }) => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [valid]);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/expgraph/${localStorage.getItem('username')}`);
      if (!response.ok) {
        throw new Error('Failed to fetch graph data');
      }
      const data = await response.json();
      const formattedData = data.map(item => ({
        x: new Date(item.x.year, item.x.month - 1, item.x.day),
        y: item.y, 
      }));
      const sortedData = formattedData.sort((a, b) => a.x - b.x); 
      setGraphData(sortedData);

      
      const leastRecentDate = sortedData.length > 0 ? sortedData[0].x : new Date();

      const chartElement = document.getElementById('charts');
      const chartInstance = chartElement.ej2_instances[0];
      chartInstance.primaryXAxis.minimum = leastRecentDate;
      chartInstance.refresh(); 
    } catch (error) {
      console.error('Error fetching graph data:', error);
    }
  };

  const onChartLoad = (args) => {
    let chart = document.getElementById('charts');
    chart.setAttribute('title', '');
  };

  const load = (args) => {
    let selectedTheme = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast');
  };

  return (
    <div className="flex flex-col items-center justify-center p-2 w-full rounded-lg" style={{ background: 'linear-gradient(to top, rgba(82, 130, 194, 0.21), rgba(0, 0, 0, 0.8))', backdropFilter: 'blur(10px)' }}>
      <h1 className="text-3xl font-semibold text-white text-center mb-4">EXPENSE GRAPH </h1>

      <ChartComponent
        id="charts"
        className="min-[390px]:w-[85%] max-[1200px]:w-[88%] max-[225px]:w-[65%]"
        height="80%"
        style={{ textAlign: 'center', color: 'white' }}
        primaryXAxis={{
        title:"Date and Time",
          valueType: 'DateTime',
          labelFormat: 'y',
          majorGridLines: { width: 0 },
          intervalType: 'Years',
          edgeLabelPlacement: 'Shift',
          labelStyle: { color: 'white' },
          titleStyle:{color: 'white'}

        }}
        primaryYAxis={{
          title:"Expenses in Rupees",
          labelFormat: 'Rs {value}',
          lineStyle: { width: 0 },
          interval: 100,
          majorTickLines: { width: 0 },
          minorTickLines: { width: 0 },
          maximum: 700, 
          labelStyle: { color: 'white' },
          titleStyle:{color: 'white'}

        }}
        load={load}
        width={Browser.isDevice ? '100%' : '85%'}
        legendSettings={{ visible: true, position:'Top' }}
        chartArea={{ border: { width: 0 } }}
        loaded={onChartLoad}
        tooltip={{ enable: true }}

      >
        <Inject services={[SplineAreaSeries, DateTime, Tooltip, Legend, Highlight]} />
        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={graphData}
            xName="x"
            yName="y"
            name="Expenses"
            marker={{ visible: true, isFilled: true, height: 10, width: 10, shape: 'Circle',fill:"white"}}
            opacity={0.5}
            type="SplineArea"
            width={2}
            fill='#1d4ed8'
            border={{ width: 2, color: '#1d4ed8' }}
          />
        
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
};

export default ExpenseChart;
