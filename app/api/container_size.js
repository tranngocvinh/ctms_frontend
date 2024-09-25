import axios from "axios";

const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
    }
})
export const getContainers = async () => {
    try {
        return await axios.get(
            `https://auth.g42.biz/api/containers/sizes`,getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const add = async (containerSize) => {
    try {
        return await axios.post(
            `https://auth.g42.biz/api/containers/sizes`,
            containerSize,getAuthConfig()

        )
    } catch (e) {
        throw e;
    }
}
export const update = async (id, containerSize) => {
    try {
        return await axios.put(
            `https://auth.g42.biz/api/containers/sizes/${id}`,
            containerSize,getAuthConfig()

        );
    } catch (e) {
        throw e;
    }
};

export const dele = async (id) => {
    try {
        return await axios.delete(
            `https://auth.g42.biz/api/containers/sizes/${id}`,getAuthConfig()

        )

    } catch (e) {
        throw e;
    }
}
