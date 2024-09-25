import axios, {AxiosResponse} from 'axios';

/**
 * @typedef {Object} Route
 * @property {string} containerTypeId
 * @property {string} length
 * @property {string} width
 * @property {string} height
 * @property {string} volume
 * @property {string} weight
 * @property {string} loadCapacity
 * @property {string} maxLoad
 */

/**
 * @returns {Promise<AxiosResponse<any>>}
 */
const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
    }
})
export const getRoutes = async () => {
    try {
        return await axios.get(`https://auth.g42.biz/api/routes`, getAuthConfig());
    } catch (e) {
        throw e;
    }
}

/**
 * @param {Route} route
 * @returns {Promise<AxiosResponse<any>>}
 */
export const add = async (route) => {
    try {
        return await axios.post(`https://auth.g42.biz/api/routes`, route,getAuthConfig());
    } catch (e) {
        throw e;
    }
}
