import axios from 'axios';
const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
    }
})
export const getAllSIs = async () => {
    try {
        return await axios.get(
            `http://auth.g42.biz/api/si/getByRole`,getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}
