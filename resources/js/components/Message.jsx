import moment from "moment";
const Message = ({ isMessageOwned, message }) => {
    return (
        <>
            <div
                key={message.id}
                className={`${
                    isMessageOwned ? "chat-message-right" : "chat-message-left"
                }  pb-4`}
            >
                <div>
                    <img
                        src="https://bootdey.com/img/Content/avatar/avatar1.png"
                        className="rounded-circle me-1"
                        alt="Chris Wood"
                        width="40"
                        height="40"
                    />
                    <div className="text-muted small text-nowrap mt-2">
                        {moment(message.created_at).format("LT")}
                    </div>
                </div>
                <div className="flex-shrink-1 bg-light rounded py-2 px-3 me-3">
                    <div className="font-weight-bold mb-1">
                        {isMessageOwned ? "You" : message.user.name}
                    </div>
                    {message.message}
                </div>
            </div>
        </>
    );
};

export default Message;
