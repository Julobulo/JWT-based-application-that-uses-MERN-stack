import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    useEffect(() => {
        const verifyCookie = async () => {
            if (!Cookies.get('token')) {
                navigate("/login");
            }
            const { data } = await axios.post(
                "http://localhost:5555/",
                {},
                { withCredentials: true }
            );
            const { status, user } = data;
            setUsername(user);
            return status
                ? toast(`Hello ${user}`, {
                    position: "top-right",
                })
                : (
                    Cookies.remove('token'),
                    navigate("/login"));
        };
        verifyCookie();
    }, []);
    const Logout = () => {
        Cookies.remove('token');
        navigate("/login");
    };
    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h4 className="text-xl font-bold mb-4">
                        Welcome <span className="text-indigo-600">{username}</span>
                    </h4>
                    <button
                        onClick={Logout}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        LOGOUT
                    </button>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default Home;
