import { fractal } from 'whatsup'
import { render } from '@whatsup/jsx'
import { route } from '@whatsup/route'

import { Home } from './home'

const App = fractal(function* () {
  const home = route('/$', new Home())

  while (true) {
    yield <>{yield* home}</>
  }
})

render(App)
