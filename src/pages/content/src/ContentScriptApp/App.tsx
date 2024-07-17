import React from 'react';
import EmotionCacheProvider from "@pages/content/src/ContentScriptApp/emotion/EmotionCacheProvider";
import ResetStyleProvider from "@pages/content/src/ContentScriptApp/emotion/ResetStyleProvider";
import FontProvider from "@pages/content/src/ContentScriptApp/emotion/FontProvider";
import { CSSReset, theme, ThemeProvider } from "@chakra-ui/react";
import ParentComponent from "./drawer/ParentComponent"; // Adjust the path as necessary
import DragGPT from "@pages/content/src/ContentScriptApp/DragGPT";

function App() {
  return (
    <ResetStyleProvider>
      <FontProvider>
        <EmotionCacheProvider>
          <ThemeProvider theme={theme}>
            <CSSReset />
            <ParentComponent />
            <DragGPT />
          </ThemeProvider>
        </EmotionCacheProvider>
      </FontProvider>
    </ResetStyleProvider>
  );
}

export default App;
