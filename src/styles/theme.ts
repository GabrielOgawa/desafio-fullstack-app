import { extendTheme } from "@chakra-ui/react";

const custonTheme = extendTheme({
  colors: {
    gray: {
      100: "#EDF2F7",
      200: "#E2E8F0",
      300: "#CBD5E0",
      500: "#718096",
      600: "#4A5568",
    },
    red: {
      500: "#E53E3E",
    },
    green: {
      300: "#68D391",
    },
    cyan: {
      200: "#90CDF4",
      300: "#63B3ED",
      400: "#4299E1",
      500: "#3182CE"
    }
  },
  fonts: {
    heading: "Inter, sans-serif",
    body: "Inter, sans-serif",
  },
  fontSises: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem",
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  radii: {
    none: "0",
    sm: "0.125rem",
    base: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
  },

  styles: {
    global: {
      body: {
        bg: "white",
        color: "black",
      },
    },
  },
  components: {
    Button: {
      variants: {
        default: {
          bg: "gray.300",
          border: "2px solid transparent",
          color: "black",
          _hover: {
            bg: "gray.600",
            color: "gray.100"
          },
        },
        cancel: {
          bg: "gray.300",
          border: "2px solid transparent",
          color: "black",
          _hover: {
            bg: "red.500",
            color: "white"
          },
        },
        modal:{
          bg: "transparent",
          border: "none",
          color: "black",
          _hover: {
            color: "white"
          }
        },
        modalAdd: {
          bg: "transparent",
          border: "none",
          color: "black",
        },
        disabled: {
          bg: "gray.500",
          border: "2px solid",
          borderColor: "gray.900",
          color: "gray.50",
          _hover: {
            bg: "gray.700",
          },
        },
        error: {
          bg: "red.600",
          border: "2px solid",
          borderColor: "red.700",
          color: "gray.50",
          _hover: {
            bg: "red.700",
          },
        },
        sucess: {
          bg: "green.600",
          border: "2px solid",
          borderColor: "green.700",
          color: "gray.50",
          _hover: {
            bg: "green.700",
          },
        },
      },
    },
  },
});

export default custonTheme;