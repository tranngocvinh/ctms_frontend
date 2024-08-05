import axios from 'axios';

export const getAllSIs = async () => {
    try {
        return await axios.get(
            'http://localhost:8080/api/si',
        )
    } catch (e) {
        throw e;
    }
}
