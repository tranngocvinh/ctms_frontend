import axios from 'axios';
const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
    }
})
export const getEmptyContainertoAddSI = async () => {
    try {
        return await axios.get(
            `http://auth.g42.biz/api/containers/allocate/ship/isApprove`,getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}
