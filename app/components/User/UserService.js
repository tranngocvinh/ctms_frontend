import axios from 'axios';

const API_URL = 'https://auth.g42.biz/api/v1/customers';

class UserService {
    getUsers() {
        return axios.get(API_URL);
    }

    getUserById(id) {
        return axios.get(`${API_URL}/${id}`);
    }

    createUser(role, user) {
        return axios.post(`${API_URL}/${role}`, user);  // Role determines the API endpoint (admin, customer, ship)
    }

    updateUser(id, user) {
        return axios.put(`${API_URL}/${id}`, user);
    }

    deleteUser(id) {
        return axios.delete(`${API_URL}/${id}`);
    }
}

export default new UserService();
