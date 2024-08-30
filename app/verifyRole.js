import CryptoJS from "crypto-js";

export const isAdmin = (jwtToken, authToken) => {
    return encodeUserRole('ADMIN', jwtToken) === authToken;
}

export const isManager = (jwtToken, authToken) => {
    return encodeUserRole('MANAGER', jwtToken) === authToken;
}

export const isStaff = (jwtToken, authToken) => {
    return encodeUserRole('STAFF', jwtToken) === authToken;
}

export const isCustomer = (jwtToken, authToken) => {
    return encodeUserRole('CUSTOMER', jwtToken) === authToken;
}

export const encodeUserRole = (userRole, salt) => {
    const saltedUserRole = userRole + salt;
    const hash = CryptoJS.SHA1(saltedUserRole);
    return hash.toString(CryptoJS.enc.Hex);
};
