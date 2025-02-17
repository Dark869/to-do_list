const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const userData = async () => {
    try {
        const response = await fetch(`${BACKEND_URL}/user`, {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
}