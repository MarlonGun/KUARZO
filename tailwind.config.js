/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./layout/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      screens: {
        'xs': '375px', // Small phones
        'sm': '640px', // Large phones
        'md': '768px', // Tablets
        'lg': '1024px', // Small laptops
        'xl': '1280px', // Desktops
      },
    },

    fontFamily: {
      'roboto-bold': ['Roboto-Bold', 'sans-serif'],
      'roboto-medium': ['Roboto-Medium', 'sans-serif'],
      'opensans-regular': ['OpenSans-Regular', 'sans-serif'],
      'opensans-light': ['OpenSans-Light', 'sans-serif'],
    },

    colors: {
      primary: {
        DEFAULT: '#FED20F',
        500: '#F4BA00'
      },
      secondary: {
        DEFAULT: '#FF9309',
        500: '#E27600'
      },
      tertiary: {
        DEFAULT: '#282828',
        500: '#111111'
      },
      quaternary: {
        DEFAULT: '#C2C2C2',
        500: '#ffffff',
        950: '#000000'
      }
    },

  },
  plugins: [],
}
