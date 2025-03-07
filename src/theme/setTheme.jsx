import { useEffect, useState } from 'react';

const themeHandler = () => {
  const [themeH, setThemeH] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  const handleTheme = () => {
    setThemeH(prevTheme => {
      const newTheme = !prevTheme;
      localStorage.setItem('theme', JSON.stringify(newTheme));
      return newTheme;
    });
  };

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(themeH));
  }, [themeH]);

  return { themeH, handleTheme };
};

export default themeHandler;