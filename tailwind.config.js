const radixColors = require("@radix-ui/colors");

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "selector",
    theme: {
        extend: {
            backgroundImage: {
                "background-home": "url(../assets/imgs/backgropund-krists-luhaers-unsplash.png)",
            },
            colors: {
                light: {
                    ...radixColors.purple,
                    ...radixColors.purple,
                    ...radixColors.mauve,
                    ...radixColors.mauveA,
                },
                dark: {
                    ...radixColors.purpleDark,
                    ...radixColors.purpleDarkA,
                    ...radixColors.mauveDark,
                    ...radixColors.mauveDarkA,
                },
            },
            screens: {
                xs: "480px",
                "3xl": "1920px",
                "4xl": "2560px",
            },
            fontFamily: {
                montserrat: ["'Montserrat'", "Arial", "sans-serif"],
                inter: ["'Inter'", "Arial", "sans-serif"],
                roboto: ["'Roboto'", "Arial", "sans-serif"],
            },
            backdropBlur: {
                xs: "2px",
            },
        },
    },
    plugins: [],
};
