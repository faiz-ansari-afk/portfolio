'use client';
import { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const ThemeToggle = () => {
  const [theme, setTheme] = useState<String | null>(null);

  const handleColorSchemeChange = (event: {
    matches: Boolean;
    media: String;
  }) => {
    const newColorScheme = event.matches ? 'dark' : 'light';
    setTheme(newColorScheme);
  };

  useEffect(() => {
    if (!theme) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      handleColorSchemeChange(mediaQuery);
    } else {
      localStorage.setItem('theme', `${theme}`);
    }
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // check for system theme
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Set the initial color scheme based on user preference
      handleColorSchemeChange(mediaQuery);
    }

    // Add the event listener for color scheme changes
    mediaQuery.addEventListener('change', handleColorSchemeChange);

    // Clean up the event listener when the component unmounts
    return () => {
      mediaQuery.removeEventListener('change', handleColorSchemeChange);
    };
  }, []);
  return (
    <>
      <div className="flex items-center space-x-2">
        <Switch
          id="theme"
          checked={theme === 'dark'}
          onCheckedChange={() =>
            setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
          }
        />
        <Label htmlFor="theme" >
          <span className="text-xs">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </Label>
      </div>
    </>
  );
};

export default ThemeToggle;
