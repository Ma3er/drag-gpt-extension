// customTheme.ts
import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  components: {
    Drawer: {
      baseStyle: {
        dialog: {
          bg: "white",
          color: "black",
        },
      },
    },
  },
});

export default customTheme;