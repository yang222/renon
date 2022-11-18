/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        '2xl': { max: '1536px' },
        // => @media (min-width: 1536px) { ... }
        xl: { max: '1280px' },
        // => @media (min-width: 1280px) { ... }
        lg: { max: '1024px' },
        // => @media (min-width: 1024px) { ... }
        md: { max: '768px' },
        // => @media (min-width: 768px) { ... }
        sm: { max: '640px' },
        // => @media (min-width: 640px) { ... }
        xs: { max: '480px' },
        // => @media (min-width: 480px) { ... }
      },
      boxShadow: {
        input: '0px 10px 26px rgba(4, 23, 83, 0.1)',
        block: '0px 12px 24px rgba(3, 63, 130, 0.12)',
        box: '0 0 15px 0 rgb(153 153 153 / 40%)',
        button:"0 6px 15px 0 rgb(93 187 249 / 50%)",
        button2:"0px 2px 6px rgba(0, 0, 0, 0.25)"
      },
      colors:{
        black: {
          DEFAULT:"#242424",
          dark:"#536D8C"
        },
        theme:{
          DEFAULT:"#64dafd",
          dark:"#4199ff"
        },
        subTheme:{
          
        }
      }
    },
  },
  plugins: [],
}
