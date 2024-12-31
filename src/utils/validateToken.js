import axiosClient from "../config/axiosClient";

export default async function validateToken() {
    return new Promise((resolve, reject) => {
        axiosClient.post('/auth/validateToken')
        .then((res) => resolve(res))
        .catch(() => reject())
    });
}

