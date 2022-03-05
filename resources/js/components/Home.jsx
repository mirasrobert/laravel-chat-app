import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages, sendMessage } from "../features/messages/messageSlice";

import FriendList from "./FriendList";
import MessageRightHeader from "./MessageRightHeader";
import MessageBox from "./MessageBox";
import Message from "./Message";

import Loader from "./Loader/Loader";

import Echo from "laravel-echo";

const Home = () => {
    const { user } = useSelector((state) => state.auth);

    // Init PUSHER
    window.Pusher = require("pusher-js");

    window.Echo = new Echo({
        broadcaster: "pusher",
        key: process.env.MIX_PUSHER_APP_KEY,
        wsHost: window.location.hostname,
        wsPort: 6001,
        forceTLS: false,
        disableStats: true,
        auth: {
            headers: {
                Authorization: "Bearer " + user.token || null,
            },
        },
    });

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [messageList, setMessageList] = useState([]);

    const [loading, setLoading] = useState(true);

    const [messageTxt, setMessageTxt] = useState("");

    const [people, setPeople] = useState([]);

    // const { messages, isLoading, isSuccess, isError } = useSelector(
    //     (state) => state.messages
    // );

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, []);

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);

            const headers = { Authorization: `Bearer ${user.token}` };

            const response = await axios.get("/api/messages", {
                headers,
            });

            if (response.status === 200) {
                setMessageList(response.data);
            }
            setLoading(false);
        };

        getMessages();

        window.Echo.join("chat")
            .here((user) => {
                setPeople(user);
            })
            .joining((user) => {
                setPeople((prevState) => [...prevState, user]);
            })
            .leaving((user) => {
                setPeople((prevState) =>
                    prevState.filter((p) => p.id !== user.id)
                );
            })
            .listen("MessageSent", (e) => {
                console.log(e);

                setMessageList((prevState) => [...prevState, e.message]); // Add the message
            });
    }, [dispatch]);

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const messageData = { message: messageTxt };

        dispatch(sendMessage(messageData));

        setMessageTxt(""); // Clear Input

        // Returns a random integer from 0 to 100:
        let id = Math.floor(Math.random() * 99999999);

        setMessageList((prevState) => [
            ...prevState,
            {
                id: id,
                user_id: user.user.id,
                message: messageTxt,
                user: user.user,
            },
        ]); // Add the message
    };

    return (
        <div className="home-content">
            <div className="container p-0">
                <div className="card">
                    <div className="row g-0">
                        <FriendList people={people} />

                        <div className="col">
                            <MessageRightHeader user={user} />

                            {/* MESSAGES */}
                            <div className="position-relative">
                                <div className="chat-messages p-4">
                                    {!loading &&
                                        messageList.map((message, index) => (
                                            <>
                                                <Message
                                                    key={index + 1}
                                                    message={message}
                                                    isMessageOwned={
                                                        user.user.id ==
                                                        message.user_id
                                                    }
                                                />
                                            </>
                                        ))}
                                </div>
                            </div>

                            <div className="flex-grow-0 py-3 px-4 border-top">
                                <form
                                    className="d-inline-block w-100"
                                    onSubmit={onSubmitHandler}
                                >
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Type your message"
                                            value={messageTxt}
                                            onChange={(e) =>
                                                setMessageTxt(e.target.value)
                                            }
                                        />
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                        >
                                            Send
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
