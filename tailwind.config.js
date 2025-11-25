module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#0A1D37',
          cyan: '#00D4FF',
          'cyan-light': '#00E5FF',
          teal: '#0099CC',
          'purple-accent': '#7C3AED',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #0A1D37 0%, #0A1D37 50%, #1a3a52 100%)',
        'glow-gradient': 'linear-gradient(135deg, #00D4FF 0%, #0099CC 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 212, 255, 0.5)',
        'glow-lg': '0 0 40px rgba(0, 212, 255, 0.6)',
        'glow-teal': '0 0 20px rgba(0, 153, 204, 0.5)',
        'glass': '0 8px 32px rgba(31, 38, 135, 0.37)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        'typing': 'typing 0.7s steps(40, end)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 212, 255, 0.8)' },
        },
        typing: {
          from: { width: '0' },
          to: { width: '100%' },
        },
      },
    },
  },
  plugins: [],
};
