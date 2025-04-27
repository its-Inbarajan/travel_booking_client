import { createContext, useContext } from "react";

export type Theme = "dark" | "light" | "system";

export interface IintialState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const initialState: IintialState = {
  theme: "system",
  setTheme: () => null,
};

export const ThemeContext = createContext<IintialState>(initialState);

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
