import { ChartComponent, SeriesCollectionDirective, SeriesDirective,
    SplineAreaSeries, Inject, AreaSeries, DateTime, Legend } from '@syncfusion/ej2-react-charts';
  
  const areaChartData = [
    [
      { x: new Date(2002, 0, 1), y: 2.2 },
      { x: new Date(2003, 0, 1), y: 3.4 },
      { x: new Date(2004, 0, 1), y: 2.8 },
      { x: new Date(2005, 0, 1), y: 1.6 },
      { x: new Date(2006, 0, 1), y: 2.3 },
      { x: new Date(2007, 0, 1), y: 2.5 },
      { x: new Date(2008, 0, 1), y: 2.9 },
      { x: new Date(2009, 0, 1), y: 3.8 },
      { x: new Date(2010, 0, 1), y: 1.4 },
      { x: new Date(2011, 0, 1), y: 3.1 },
    ],
    [
      { x: new Date(2002, 0, 1), y: 2 },
      { x: new Date(2003, 0, 1), y: 1.7 },
      { x: new Date(2004, 0, 1), y: 1.8 },
      { x: new Date(2005, 0, 1), y: 2.1 },
      { x: new Date(2006, 0, 1), y: 2.3 },
      { x: new Date(2007, 0, 1), y: 1.7 },
      { x: new Date(2008, 0, 1), y: 1.5 },
      { x: new Date(2009, 0, 1), y: 2.8 },
      { x: new Date(2010, 0, 1), y: 1.5 },
      { x: new Date(2011, 0, 1), y: 2.3 },
    ],
    [
      { x: new Date(2002, 0, 1), y: 0.8 },
      { x: new Date(2003, 0, 1), y: 1.3 },
      { x: new Date(2004, 0, 1), y: 1.1 },
      { x: new Date(2005, 0, 1), y: 1.6 },
      { x: new Date(2006, 0, 1), y: 2 },
      { x: new Date(2007, 0, 1), y: 1.7 },
      { x: new Date(2008, 0, 1), y: 2.3 },
      { x: new Date(2009, 0, 1), y: 2.7 },
      { x: new Date(2010, 0, 1), y: 1.1 },
      { x: new Date(2011, 0, 1), y: 2.3 },
    ],
  ];
  
  export const areaCustomSeries = [
    {
      dataSource: areaChartData[0],
      xName: 'x',
      yName: 'y',
      name: 'USA',
      opacity: '0.8',
      type: 'SplineArea',
      width: '2',
  
    },
    {
      dataSource: areaChartData[1],
      xName: 'x',
      yName: 'y',
      name: 'France',
      opacity: '0.8',
      type: 'SplineArea',
      width: '2',
    },
    {
      dataSource: areaChartData[2],
      xName: 'x',
      yName: 'y',
      name: 'Germany',
      opacity: '0.8',
      type: 'SplineArea',
      width: '2',
    },
  ];
  
  export const areaPrimaryXAxis = {
    valueType: 'DateTime',
    labelFormat: 'y',
    majorGridLines: { width: 0 },
    intervalType: 'Years',
    edgeLabelPlacement: 'Shift',
    labelStyle: { color: 'gray' },
  };
  
  export const areaPrimaryYAxis = {
    labelFormat: '{value}%',
    lineStyle: { width: 0 },
    maximum: 4,
    interval: 1,
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
    labelStyle: { color: 'gray' },
  
  };
  function Area() {
    return (
      <div className="scale-50 small-scale lg:scale-75 flex justify-center bg-white rounded-3xl">
      <ChartComponent
        id="line-chart"
        height="100%"  // Set height using vh (viewport height)
        width="50%"   // Set width using percentage
        primaryXAxis={areaPrimaryXAxis}
        primaryYAxis={areaPrimaryYAxis}
        chartArea={{ border: { width: 0 } }}
        tooltip={{ enable: true }}
      >
        <Inject services={[Legend, DateTime, AreaSeries, SplineAreaSeries]} />
        <SeriesCollectionDirective>
          {areaCustomSeries.map((item, index) => (
            <SeriesDirective
              key={index}
              dataSource={item.dataSource}
              xName={item.xName}
              yName={item.yName}
              name={item.name}
              opacity={item.opacity}
              type={item.type}
              width={item.width}
            />
          ))}
        </SeriesCollectionDirective>
      </ChartComponent>
      </div>
    );
  }
  export default Area;
  