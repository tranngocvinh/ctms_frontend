import axios from 'axios';

export const getSchedules = async (id) => {
    try {
        return await axios.get(
            `http://localhost:8080/api/schedules/${id}`,
            id
        )
    } catch (e) {
        throw e;
    }
}
