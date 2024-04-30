'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';

const Dash: React.FC = () => {
  const [data, setData] = useState({
    distance: 0,
    gasValue: 0,
    moisturePercentage: 0,
  });

  const [moistureData, setMoistureData] = useState<number[]>([]);
  const [gasData, setGasData] = useState<number[]>([]);
  const [distanceData, setDistanceData] = useState<number[]>([]);

  const maxDataPoints = 11;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.0.178:5000/get_data');
        const newData = response.data;
        setData(newData);

        setMoistureData(prevData => [...prevData, newData.moisturePercentage].slice(-maxDataPoints));
        setGasData(prevData => [...prevData, newData.gasValue].slice(-maxDataPoints));
        setDistanceData(prevData => [...prevData, newData.distance].slice(-maxDataPoints));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);

const chartOptions = {
  backgroundColor: 'transparent', 
  colors: ['#FFFFFF'], 
  titleTextStyle: {
    color: 'white', 
  },
  hAxis: {
    title: 'Time',
    textStyle: {
      color: 'white', 
    },
    titleTextStyle: {
      color: 'white', 
    },
  },
  vAxis: {
    titleTextStyle: {
      color: 'white',
    },
    textStyle: {
      color: 'white', 
    },
    gridlines: {
      color: 'gray',
    },
  },
};

  return (
    <div className="text-center   text-white pb-10">
      <h1 className="text-4xl font-semibold pt-10 lg:pt-0 ">EcoSaviour</h1>
      <h1 className="lg:text-2xl text-xl font-semibold mt-1 mb-4">Implementing an intregrated agricultural system</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div>
          <Chart
            width={'550px'}
            height={'450px'}
            chartType="LineChart"
            loader={<div></div>}
            data={[
              ['Time', ''],
              ...moistureData.map((value, index) => [index, value]),
            ]}
            options={{
              ...chartOptions,
              title: 'Moisture Percentage',
              vAxis: {
                title: 'Value',
                titleTextStyle: {
                  color: 'white', 
                },
                textStyle: {
                  color: 'white', 
                },
                gridlines: {
                  color: 'gray', 
                },
                viewWindow: {
                  min: 89 ,//10, 
                  max: 91, //60, 
                },
              },
            }}
          />
          <h2>Moisture Percentage : {moistureData[moistureData.length - 1]}%</h2>
        </div>
        <div>
          <Chart
            width={'550px'}
            height={'450px'}
            chartType="LineChart"
            loader={<div></div>}
            data={[
              ['Time', ''],
              ...gasData.map((value, index) => [index, value]),
            ]}
            options={{
              ...chartOptions,
              title: 'Gas Value',
              vAxis: {
                title: 'Value',
                titleTextStyle: {
                  color: 'white', 
                },
                textStyle: {
                  color: 'white', 
                },
                gridlines: {
                  color: 'gray', 
                },
                viewWindow: {
                  min: 50, 
                  max: 100, 
                },
              },
            }}
          />
        <h2>Gas Value : {gasData[gasData.length - 1]}</h2>
        </div>
        <div>
          <Chart
            width={'550px'}
            height={'450px'}
            chartType="LineChart"
            loader={<div></div>}
            data={[
              ['Time', ''],
              ...distanceData.map((value, index) => [index, value]),
            ]}
            options={{
              ...chartOptions,
              title: 'Distance',
              vAxis: {
                title: 'Value',
                titleTextStyle: {
                  color: 'white', 
                },
                textStyle: {
                  color: 'white',
                },
                gridlines: {
                  color: 'gray', 
                },
                viewWindow: {
                  min: 0, 
                  max: 150, 
                },
              },
            }}
          />
          <h2>Distance : {distanceData[distanceData.length - 1]}</h2>

        </div>
      </div>
    </div>
  );
};

export default Dash;
