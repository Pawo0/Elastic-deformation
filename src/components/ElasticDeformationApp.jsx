// // src/components/ElasticDeformationApp.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Line } from 'react-chartjs-2';
//
// const ElasticDeformationApp = () => {
//     const [N, setN] = useState(2);
//     const [data, setData] = useState(null);
//
//     useEffect(() => {
//         recalculate();
//     }, [N]);
//
//     const recalculate = async () => {
//         try {
//             console.log('Recalculating solution...');
//             const response = await axios.post('http://localhost:3001/calculate', { N });
//             setData(response.data);
//         } catch (error) {
//             console.error('Error calculating solution:', error);
//         }
//     };
//
//     const chartData = {
//         labels: data ? data.x : [],
//         datasets: [
//             {
//                 label: 'Przybliżone rozwiązanie',
//                 data: data ? data.y : [],
//                 borderColor: 'rgba(75,192,192,1)',
//                 fill: false,
//             },
//             {
//                 label: 'Dokładne rozwiązanie',
//                 data: [
//                     { x: 0, y: 80 / 3 },
//                     { x: 1, y: 10 },
//                     { x: 2, y: 0 },
//                 ],
//                 borderColor: 'rgba(255,99,132,1)',
//                 fill: false,
//             },
//         ],
//     };
//
//     return (
//         <div>
//             <h1>Elastic Deformation Solver</h1>
//             <label>
//                 Liczba elementów skończonych:
//                 <input
//                     type="number"
//                     min="2"
//                     value={N}
//                     onChange={(e) => setN(Number(e.target.value))}
//                 />
//             </label>
//             <div>
//                 {data && <Line data={chartData} />}
//             </div>
//         </div>
//     );
// };
//
// export default ElasticDeformationApp;
