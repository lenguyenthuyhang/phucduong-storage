/** @type {import('tailwindcss').Config} */
export default {
  // When using "class" mode, Tailwind will add the "dark" class to the root element (usually the <body> element) to indicate that the page is currently in dark mode
  darkMode: 'class',
  // By configuring content, Tailwind CSS will retrieve and build files containing the required CSS styles and generate the final CSS output file
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '480px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1600px',
    },
    colors: {
      black: '#000000',
      green: '#00A76F',
      blue: '#1fb6ff',
      purple: '#6a66e3',
      pink: '#ff49db',
      orange: '#ff7849',
      yellow: '#ffc82c',
      gray: '#637381',
      hover: '#63738114',

      success: '#22c55e',
      warning: '#ff7849',
      error: '#ff5630',
      info: '#00b8d9',

      'gray-100': '#F9FAFB',
      'gray-200': '#F4F6F8',
      'gray-300': '#DFE3E8',
      'gray-400': '#C4CDD5',
      'gray-500': '#F9FAFB',
      'gray-600': '#637381',
      'gray-700': '#454F5B',
      'gray-800': '#212B36',
      'gray-900': '#161C24',
    },
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
    },
    divideWidth: {
      DEFAULT: '1px',
      '0': '0',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
    },
    extend: {
      transitionProperty: {
        height: 'height',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  corePlugins: {
    // Remove the Tailwind CSS preflight styles so it can use custom base style (src/theme/base.css)
    preflight: false, // https://tailwindcss.com/docs/preflight#disabling-preflight
  },
  plugins: [],
};
