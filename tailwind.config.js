/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      colors: {
        'btnBlue': '#5089FC',
        'hover' : '#78AAFF',
        'pressed' : '#2D64C8',
        'hover2_bg' : '#D2DCFF',
        'hover2_txt' : '#2D64C8',
        'deleteRed' : '#F04438',
        'state' : '#E6EAFA',
        'stateIng' : 'rgba(134, 247, 189, 0.5)',
        'stateComplete' : 'rgba(231, 187, 255, 0.5)',
        'stateError' : 'rgba(247, 201, 173, 0.5)',
      },
    },
  },
  plugins: [],
}

