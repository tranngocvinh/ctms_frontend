import axios from "axios";

export const getContainers = async () => {
    try {
        return await axios.get(
            `https://auth.g42.biz/api/containers/sizes`,
        )
    } catch (e) {
        throw e;
    }
}

export const add = async (containerSize) => {
    try {
        return await axios.post(
            `https://auth.g42.biz/api/containers/sizes`,
            containerSize

        )
    } catch (e) {
        throw e;
    }
}
export const update = async (id, containerSize) => {
    try {
        return await axios.put(
            `https://auth.g42.biz/api/containers/sizes/${id}`,
            containerSize,

        );
    } catch (e) {
        throw e;
    }
};

export const dele = async (id) => {
    try {
        return await axios.delete(
            `https://auth.g42.biz/api/containers/sizes/${id}`,

        )

    } catch (e) {
        throw e;
    }
}
