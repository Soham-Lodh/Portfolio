module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-deep': '#0a0e27',
        'bg-mid': '#1a1f3a',
        'accent-red': '#00d9ff',
        'text-light': '#b0bec5',
        'text-lightest': '#eceff1',
        'text-dark': '#000000'
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
      },
      fontSize: {
        xs: '11px',
        sm: '13px',
        base: '14px',
        lg: '15px',
        xl: '16px',
        '2xl': '18px',
        '3xl': '20px',
        '4xl': '24px',
        '5xl': '28px',
        '6xl': '32px',
        '7xl': '40px',
        '8xl': '48px',
        '9xl': '72px',
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
      },
    },
  },
  plugins: [],
};
