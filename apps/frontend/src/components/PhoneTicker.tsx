import React from "react";
import { Box, Typography } from "@mui/material";

const PhoneTicker = () =>
{
    return (
        <Box
            sx={{
                backgroundColor: "#f8f8f8",
                overflow: "hidden",
                whiteSpace: "nowrap",
                padding: "10px 0",
                textAlign: "center",
            }}
        >
            <Typography
                variant="body1"
                component="span"
                sx={{
                    display: "inline-block", // تأكد من أن العنصر لا يكون بلوك
                    animation: "ticker 35s linear infinite", // تطبيق الأنيميشن
                }}
            >

                أهلاً وسهلاً في سفرة، حيث نأتيك بأطيب الأطباق المنزلية! استمتع بتجربة طعام مميزة وذكريات لا تُنسى مع كل لقمة.
                تواصل معنا📞:   +963 1234 56789

            </Typography>

            {/* إضافة الأنماط هنا مع @keyframes */}
            <Box
                component="style"
                sx={{
                    display: "none", // هذه الطريقة فقط لإضافة الأنماط داخل الـ JSX
                }}
            >
                {`
          @keyframes ticker {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(+100%); }
          }
        `}
            </Box>
        </Box>
    );
};

export default PhoneTicker;
