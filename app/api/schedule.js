import axios from 'axios';

const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
});
export const getSchedules = async (id) => {
    try {
        return await axios.get(
            `https://auth.g42.biz/api/schedules/${id}`,
            id,getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}
