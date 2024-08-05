import axios from 'axios';

export const getShip = async () => {
    try {
        return await axios.get(
            `${process.env.VITE_API_BASE_URL}/api/ships`,
        )
    } catch (e) {
        throw e;
    }
}

export const add = async (ship) => {
    try {
        return await axios.post(
            `${process.env.VITE_API_BASE_URL}/api/ships`,
            ship

        )
    } catch (e) {
        throw e;
    }
}


export const update = async (id, ship) => {
    try {
        return await axios.put(
            `${process.env.VITE_API_BASE_URL}/api/ships/${id}`,
            ship,

        );
    } catch (e) {
        throw e;
    }
};
export const dele = async (id) => {
    try {
        return await axios.delete(
            `http://localhost:8080/api/ships/${id}`,

        )

    } catch (e) {
        throw e;
    }
}
