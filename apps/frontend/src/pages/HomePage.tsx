import React from "react";
import Navbar from "../components/Navbar";
import PhoneTicker from "../components/PhoneTicker";
import HeroSection from "../components/HeroSection";
import CategoryTabs from "../components/CategoryTabs";
import FoodPage from "./FoodPage"; // استيراد صفحة المأكولات
import DrinksPage from "./DrinksPage"; // استيراد صفحة المشروبات
import { useHomeUi } from "../hooks/ui/useHomeUI";

const HomePage = () =>
{
    const { category, setCategory } = useHomeUi();

    const renderPage = () =>
    {
        if (category === "food") return <FoodPage />;
        if (category === "drink") return <DrinksPage />;
        return null;
    };

    return (
        <>
            <Navbar />
            <PhoneTicker />
            <HeroSection />
            <CategoryTabs category={category} setCategory={setCategory} />
            {renderPage()}
        </>
    );
};

export default HomePage;
