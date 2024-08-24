import axios from 'axios';

export const getContainers = async () => {
    try {
        return await axios.get(
            `http://auth.g42.biz/api/v1/supplier`,
        )
    } catch (e) {
        throw e;
    }
}

export const uploadImage = async (formData) => {
    try {
        return await axios.post(
            `http://auth.g42.biz/api/v1/supplier`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
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
            `http://auth.g42.biz/api/v1/supplier/${id}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
    } catch (e) {
        throw e;
    }
};
export const deleteSupplier = async (id) => {
    try {
        return await axios.delete(
            `http://auth.g42.biz/api/v1/supplier/${id}`,

        )

    } catch (e) {
        throw e;
    }
}

export const getImageById = (id) =>
    `http://auth.g42.biz/api/v1/supplier/${id}`;
