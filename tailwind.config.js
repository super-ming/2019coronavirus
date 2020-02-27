module.exports = {
  theme: {
    maxHeight: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
    },
    extend: {},
  },
  variants: {},
  plugins: [
    require('tailwindcss-animatecss')({
    settings: {
      animatedSpeed: 500,
      heartBeatSpeed: 1000,
      hingeSpeed: 2000,
      bounceInSpeed: 750,
      bounceOutSpeed: 750,
      animationDelaySpeed: 1000
    },
    variants: ['responsive'],
  })],
}
