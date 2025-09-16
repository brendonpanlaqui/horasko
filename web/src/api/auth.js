import api from "./axios";

export async function getCSRF() {
    return api.get("/sanctum/csrf-cookie");
}

export async function signup(data) {
    await getCSRF();
    return api.post("/api/signup", data);
}

export async function login(data) {
    await getCSRF();
    return api.post("/api/login", data);
}

export async function logout() {
    await getCSRF();
    return api.post("/api/logout");
}

export async function getMe() {
    return api.get("/api/me");
}
