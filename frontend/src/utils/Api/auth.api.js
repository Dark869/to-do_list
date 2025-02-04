export const signin = async (data) => {
    const response = await fetch("http://localhost:3000/signin", {
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
    const response = await fetch("http://localhost:3000/signup", {
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
    const response = await fetch("http://localhost:3000/signout", {
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
    const response = await fetch("http://localhost:3000/verifyToken", {
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