import axios from 'axios';

export const solveElasticDeformation = async (N) => {
    try {
        const response = await axios.post('http://localhost:3001/solve', { N });
        return response.data;
    } catch (error) {
        console.error('Błąd w komunikacji z API:', error);
        throw error;
    }
};