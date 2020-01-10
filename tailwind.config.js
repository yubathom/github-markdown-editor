const { spacing } = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      spacing: {
        ...spacing,
        '128': '32rem'
      }, 
    }
  },
  variants: {},
  plugins: []
}
