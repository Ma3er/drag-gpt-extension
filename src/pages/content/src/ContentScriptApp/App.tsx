import DragGPT from "@pages/content/src/ContentScriptApp/DragGPT";
import EmotionCacheProvider from "@pages/content/src/ContentScriptApp/emotion/EmotionCacheProvider";
import ResetStyleProvider from "@pages/content/src/ContentScriptApp/emotion/ResetStyleProvider";
import FontProvider from "@pages/content/src/ContentScriptApp/emotion/FontProvider";
import { CSSReset, theme, ThemeProvider } from "@chakra-ui/react";
import ParentComponent from "./drawer/ParentComponent"; // Adjust the path as necessary

export default function App() {
  return (
    <ResetStyleProvider>
      <ParentComponent />
      <FontProvider>
        <EmotionCacheProvider>
          <ThemeProvider theme={theme}>
            <CSSReset />
            <DragGPT />
          </ThemeProvider>  
        </EmotionCacheProvider>
      </FontProvider>
    </ResetStyleProvider>
  );
}
