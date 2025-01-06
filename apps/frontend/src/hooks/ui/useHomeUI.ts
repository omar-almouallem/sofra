import { useState } from 'react';

export const useHomeUi = () => {
  const [category, setCategory] = useState('food');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ممكن تعديله لاحقاً حسب الـ auth

  return { category, setCategory, isLoggedIn };
};
