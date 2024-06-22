import axios from 'axios';

export const getSchedules = async () => {
    try {
        return await axios.get(
            'http://localhost:8080/api/schedules',
        )
    } catch (e) {
        throw e;
    }
}
