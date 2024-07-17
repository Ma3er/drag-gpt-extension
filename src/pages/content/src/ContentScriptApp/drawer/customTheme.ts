// Import the necessary types from Chakra UI
import { extendTheme, ThemeConfig } from "@chakra-ui/react";

// Assuming CustomThemeConfig is defined correctly elsewhere in your code
interface CustomThemeConfig extends ThemeConfig {
  components: {
    Drawer: {
      variants: {
        permanent: {
          dialog: {
            pointerEvents: string;
          },
          dialogContainer: {
            pointerEvents: string;
          },
        },
      },
    },
  };
}

// Use type assertion to ensure the result of extendTheme matches CustomThemeConfig
const customTheme = extendTheme({
  components: {
    Drawer: {
      variants: {
        permanent: {
          dialog: {
            pointerEvents: "auto",
          },
          dialogContainer: {
            pointerEvents: "none",
          },
        },
      },
    },
  },
}) as CustomThemeConfig;

export default customTheme;