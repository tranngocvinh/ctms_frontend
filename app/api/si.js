import axios from 'axios';

export const getEmptyContainertoAddSI = async () => {
    try {
        return await axios.get(
            'http://localhost:8080/api/containers/allocate/ship',
        )
    } catch (e) {
        throw e;
    }
}
