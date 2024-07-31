import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LoadCellWeight.css'; // Import the CSS for styling

function LoadCellWeight() {
  const [loadCellWeightData, setLoadCellWeightData] = useState([]);
  const [latestWeight, setLatestWeight] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.98.99:3001/api/loadcell-data');
        const rawData = response.data;
        setLoadCellWeightData(rawData);

        if (rawData.length > 0) {
          setLatestWeight(rawData[0].weightScale);
        }
      } catch (error) {
        console.error('Error fetching load cell weight data:', error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 3000); // Fetch every 3 seconds
    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  return (
    <div className='mt-5'>
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-white mb-4">Load Cell Weight Data</h2>

          <div className="flex items-center justify-center mb-5">
            <div className="digital-display">
              <div className="digit">{latestWeight !== null ? `${latestWeight.toFixed(2)}` : 'Loading...'} kg</div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="bg-white rounded-xl shadow-md">
              <table className="min-w-full bg-white rounded-xl overflow-hidden">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Timestamp</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Weight</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {loadCellWeightData.map((data) => (
                    <tr key={data._id}>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(data.timestamp).toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{data.weightScale} kg</td>
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

export default LoadCellWeight;
