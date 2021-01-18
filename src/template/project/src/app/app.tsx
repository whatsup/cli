import styles from './app.scss'
import { Fractal, conse } from 'whatsup'
import { Color, Palette } from './app.const'

export class App extends Fractal<JSX.Element> {
  readonly color = conse(Color.Cyan);

  *whatsUp() {
    while (true) {
      yield (
        <Container color={yield* this.color}>
          <Title>Welcome to Whats Up</Title>
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

interface ContainerProps extends JSX.IntrinsicAttributes {
  color: Color
}

function Container({ color, children }: ContainerProps) {
  return <section className={`${styles.container} ${styles[color]}`}>{children}</section>
}

function Title({ children }: JSX.IntrinsicAttributes) {
  return <h1 className={styles.title}>{children}</h1>
}

function ColorBtns({ children }: JSX.IntrinsicAttributes) {
  return <div className={styles.colorBtns}>{children}</div>
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
