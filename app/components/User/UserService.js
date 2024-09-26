import axios from 'axios';

const API_URL = `https://auth.g42.biz/api/v1/customers`;

const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
});

class UserService {
    getUsers() {
        return axios.get(API_URL, getAuthConfig());
    }

    getUserById(id) {
        return axios.get(`${API_URL}/${id}`,getAuthConfig());
    }

    async createUser(role, user) {
        try {
            return await axios.post(`${API_URL}/${role}`, user,getAuthConfig());
        } catch (error) {
            const errorMessage = 'An unexpected error occurred';
            console.error(errorMessage);
            throw new Error(errorMessage);
        }
    }

    updateUser(id, user) {
        return axios.put(`${API_URL}/${id}`, user, getAuthConfig());
    }

    deleteUser(id) {
        return axios.delete(`${API_URL}/${id}`, getAuthConfig());
    }
}

export default new UserService();
