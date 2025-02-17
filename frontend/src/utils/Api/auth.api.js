const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const signin = async (data) => {
    const response = await fetch(`${BACKEND_URL}/auth/signin`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
    });
    if (response.ok) {
        const userData = await response.json();
        return userData;
    } else {
        return false;
    }
};

export const signup = async (data) => {
    const response = await fetch(`${BACKEND_URL}/auth/signup`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (response.ok) {
        return true;
    } else {
        return false;
    }
};

export const signout = async () => {
    const response = await fetch(`${BACKEND_URL}/auth/signout`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        credentials: "include",
    });
    if (response.ok) {
        return true;
    } else {
        return false;
    }
};

export const verifyToken = async () => {
    const response = await fetch(`${BACKEND_URL}/auth/verifyToken`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        credentials: "include",
    });
    if (response.ok) {
        return response.json();
    } else {
        return false;
    }
};