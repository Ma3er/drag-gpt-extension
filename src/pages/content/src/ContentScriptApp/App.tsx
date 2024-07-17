// App.tsx
import React from 'react';
import { ChakraProvider, CSSReset, theme, ThemeProvider } from '@chakra-ui/react';
import customTheme from './drawer/customTheme'; // Import the custom theme
import ParentComponent from './drawer/ParentComponent';
import DragGPT from "@pages/content/src/ContentScriptApp/DragGPT";
import EmotionCacheProvider from "@pages/content/src/ContentScriptApp/emotion/EmotionCacheProvider";
import ResetStyleProvider from "@pages/content/src/ContentScriptApp/emotion/ResetStyleProvider";
import FontProvider from "@pages/content/src/ContentScriptApp/emotion/FontProvider";

export default function App() {
  return (
    <ResetStyleProvider>
      <FontProvider>
        <EmotionCacheProvider>
          <ChakraProvider theme={customTheme}>
            <CSSReset />
            <ParentComponent />
            <DragGPT />
          </ChakraProvider>
        </EmotionCacheProvider>
      </FontProvider>
    </ResetStyleProvider>
  );
}
