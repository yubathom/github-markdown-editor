const { spacing, minWidth } = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    extend: {
      spacing: {
        ...spacing,
        "128": "32rem"
      },
      minWidth: {
        ...minWidth,
        "1/4": "25%",
        "1/2": "50%",
        "1/6": "16.666667%"
      }
    }
  },
  variants: {},
  plugins: []
};
