import axios from 'axios';

export const getAllSIs = async () => {
    try {
        return await axios.get(
            `https://auth.g42.biz/api/si`,
        )
    } catch (e) {
        throw e;
    }
}
