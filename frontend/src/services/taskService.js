import axios from 'axios';

const API_URL = 'http://localhost:4000/api/tasks';

export const getAllTasks = async () => {
    try {
        const response = await axios.get(API_URL);

        return response.data.tasks;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
}

export const createTask = async (taskData) => {
    try {
        const response = await axios.post(API_URL, taskData);

        return response.data;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
}

export const toggleTask = async (taskId) => {
    try {
        const response = await axios.patch(`${API_URL}/${taskId}/toggle`);

        return response.data;
    } catch (error) {
        console.error('Error toggling task:', error);
        throw error;
    }
}

export const updateTask = async (taskId, updatedData) => {
    try {
        const response = await axios.put(`${API_URL}/${taskId}`, updatedData);

        return response.data;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
}

export const deleteTask = async (taskId) => {
    try {
        const response = await axios.delete(`${API_URL}/${taskId}`);

        return response.data;
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
}