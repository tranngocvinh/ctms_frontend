import axios from 'axios';

export const getShip = async () => {
    try {
        return await axios.get(
            `http://localhost:8080/api/ships`,
        )
    } catch (e) {
        throw e;
    }
}

export const add = async (ship) => {
    try {
        return await axios.post(
            `http://localhost:8080/api/ships`,
            ship

        )
    } catch (e) {
        throw e;
    }
}


export const update = async (id, ship) => {
    try {
        return await axios.put(
            `http://localhost:8080/api/ships/${id}`,
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
