import React from "react";
import { Box } from "@mui/material";
import sImage from "../assets/image/16.png";

const HeroSection = () =>
{
    return (
        <Box
            sx={{
                width: "100%",
                height: "400px",
                backgroundImage: `url(${ sImage })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        />
    );
};

export default HeroSection;
