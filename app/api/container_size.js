import axios from "axios";

export const getContainers = async () => {
    try {
        return await axios.get(
            `http://auth.g42.biz/api/containers/sizes`,
        )
    } catch (e) {
        throw e;
    }
}

export const add = async (containerSize) => {
    try {
        return await axios.post(
            `http://auth.g42.biz/api/containers/sizes`,
            containerSize

        )
    } catch (e) {
        throw e;
    }
}
export const update = async (id, containerSize) => {
    try {
        return await axios.put(
            `http://auth.g42.biz/api/containers/sizes/${id}`,
            containerSize,

        );
    } catch (e) {
        throw e;
    }
};

export const dele = async (id) => {
    try {
        return await axios.delete(
            `http://auth.g42.biz/api/containers/sizes/${id}`,

        )

    } catch (e) {
        throw e;
    }
}
