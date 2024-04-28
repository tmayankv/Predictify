import React, { useState, useEffect } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, SplineAreaSeries, Inject, DateTime, Tooltip, Legend, Highlight } from '@syncfusion/ej2-react-charts';

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
      console.log(sortedData);

      
      const leastRecentDate = sortedData.length > 0 ? sortedData[0].x : new Date();
      console.log('Least recent date:', leastRecentDate);

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
    <div className="flex items-center justify-center p-2 w-full rounded-lg" style={{ background: 'linear-gradient(to top, rgba(2, 0, 94, 0.5), rgba(0, 0, 0, 0.8))', backdropFilter: 'blur(10px)' }}>
      <ChartComponent
        id="charts"
        className="min-w-[390px] w-[85%] max-w-[1200px]:w-[88%] max-w-[225px]:w-[65%]"
        height="400"
        primaryXAxis={{
          valueType: 'DateTime',
          majorGridLines: { width: 0 },
          minorGridLines:{width:0},
          edgeLabelPlacement: 'Shift',
          labelStyle: { color: 'white' },
          minimum: new Date()
        }}
        primaryYAxis={{
          labelFormat: 'Rs {value}',
          lineStyle: { width: 2 },
          majorTickLines: { width: 0 },
          minorTickLines: { width: 0 },
          labelStyle: { color: 'white' }
        }}
        load={load}
        legendSettings={{ visible: true }}
        chartArea={{ border: { width: 0 } }}
        title="Money in Rupees"
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
            opacity={0.27}
            type="SplineArea"
            width={2}
            fill="#2563eb"
            border={{ width: 4, color: '#2563eb' }}
          />
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
};

export default ExpenseChart;
