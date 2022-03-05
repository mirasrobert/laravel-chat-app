import Spinner from "./Spinner.gif";

const Loader = () => {
    return (
        <div className="flex align-items-center justify-items-center">
            <img src={Spinner} alt="Loading..." />
        </div>
    );
};

export default Loader;
