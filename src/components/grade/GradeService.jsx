// services/gradeService.js
import axios from 'axios';

const API_URL = '/api/grades';

export const fetchGradesByPupil = async (firstName, lastName, birthDate) => {
    const response = await axios.get(`${API_URL}/pupil`, {
        params: { firstName, lastName, birthDate },
    });
    return response.data;
};

export const submitGrade = async (gradeData) => {
    const response = await axios.post(API_URL, gradeData);
    return response.data;
};
