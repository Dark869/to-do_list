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
        return true;
    } else {
        return false;
    }
};