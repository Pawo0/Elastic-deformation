import React, { useState, useEffect } from 'react';
import { solveElasticDeformation } from '../api/solverApi';
import Chart from '../components/Chart';
import Spinner from '../components/Spinner';
import log from "eslint-plugin-react/lib/util/log.js";

const ElasticSolver = () => {
    const [N, setN] = useState(10); // Domyślnie 10 elementów skończonych
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await solveElasticDeformation(N);
                setData(result);
            } catch (error) {
                console.error('Błąd podczas obliczeń:', error);
            }
        };
        fetchData();
    }, [N]);

    return (
        <div>
            <h1>Solver Odkształcenia Sprężystego</h1>
            <Spinner value={N} setValue={setN} />
            {data ? (
                <Chart
                    data={data}
                />
            ) : (
                <p>Ładowanie danych...</p>
            )}
        </div>
    );
};

export default ElasticSolver;
