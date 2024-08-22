import axios from 'axios';
const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
    }
})
export const getAllSIs = async () => {
    try {
        return await axios.get(
            `http://localhost:8080/api/si/getByRole`,getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}
