import React from "react";
import EmotionCacheProvider from "@pages/content/src/ContentScriptApp/emotion/EmotionCacheProvider";
import ResetStyleProvider from "@pages/content/src/ContentScriptApp/emotion/ResetStyleProvider";
import FontProvider from "@pages/content/src/ContentScriptApp/emotion/FontProvider";
import { CSSReset, ChakraProvider } from "@chakra-ui/react";
import ParentComponent from "./drawer/ParentComponent"; // Adjust the path as necessary
import DragGPT from "@pages/content/src/ContentScriptApp/DragGPT";
import customTheme from "./drawer/customTheme";

function App() {
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

export default App;
