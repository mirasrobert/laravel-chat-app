import axios from "axios";

// Register user
const register = async (userData) => {
    const response = await axios.post("/api/register", userData);

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
};

// Login user
const login = async (userData) => {
    const response = await axios.post("/api/login", userData);

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
};

// Logout user
const logout = async () => {
    await axios.post("/api/logout");

    localStorage.removeItem("user");
};

// Get one user
const getOneUser = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get("/api/user", config);

    return response.data;
};

const authService = {
    register,
    logout,
    login,
    getOneUser,
};

export default authService;
