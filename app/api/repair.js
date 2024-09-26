import axios from "axios";

const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
    }
})
export const getAllRepair = async () => {
    try {
        return await axios.get(
            `https://auth.g42.biz/api/v1/repair`,getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const createRepair = async (repair) => {
    try {
        console.log("Sending add request:", repair); // Log the request data
        return await axios.post(`https://auth.g42.biz/api/v1/repair`, repair,getAuthConfig());
    } catch (e) {
        console.log("Add request error:", e); // Log the error
        throw e;
    }
};
export const update = async (id, repair) => {
    try {
        return await axios.put(
            `https://auth.g42.biz/api/v1/repair/${id}`,
            repair,getAuthConfig()

        );
    } catch (e) {
        throw e;
    }
};

export const repairFinish = async (id) => {
    try {
        return await axios.put(
            `https://auth.g42.biz/api/v1/repair/finish/${id}`,getAuthConfig()

        )

    } catch (e) {
        throw e;
    }
}

export const handlePayment = async (id) => {
    try {
        return await axios.put(
            `https://auth.g42.biz/api/v1/repair/payment/${id}`,getAuthConfig()

        )

    } catch (e) {
        throw e;
    }
}

