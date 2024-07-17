// StyleProvider.tsx
import { ReactNode } from "react";
import {
  ColorModeProvider,
  CSSReset,
  GlobalStyle,
  ThemeProvider,
} from "@chakra-ui/react";
import customTheme from "../../../src/pages/content/src/ContentScriptApp/drawer/customTheme" // Import the custom theme

export default function StyleProvider({
  children,
  isDark,
}: {
  children: ReactNode;
  isDark: boolean;
}) {
  return (
    <ColorModeProvider
      colorModeManager={{
        type: "localStorage" as const,
        get: () => (isDark ? "dark" : ("light" as const)),
        set() {
          return;
        },
      }}
    >
      <ThemeProvider theme={customTheme}> {/* Use the custom theme */}
        <CSSReset />
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </ColorModeProvider>
  );
}