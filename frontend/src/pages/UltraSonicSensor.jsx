import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function UltraSonicSensor() {
  const [ultrasonicData, setUltrasonicData] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [latestFoodLevel, setLatestFoodLevel] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/foodlevel-data');
        const data = response.data;
  
        console.log('Fetched Data:', data); // Debug log to check data
  
        setUltrasonicData(data);
  
        // Extract timestamps and food levels
        const timestamps = data.map(data => new Date(data.timestamp).toLocaleString());
        const foodLevels = data.map(data => data.foodLevel);
  
        setChartData({
          labels: timestamps,
          datasets: [
            {
              label: 'Food Level (g)',
              data: foodLevels,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
          ],
        });
  
        // Update the latest food level
        if (data.length > 0) {
          const latestLevel = data[0].foodLevel; // Assuming latest data is first
          setLatestFoodLevel(latestLevel);

          // Check food level and show notification if below threshold
          if (latestLevel < 30) {
            toast.warning('Food level is below 30 grams!');
          }
        }
      } catch (error) {
        console.error('Error fetching ultrasonic data:', error);
      }
    };
  
    fetchData();
    const intervalId = setInterval(fetchData, 3000); // Fetch every 3 seconds
    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);
  

  return (
    <div className='mt-5'>
      <ToastContainer />
      <div className="max-w-4xl mx-auto bg-yellow-400 rounded-xl shadow-md overflow-hidden">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-white mb-4">UltraSonic Sensor Data</h2>

          {/* Food Level Visualization */}
          <div className="flex justify-center mb-5">
            <div className="relative w-32 h-80 bg-gray-200 rounded-xl border-4 border-gray-400 flex items-center justify-center">
              <div
                className="absolute bottom-0 left-0 w-full rounded-b-xl"
                style={{
                  backgroundColor: '#8B4513', // Brown color
                  height: `${(latestFoodLevel / 500) * 100}%`, // Adjust height based on food level
                  transition: 'height 0.5s ease-in-out', // Smooth transition
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-gray-700">
                {latestFoodLevel} g
              </div>
            </div>
          </div>

          {/* Bar Chart */}
          {chartData && (
            <div className="mb-5">
              <Bar 
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
                      text: 'Food Level Over Time',
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
                        text: 'Food Level (g)',
                      },
                      min: 0,
                      max: 500,
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
                <thead className="bg-yellow-300">
                  <tr>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Timestamp</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Food Level (g)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {ultrasonicData.map((data) => (
                    <tr key={data._id}>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(data.timestamp).toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{data.foodLevel} g</td>
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

export default UltraSonicSensor;
