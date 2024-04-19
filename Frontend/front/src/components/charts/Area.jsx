import { ChartComponent, SeriesCollectionDirective, SeriesDirective,
    SplineAreaSeries, Inject, AreaSeries, DateTime, Legend, Tooltip } from '@syncfusion/ej2-react-charts';
  
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
   
  ];
  
  export const areaCustomSeries = [
    {
      dataSource: areaChartData[0],
      xName: 'x',
      yName: 'y',
      name: 'Income',
      opacity: '0.5',
      type: 'SplineArea',
      width: '150',
      fill:"blueviolet",
      color:"white",
  
    },
   
  ];
  
  export const areaPrimaryXAxis = {
    valueType: 'DateTime',
    labelFormat: 'y',
    interval:3,
    majorGridLines: { width: 2 },
    intervalType: 'Years',
    edgeLabelPlacement: 'Shift',
    labelStyle: { color: 'white' },
  };
  
  export const areaPrimaryYAxis = {
    labelFormat: '{value}%',
    lineStyle: { width: 2 },
    maximum: 4,
    interval: 2,
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
    labelStyle: { color: 'white' },
  
    
  
  };
  function Area() {
    return (
      <div className=" flex items-center justify-center p-2 rounded-xl w-full">
      <ChartComponent
        id="line-chart"
        className="min-[390px]:w-[85%] max-[1200px]:w-[88%] max-[225px]:w-[65%]"
        height="80%"  // Set height using vh (viewport height)
        // Set width using percentage
        primaryXAxis={areaPrimaryXAxis}
        primaryYAxis={areaPrimaryYAxis}
        chartArea={{ border: { width: 0 } }}
        tooltip={{ enable: true }}
        rangeColorSettings={{ color: "white"}}
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
            fill={item.fill}
            />
          ))}
        </SeriesCollectionDirective>
      </ChartComponent>
          </div>
    );
  }
  export default Area;
  