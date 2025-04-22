

import { createContext , useContext , useState } from "react"

export const ThemeContext = createContext();

// eslint-disable-next-line react/prop-types
export const ThemeProvider = ({children}) => {
    const [isDarkMode , setIsDarkMode ] = useState(false);

    const toggleTheme = ()=> {
        setIsDarkMode(!isDarkMode)
        document.documentElement.classList.toggle("dark");
    }

    return(
        <ThemeContext.Provider value={{ isDarkMode  , toggleTheme}} >
            {children}
        </ThemeContext.Provider>
    )

}

export const useTheme = () => useContext(ThemeContext)