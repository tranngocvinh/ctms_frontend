import axios from 'axios';

export const getEmptyContainertoAddSI = async () => {
    try {
        return await axios.get(
            `https://auth.g42.biz/api/containers/allocate/ship/isApprove`,
        )
    } catch (e) {
        throw e;
    }
}
