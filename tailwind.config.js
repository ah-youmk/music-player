/** @type {import('tailwindcss').Config} */
import * as colors from '@radix-ui/colors';
import * as tailwindColors from 'tailwindcss/colors';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      ...tailwindColors,
      blackA: colors.blackA,
      violet: colors.violet,
      whiteA: colors.whiteA,
    },
  },
  plugins: [],
};
