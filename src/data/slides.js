export const slidesData = [
  {
    id: 0,
    type: 'intro',
    title: 'Welcome to the Learning Adventure!',
    content: `
      <p>Get ready to explore fascinating concepts through this interactive slideshow.</p>
      <p>Let's begin your journey!</p>
    `,
    answers: [
      { text: 'Let\'s go!', correct: true, next: 1 }
    ]
  },
  {
    id: 1,
    type: 'question',
    title: 'What makes learning effective?',
    content: `
      <p>Learning is most effective when it's interactive and engaging.</p>
      <p>Which of the following helps with retention?</p>
    `,
    answers: [
      { text: 'Passive reading only', correct: false, next: 2 },
      { text: 'Active participation', correct: true, next: 2 },
      { text: 'Memorization alone', correct: false, next: 2 }
    ]
  },
  {
    id: 2,
    type: 'info',
    title: 'Great Choice!',
    content: `
      <p>Exactly! Active participation helps you remember and understand better.</p>
      <p>When you engage with material - answer questions, solve problems, or discuss concepts - you create stronger memory connections.</p>
    `,
    answers: [
      { text: 'Tell me more', correct: true, next: 3 }
    ],
    image: '/man.png'
  },
  {
    id: 3,
    type: 'question',
    title: 'Memory and Learning',
    content: `
      <p>Your brain forms stronger memories when you:</p>
    `,
    answers: [
      { text: 'Connect new info to what you know', correct: true, next: 4 },
      { text: 'Learn everything in isolation', correct: false, next: 4 },
      { text: 'Rush through material quickly', correct: false, next: 4 }
    ]
  },
  {
    id: 4,
    type: 'conclusion',
    title: 'Congratulations!',
    content: `
      <p>You've completed this educational slideshow!</p>
      <p>Remember: effective learning involves active participation, making connections, and taking your time to understand concepts deeply.</p>
      <p>Keep exploring and learning!</p>
    `,
    answers: [
      { text: 'Start over', correct: true, next: 0 }
    ]
  }
]
