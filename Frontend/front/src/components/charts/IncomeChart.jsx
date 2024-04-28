import React, { useState, useEffect } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, SplineAreaSeries, Inject, DateTime, Tooltip, Legend, Highlight } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';

const IncomeChart = ({valid}) => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/graph/${localStorage.getItem('username')}`);
      if (!response.ok) {
        throw new Error('Failed to fetch graph data');
      }
      const data = await response.json();

      if (data && Array.isArray(data)) {
        const formattedData = data.map((ele) => ({
          x: new Date(ele.x.year, ele.x.month - 1, ele.x.day),
          y: ele.y,
        }));
        setGraphData(formattedData);
      }
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

  // Calculate minimum and maximum values for x-axis and y-axis
  const calculateMinMaxValues = () => {
    let minXValue = new Date(); // Initialize with current date
    let maxXValue = new Date(2000, 0, 1); // Initialize with a past date
    let minYValue = Number.MAX_VALUE;
    let maxYValue = Number.MIN_VALUE;

    graphData.forEach((dataPoint) => {
      // Calculate minimum and maximum x-values
      if (dataPoint.x < minXValue) {
        minXValue = dataPoint.x;
      }
      if (dataPoint.x > maxXValue) {
        maxXValue = dataPoint.x;
      }

      // Calculate minimum and maximum y-values
      if (dataPoint.y < minYValue) {
        minYValue = dataPoint.y;
      }
      if (dataPoint.y > maxYValue) {
        maxYValue = dataPoint.y;
      }
    });

    return { minXValue, maxXValue, minYValue, maxYValue };
  };

  const { minXValue, maxXValue, minYValue, maxYValue } = calculateMinMaxValues();

  return (
    <div className="flex items-center justify-center p-2 w-full rounded-lg" style={{ background: 'linear-gradient(to top, rgb(2, 0, 94, 0.5), rgba(0, 0, 0, 0.8))', backdropFilter: 'blur(10px)' }}>
      <ChartComponent
        id="charts"
        className="min-[390px]:w-[85%] max-[1200px]:w-[88%] max-[225px]:w-[65%]"
        height="80%"
        style={{ textAlign: 'center', color: 'white' }}
        primaryXAxis={{
          valueType: 'DateTime',
          labelFormat: 'y',
          majorGridLines: { width: 0 },
          intervalType: 'Years',
          minimum: minXValue,
          maximum: maxXValue,
          edgeLabelPlacement: 'Shift',
          labelStyle: { color: 'white' } 
        }}
        primaryYAxis={{
          labelFormat: '{value}',
          lineStyle: { width: 0 },
          minimum: minYValue,
          maximum: maxYValue,
          interval: Math.ceil((maxYValue - minYValue) / 5), // Adjust interval based on data range
          majorTickLines: { width: 0 },
          minorTickLines: { width: 0 },
          labelStyle: { color: 'white' } 
        }}
        load={load.bind(this)}
        width={Browser.isDevice ? '100%' : '85%'}
        legendSettings={{ enableHighlight: true }}
        chartArea={{ border: { width: 0 } }}
        title="Money in Rupees"
        loaded={onChartLoad.bind(this)}
        tooltip={{ enable: true }}
      >
        <Inject services={[SplineAreaSeries, DateTime, Tooltip, Legend, Highlight]} />
        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={graphData}
            xName="x"
            yName="y"
            name="Expense"
            marker={{ visible: true, isFilled: true, height: 0, width: 0, shape: 'Circle' }}
            opacity={0.3}
            type="SplineArea"
            width={2}
            fill="#16a34a"
            border={{ width: 4, color: '#16a34a' }} // Set glow effect color here
          />
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
};

export default IncomeChart;
