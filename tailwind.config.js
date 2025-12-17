/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Fondos
        targetFondo: '#eedfc0',
        target: '#f8f7e3',
        fondoFallback: '#4a7c3f',
        
        // Botones
        button: '#46a330',
        buttonDegradado: '#7bc224',
        
        // Textos
        textTitle: '#f3d645',
        textBorde: '#1d420f',
        textContenido: '#513015',
        textWhite: '#e9f5e6',
        
        // Avatares
        avatarGray: '#9ca3af',
        avatarGrayBorder: '#6b7280',
        avatarGreen: '#46a330',
        avatarBrown: '#a67c52',
        
        // Barra de progreso
        progressStart: '#2a774d',
        progressMid: '#4d944e',
        progressEnd: '#98c371',
        progressBg: '#d4bc98',
        
        // Color tipos de reciclaje
        tipoPapel: '#3299e3',
        tipoPlastico: '#4dc269',
        tipoMetal: '#929aa0',
        tipoOrganico: '#d27c2f',
        tipoVidrio: '#64cde2',
        tipoOtros: '#9471e5',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      spacing: {
        '15': '60px',
        '18': '72px',
        '88': '352px',
      },
    },
  },
  plugins: [],
}
