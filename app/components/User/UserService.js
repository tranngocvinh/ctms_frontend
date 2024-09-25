import axios from 'axios';

const API_URL = `https://auth.g42.biz/api/v1/customers`;

class UserService {
    getUsers(getAuthConfig) {
        return axios.get(API_URL, getAuthConfig);
    }

    getUserById(id) {
        return axios.get(`${API_URL}/${id}`);
    }

    async createUser(role, user) {
        try {
            return await axios.post(`${API_URL}/${role}`, user);
        } catch (error) {
            const errorMessage = 'An unexpected error occurred';
            console.error(errorMessage);
            throw new Error(errorMessage);
        }
    }

    updateUser(id, user) {
        return axios.put(`${API_URL}/${id}`, user);
    }

    deleteUser(id) {
        return axios.delete(`${API_URL}/${id}`);
    }
}

export default new UserService();
