import axios from 'axios';

export const getSchedules = async (id) => {
    try {
        return await axios.get(
            `http://auth.g42.biz/api/schedules/${id}`,
            id
        )
    } catch (e) {
        throw e;
    }
}
