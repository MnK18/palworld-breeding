/** @type {import('tailwindcss').Config} */
export default {
    content: [],
    theme: {
      extend: {},
    },
    plugins: [
      function ({addUtilities}) {
        const newUtilities = {
          ".hide-scrollbar::-webkit-scrollbar": {
            display: "none",
          },
          ".hide-scrollbar": {
            "-ms-overflow-style": "none",
            "scrollbar-width": "none",
          },
        };
  
        addUtilities(newUtilities);
      }
    ],
  }
  
  