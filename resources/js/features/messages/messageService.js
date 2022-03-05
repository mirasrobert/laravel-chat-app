import axios from "axios";

const fetchMessages = async (token) => {
    const headers = { Authorization: `Bearer ${token}` };

    const response = await axios.get("/api/messages", {
        headers,
    });

    return response.data;
};

const sendMessage = async (token, message) => {
    const headers = { Authorization: `Bearer ${token}` };

    const response = await axios.post("/api/messages", message, {
        headers,
    });

    return response.data;
};

const messages = {
    fetchMessages,
    sendMessage,
};

export default messages;
