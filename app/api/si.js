import axios from 'axios';
const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
    }
})
export const getEmptyContainertoAddSI = async () => {
    try {
        return await axios.get(
            `http://localhost:8080/api/containers/allocate/ship/isApprove`,getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}
