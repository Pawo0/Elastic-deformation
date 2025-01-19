import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Rejestracja komponentów Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const wyniki10 = [
    26.666666666666693,
    23.333333333333357,
    20.000000000000018,
    16.666666666666686,
    13.333333333333355,
    10.000000000000025,
    8.000000000000018,
    6.0000000000000115,
    4.000000000000007,
    2.0000000000000036,
    0
]


const Chart = ({ data }) => {
    if (!data || !data.wyniki || data.wyniki.length === 0) {
        return <p>Brak danych do wyświetlenia wykresu.</p>;
    }

    // Generowanie etykiet dla osi X na podstawie zakresu i ilości punktów
    const labels = Array.from(
        { length: data.wyniki.length },
        (_, i) => (data.od + (i * (data.do - data.od)) / (data.wyniki.length - 1)).toFixed(2)
    );

    // Generowanie etykiet dla u(10)
    const labels10 = Array.from(
        { length: wyniki10.length },
        (_, i) => ((i * (2 - 0)) / (wyniki10.length - 1)).toFixed(2)
    );

    // Przygotowanie danych dla wykresu
    const chartData = {
        labels, // Domyślne etykiety dla pierwszej osi X
        datasets: [
            {
                label: 'u(n)',
                data: data.wyniki,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
                pointRadius: 3,
                tension: 0.2, // Gładkość linii
                xAxisID: 'x', // Powiązanie z pierwszą osią X
            },
            {
                label: 'u(10)',
                data: wyniki10,
                borderColor: 'rgb(232,7,101)',
                backgroundColor: 'rgba(213,0,9,0.2)',
                borderWidth: 2,
                pointRadius: 3,
                tension: 0.2, // Gładkość linii
                xAxisID: 'x10', // Powiązanie z drugą osią X
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Rozwiązanie u(n) i u(10) na przedziale [0, 2]',
            },
        },
        scales: {
            x: {
                type: 'category',
                title: {
                    display: true,
                    text: 'n (dla u(n))',
                },
            },
            x10: {
                type: 'category',
                title: {
                    display: true,
                    text: 'n (dla u(10))',
                },
                labels: labels10,
                position: 'top',
            },
            y: {
                title: {
                    display: true,
                    text: 'u(n)',
                },
            },
        },
    };

    return <Line data={chartData} options={options} style={{maxWidth:"1500px", maxHeight:"750px"}} />;
};

export default Chart;