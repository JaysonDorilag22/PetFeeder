import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FaCat } from 'react-icons/fa'; // Import the cat icon from react-icons

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function RfidScanner() {
  const [rfidData, setRfidData] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [summaryData, setSummaryData] = useState({
    ph: null,
    waterLevel: null,
    catWeight: null,
    foodLevel: null,
    drinkFrequency: 0,
    eatFrequency: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rfidResponse, phResponse, waterLevelResponse, loadCellWeightResponse, loadCellFoodResponse] = await Promise.all([
          axios.get('http://192.168.98.99:3001/api/rfid-data'),
          axios.get('http://192.168.98.99:3001/api/ph-data'),
          axios.get('http://192.168.98.99:3001/api/waterlevel-data'),
          axios.get('http://192.168.98.99:3001/api/loadcell-data'),
          axios.get('http://192.168.98.99:3001/api/foodlevel-data')
        ]);

        const rawRfidData = rfidResponse.data;
        const rawPhData = phResponse.data;
        const rawWaterLevelData = waterLevelResponse.data;
        const rawLoadCellWeightData = loadCellWeightResponse.data;
        const rawLoadCellFoodData = loadCellFoodResponse.data;

        // Process RFID data
        const timestamps = rawRfidData.map(data => new Date(data.timestamp).toLocaleDateString());
        const uniqueTimestamps = [...new Set(timestamps)];
        const frequency = uniqueTimestamps.map(date =>
          timestamps.filter(timestamp => timestamp === date).length
        );

        setChartData({
          labels: uniqueTimestamps,
          datasets: [
            {
              label: 'Frequency',
              data: frequency,
              backgroundColor: 'rgba(255, 0, 0, 0.5)', // Semi-transparent red
              borderColor: 'rgba(255, 0, 0, 1)', // Red border
              borderWidth: 1,
            },
          ],
        });

        // Process and summarize other data
        const latestPh = rawPhData.length > 0 ? rawPhData[0].ph : null;
        const latestWaterLevel = rawWaterLevelData.length > 0 ? rawWaterLevelData[0].waterLevel : null;
        const latestCatWeight = rawLoadCellWeightData.length > 0 ? rawLoadCellWeightData[0].weightScale : null;
        const latestFoodLevel = rawLoadCellFoodData.length > 0 ? rawLoadCellFoodData[0].foodLevel : null;

        const drinkFrequency = rawWaterLevelData.length; // Adjust if needed
        const eatFrequency = rawLoadCellFoodData.length; // Adjust if needed

        setSummaryData({
          ph: latestPh,
          waterLevel: latestWaterLevel,
          catWeight: latestCatWeight,
          foodLevel: latestFoodLevel,
          drinkFrequency,
          eatFrequency
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 3000); // Fetch every 3 seconds
    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  return (
    <div className='mt-5'>
      <div className="max-w-4xl mx-auto bg-red-400 rounded-xl shadow-md overflow-hidden">
        <div className="p-4">
          {/* Table Section */}
          <div className="overflow-x-auto mb-5">
            <div className="bg-white rounded-xl shadow-md">
              <table className="min-w-full bg-white rounded-xl overflow-hidden">
                <thead className="bg-red-300">
                  <tr>
                    <th className="px-6 py-3 text-center text-xs font-large text-white-500 uppercase tracking-wider">Timestamp</th>
                    <th className="px-6 py-3 text-center text-xs font-large text-white-500 uppercase tracking-wider">Tag ID</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {rfidData.map((data) => (
                    <tr key={data._id}>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(data.timestamp).toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{data.uid}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-4">RFID Scanner Data</h2>

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
                      text: 'RFID Scan Frequency Over Time',
                    },
                  },
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: 'Date',
                      },
                      ticks: {
                        autoSkip: true,
                        maxTicksLimit: 10,
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: 'Frequency',
                      },
                      min: 0,
                    },
                  },
                }} 
              />
            </div>
          )}

          {/* Summary Section */}
          <div className="mt-5 bg-white rounded-xl shadow-md p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <FaCat className="mr-2 text-gray-600" /> Summary Data
            </h2>
            <ul>
              <li className="mb-2">pH Value: {summaryData.ph !== null ? `${summaryData.ph} pH` : 'No data'}</li>
              <li className="mb-2">Water Level: {summaryData.waterLevel !== null ? `${summaryData.waterLevel} units` : 'No data'}</li>
              <li className="mb-2">Cat Weight: {summaryData.catWeight !== null ? `${summaryData.catWeight} kg` : 'No data'}</li>
              <li className="mb-2">Food Level: {summaryData.foodLevel !== null ? `${summaryData.foodLevel} grams` : 'No data'}</li>
              <li className="mb-2">Drink Frequency: {summaryData.drinkFrequency} times</li>
              <li className="mb-2">Eat Frequency: {summaryData.eatFrequency} times</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RfidScanner;
