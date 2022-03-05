import { useState, useEffect } from "react";
import Message from "./Message";

const MessageBox = ({ messages, user }) => {
    const [messageList, setMessageList] = useState(messages);

    useEffect(() => {
        setMessageList(messages);

        window.Echo.join("chat").listen("MessageSent", (e) => {
            setMessageList((prevState) => [...prevState, e]);
        });
    }, []);

    return (
        <>
            {!messages[0].id && (
                <div className="chat-messages p-4">
                    {messageList.map((message, index) => (
                        <>
                            <Message
                                message={message}
                                isMessageOwned={user.user.id == message.user.id}
                                key={message.id}
                            />
                        </>
                    ))}
                </div>
            )}
        </>
    );
};

export default MessageBox;
