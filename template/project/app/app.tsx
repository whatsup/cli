import styles from './app.scss'
import { Fractal, conse } from 'whatsup'
import Logo from '../assets/logo.svg'
import { Color, Palette } from './app.const'

export class App extends Fractal<JSX.Element> {
  readonly color = conse(Color.Black);

  *whatsUp() {
    while (true) {
      yield (
        <Container>
          <Header />
          <Description color={yield* this.color} />
          <ColorBtns>
            {Palette.map((color) => (
              <ColorBtn key={color} color={color} onMouseEnter={() => this.color.set(color)} />
            ))}
          </ColorBtns>
        </Container>
      )
    }
  }
}

function Container({ children }: JSX.IntrinsicAttributes) {
  return <section className={styles.container}>{children}</section>
}

function Header() {
  return <img src={Logo} alt="Logo" className={styles.logo} />
}

function ColorBtns({ children }: JSX.IntrinsicAttributes) {
  return <div className={styles.colorBtns}>{children}</div>
}

interface ButtonProps extends JSX.IntrinsicAttributes {
  color: Color
}

function Description({ color }: ButtonProps) {
  return (
    <div className={styles.description}>
      <h1>Project generated with Whatsup CLI</h1>
      <a
        className={`${styles.button} ${styles[color]}`}
        href="https://github.com/whatsup/whatsup"
        target="_blank"
        rel="noopener noreferrer"
      >
        Click for more details
      </a>
    </div>
  )
}

interface ColorBtnProps extends JSX.IntrinsicAttributes {
  color: Color
  onMouseEnter: () => void
}

function ColorBtn({ color, onMouseEnter, children }: ColorBtnProps) {
  return (
    <div className={`${styles.colorBtn} ${styles[color]}`} onMouseEnter={onMouseEnter}>
      {children}
    </div>
  )
}

export default App
