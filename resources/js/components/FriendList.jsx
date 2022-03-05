import React from "react";

const FriendList = ({ people }) => {
    return (
        <>
            <div className="col-12 col-lg-5 col-xl-3 border-right">
                <div className="px-4 d-none d-md-block">
                    <div className="d-flex align-items-center">
                        <div className="flex-grow-1">
                            <input
                                type="search"
                                className="form-control my-3"
                                placeholder="Search..."
                            />
                        </div>
                    </div>
                </div>

                {people.map((person, index) => (
                    <>
                        <a
                            key={index + 1}
                            href="#"
                            className="list-group-item list-group-item-action border-0"
                        >
                            <div className="d-flex align-items-start">
                                <img
                                    src="https://bootdey.com/img/Content/avatar/avatar3.png"
                                    className="rounded-circle me-1"
                                    alt={person.name}
                                    width="40"
                                    height="40"
                                />
                                <div className="flex-grow-1 ms-3">
                                    {person.name}
                                    <div className="small">
                                        <span className="fas fa-circle chat-offline"></span>{" "}
                                        Online
                                    </div>
                                </div>
                            </div>
                        </a>
                    </>
                ))}

                {/*     <a
                    href="#"
                    className="list-group-item list-group-item-action border-0">
                    <div className="badge bg-success float-end">5</div>
                    <div className="d-flex align-items-start">
                        <img
                            src="https://bootdey.com/img/Content/avatar/avatar5.png"
                            className="rounded-circle me-1"
                            alt="Vanessa Tucker"
                            width="40"
                            height="40"
                        />
                        <div className="flex-grow-1 ms-3">
                            Vanessa Tucker
                            <div className="small">
                                <span className="fas fa-circle chat-online"></span>{" "}
                                Online
                            </div>
                        </div>
                    </div>
                </a> */}

                <hr className="d-block d-lg-none mt-1 mb-0" />
            </div>
        </>
    );
};

export default FriendList;
