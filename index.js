import Lib from './player/lib.js'

new Lib({
  target: '.my-player',
  delayPerSlide: 5,

  slides: [
     {
      url: 'img/chunk1.jpg',
      alt: 'slide1',

      filter: ['contrast(150%)', 'blur(5px)'],

      overlays: [
        {
          type: 'Text',
          text: 'Spiderman is the best!',

          classes: ['redbrush'],

          styles: {
            'font-size': '40px',

            top: '30%',
            left: '20%',
          },
        },

        {
          type: 'Poll',
          poll: 'Are you agree?',

          variants: ['Yeah!', 'No :('],

          styles: {
            top: '60%',
            left: '30%',
          },
        },
      ],
    },
    {
      url: 'img/chunk2.jpg',
      alt: 'slide2',

      overlays: [
        {
          type: 'Text',
          text: 'Do you like spiderman?',

          classes: ['redbrush'],

          styles: {
            'font-size': '40px',

            top: '50%',
            left: '10%',
          },
        },
      ],
    },
    {
      url: 'img/chunk3.jpg',
      alt: 'slide3',

      overlays: [
        {
          type: 'Text',
          text: 'M.J. is my love',

          classes: ['redbrush'],

          styles: {
            'font-size': '20px',

            top: '50%',
            left: '10%',
          },
        },
      ],
    },
    { url: 'img/chunk4.jpg', alt: 'slide4' },
    { url: 'img/chunk5.jpg', alt: 'slide5' },
    { url: 'img/chunk6.jpg', alt: 'slide6' },
  ],
})
