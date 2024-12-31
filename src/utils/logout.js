import axiosClient from "../config/axiosClient";

export default async function validateToken() {
    return new Promise((resolve, reject) => {
        axiosClient.post('/auth/logout')
        .then(() => resolve())
        .catch(() => reject())
    });
};

