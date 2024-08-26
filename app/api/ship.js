import axios from 'axios';

export const getShip = async () => {
    try {
        return await axios.get(
            `https://auth.g42.biz/api/ships`,
        )
    } catch (e) {
        throw e;
    }
}

export const add = async (ship) => {
    try {
        return await axios.post(
            `https://auth.g42.biz/api/ships`,
            ship

        )
    } catch (e) {
        throw e;
    }
}


export const update = async (id, ship) => {
    try {
        return await axios.put(
            `https://auth.g42.biz/api/ships/${id}`,
            ship,

        );
    } catch (e) {
        throw e;
    }
};
export const dele = async (id) => {
    try {
        return await axios.delete(
            `https://auth.g42.biz/api/ships/${id}`,

        )

    } catch (e) {
        throw e;
    }
}
