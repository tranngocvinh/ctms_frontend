import axios from 'axios';
const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
    }
})
export const getContainers = async () => {
    try {
        return await axios.get(
            `https://auth.g42.biz/api/v1/supplier`, getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const uploadImage = async (formData) => {
    try {
        return await axios.post(
            `https://auth.g42.biz/api/v1/supplier`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            }
        )
    } catch (e) {
        throw e;
    }
}

export const updateSupplier = async (id, data, image) => {
    try {
        const formData = new FormData();
        formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));
        if (image) {
            formData.append('image', image);
        }

        return await axios.put(
            `https://auth.g42.biz/api/v1/supplier/${id}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            },getAuthConfig()
        );
    } catch (e) {
        throw e;
    }
};
export const deleteSupplier = async (id) => {
    try {
        return await axios.delete(
            `https://auth.g42.biz/api/v1/supplier/${id}`,getAuthConfig()

        )

    } catch (e) {
        throw e;
    }
}

export const getImageById = (id) =>
    `https://auth.g42.biz/api/v1/supplier/${id}`;
