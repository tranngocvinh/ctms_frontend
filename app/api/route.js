import axios from 'axios';

export const getRoute = async () => {
    try {
        return await axios.get(
            `${process.env.VITE_API_BASE_URL}/api/routes`,
        )
    } catch (e) {
        throw e;
    }
}

export const add = async (route) => {
    try {
        return await axios.post(
            `https://auth.g42.biz/api/routes`,
            route

        )
    } catch (e) {
        throw e;
    }
}
