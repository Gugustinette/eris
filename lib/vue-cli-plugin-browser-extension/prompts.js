module.exports = [
  {
    name: 'components',
    type: 'checkbox',
    default: ['popup', 'background'],
    message: 'Which browser extension components do you wish to generate?',
    choices: [
      {
        name: 'Background script',
        value: 'background',
        short: 'background',
        checked: true
      },
      {
        name: 'Browser Action Popup',
        value: 'popup',
        short: 'popup',
        checked: true
      },
      {
        name: 'Options Page',
        value: 'options',
        short: 'options'
      },
      {
        name: 'Content Scripts',
        value: 'contentScripts',
        short: 'content scripts'
      },
      {
        name: 'Override Page',
        value: 'override',
        short: 'override'
      },
      {
        name: 'Standalone Tab',
        value: 'standalone',
        short: 'standalone'
      },
      {
        name: 'Dev Tools Tab',
        value: 'devtools',
        short: 'dev tools'
      }
    ],
    filter: async (input) => {
      const componentMap = {}

      input.forEach((component) => {
        componentMap[component] = true
      })

      return componentMap
    }
  },
  {
    name: 'generateSigningKey',
    type: 'confirm',
    message: 'Generate a new signing key (danger)?',
    default: false
  }
]
