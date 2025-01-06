import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// @mui Icon
import { AppBar, Toolbar, Button, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";

import Master from "../assets/image/Master.png";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();

    const handleCartClick = () => {
        if (!isAuthenticated) {
            toast.error("يجب تسجيل الدخول للوصول إلى السلة!", { position: "top-right" });
        } else {
            navigate("/cart");
        }
    };

    const handleProfileClick = () => {
        navigate("/profile");
    };

    return (
        <>
            <AppBar position="static" style={{ background: "#d43f11" }}>
                <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", height: 'auto', width: '100px' }}>
                        <img
                            src={Master}
                            alt="Sofra Logo"
                            style={{ height: 'auto', width: '100%' }}
                        />
                    </div>
                    <div>
                        {!isAuthenticated ? (
                            <>
                                <Button
                                    color="inherit"
                                    startIcon={<PersonAddIcon />}
                                    onClick={() => navigate("/auth/signup")}
                                >
                                    !لم تسجل بعد
                                </Button>

                                <Button
                                    color="inherit"
                                    startIcon={<LoginIcon />}
                                    onClick={() => navigate("/auth/login")}
                                >
                                    تسجيل دخول
                                </Button>
                            </>
                        ) : (
                            <>
                                <IconButton color="inherit" onClick={handleProfileClick}>
                                    <AccountCircleIcon />
                                </IconButton>
                                <IconButton color="inherit" onClick={handleCartClick}>
                            <ShoppingCartIcon />
                        </IconButton>
                                <Button
                                    color="inherit"
                                    onClick={logout}
                                >
                                    تسجيل خروج
                                </Button>
                            </>
                        )}

                       
                    </div>
                </Toolbar>
            </AppBar>
            <ToastContainer />
        </>
    );
};

export default Navbar;
