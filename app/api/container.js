import axios from "axios";

export const getContainers = async () => {
    try {
        return await axios.get(
            'http://localhost:8080/api/containers',
        )
    } catch (e) {
        throw e;
    }
}

export const add = async (container) => {
    try {
        return await axios.post(
            'http://localhost:8080/api/containers',
            container

        )
    } catch (e) {
        throw e;
    }
}
export const update = async (id, container) => {
    try {
        return await axios.put(
            `http://localhost:8080/api/containers/${id}`,
            container,

        );
    } catch (e) {
        throw e;
    }
};

export const dele = async (id) => {
    try {
        return await axios.delete(
            `http://localhost:8080/api/containers/${id}`,

        )

    } catch (e) {
        throw e;
    }
}
