import axios from "axios";

const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
    }
})
export const getContainers = async () => {
    try {
        return await axios.get(
            `https://auth.g42.biz/api/containers`,getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const add = async (container) => {
    try {
        console.log("Sending add request:", container); // Log the request data
        return await axios.post(`https://auth.g42.biz/api/containers`, container);
    } catch (e) {
        console.log("Add request error:", e); // Log the error
        throw e;
    }
};
export const update = async (id, container) => {
    try {
        return await axios.put(
            `https://auth.g42.biz/api/containers/${id}`,
            container,

        );
    } catch (e) {
        throw e;
    }
};

export const dele = async (id) => {
    try {
        return await axios.delete(
            `https://auth.g42.biz/api/containers/${id}`,

        )

    } catch (e) {
        throw e;
    }
}

export const allocateContainersToShip = async (data) => {
    return axios.post(`https://auth.g42.biz/api/containers/allocate/ship`, data,getAuthConfig());
};

export const getEmptyContainers = async () => {
    try {
        return await axios.get(
            `https://auth.g42.biz/api/containers/allocate/ship`,
        )
    } catch (e) {
        throw e;
    }
}

export const getEmptyContainerById = async (id) => {
    try {
        return await axios.get(
            `https://auth.g42.biz/api/containers/allocate/ship/${id}`,
        )
    } catch (e) {
        throw e;
    }
}

export const allocateContainersToPort = async (numberOfContainers, portName) => {
    return axios.post(`https://auth.g42.biz/api/containers/allocate/port`, {
        numberOfContainers,
        portName
    });
};

export const isUpdateApproved = async (id) => {
    try {
        return await axios.put(
            `https://auth.g42.biz/api/containers/allocate/ship/approved/${id}`,getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}
