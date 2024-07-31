import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function WaterSensor() {
  const [waterSensorData, setWaterSensorData] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [latestWaterLevel, setLatestWaterLevel] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.98.99:3001/api/waterlevel-data');
      const data = response.data;

      // Extract and sort the data (latest first)
      const sortedData = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setWaterSensorData(sortedData);

      const timestamps = sortedData.map(data => new Date(data.timestamp).toLocaleTimeString());
      const levels = sortedData.map(data => data.waterLevel);

      setChartData({
        labels: timestamps,
        datasets: [
          {
            label: 'Water Level',
            data: levels,
            fill: false,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'black',
            borderWidth: 1,
          },
        ],
      });

      if (sortedData.length > 0) {
        setLatestWaterLevel(sortedData[0].waterLevel); // Latest data
      }
    } catch (error) {
      console.error('Error fetching water sensor data:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 3000); // Fetch every 3 seconds
    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  return (
    <div className='mt-5'>
      <div className="max-w-4xl mx-auto bg-teal-400 rounded-xl shadow-md overflow-hidden">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-white mb-4">Water Sensor Data</h2>
          
          {/* Water Bottle Visualization */}
          <div className="flex justify-center mb-5">
            <div className="relative w-32 h-80 bg-gray-200 rounded-xl border-4 border-gray-400 flex items-center justify-center">
              <div
                className="absolute bottom-0 left-0 w-full rounded-b-xl bg-blue-500"
                style={{ height: `${latestWaterLevel}%`, maxHeight: '100%', transition: 'height 0.5s ease-in-out' }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-gray-700">
                {latestWaterLevel}%
              </div>
            </div>
          </div>

          {/* Line Chart */}
          {chartData && (
            <div className="mb-5">
              <Line 
                data={chartData} 
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: true,
                      position: 'top',
                    },
                    title: {
                      display: true,
                      text: 'Water Level Over Time',
                    },
                  },
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: 'Timestamp',
                      },
                      ticks: {
                        autoSkip: true,
                        maxTicksLimit: 10,
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: 'Water Level (%)',
                      },
                      suggestedMin: 0,
                      suggestedMax: 100,
                    },
                  },
                }} 
              />
            </div>
          )}

          {/* Data Table */}
          <div className="overflow-x-auto">
            <div className="bg-white rounded-xl shadow-md">
              <table className="min-w-full bg-white rounded-xl overflow-hidden">
                <thead className="bg-teal-300">
                  <tr>
                    <th className="px-6 py-3 text-center text-xs font-large text-white-500 uppercase tracking-wider">Timestamp</th>
                    <th className="px-6 py-3 text-center text-xs font-large text-white-500 uppercase tracking-wider">Water Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {waterSensorData.map((data) => (
                    <tr key={data._id}>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(data.timestamp).toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{data.waterLevel} {data.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WaterSensor;
