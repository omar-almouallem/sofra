import React from "react";
import { Tabs, Tab, Box } from "@mui/material";

const CategoryTabs = ({ category, setCategory }: any) =>
{
    const handleChange = (event: any, newValue: any) =>
    {
        setCategory(newValue);
    };

    return (
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={category} onChange={handleChange} centered>
                <Tab label="Food" value="food" />
                <Tab label="Drinks" value="drink" />
            </Tabs>
        </Box>
    );
};

export default CategoryTabs;
