import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../features/auth/authSlice";

const Register = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/home");
        }
    }, [user]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });

    const { name, email, password, passwordConfirm } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();

        dispatch(
            register({
                name,
                email,
                password,
                password_confirmation: passwordConfirm,
            })
        );

        //navigate("/home"); // Redirect After Register
    };

    useEffect(() => {
        if (localStorage.getItem("user")) {
            navigate("/home");
        }
    }, []);

    return (
        <>
            <div className="card mt-5">
                <div className="card-header">
                    <h3>Sign Up</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={onSubmitHandler}>
                        <div className="mb-3">
                            <label
                                htmlFor="exampleInputEmail1"
                                className="form-label"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                id="exampleInputname1"
                                aria-describedby="nameHelp"
                                onChange={onChange}
                                value={name}
                            />
                        </div>

                        <div className="mb-3">
                            <label
                                htmlFor="exampleInputEmail1"
                                className="form-label"
                            >
                                Email address
                            </label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                onChange={onChange}
                                value={email}
                            />
                            <div id="emailHelp" className="form-text">
                                We'll never share your email with anyone else.
                            </div>
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="exampleInputPassword1"
                                className="form-label"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                onChange={onChange}
                                value={password}
                            />
                        </div>

                        <div className="mb-3">
                            <label
                                htmlFor="exampleInputPassword1"
                                className="form-label"
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="passwordConfirm"
                                className="form-control"
                                id="exampleInputPassword1"
                                onChange={onChange}
                                value={passwordConfirm}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
            <Link to={"/"}>Login here</Link>
        </>
    );
};

export default Register;
