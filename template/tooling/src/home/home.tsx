import { Fractal, conse } from 'whatsup'
import { Color, Palette } from './home.const'
import Logo from '../assets/logo.svg'
import styles from './home.scss'

export class Home extends Fractal<JSX.Element> {
  readonly color = conse(Color.Black);

  *whatsUp() {
    while (true) {
      yield (
        <>
          <Header onMouseEnter={(color) => this.color.set(color)} />
          <Container>
            <h1 className={styles.title}>Welcome to WhatsUp!</h1>
            <h3 className={styles.subtitle}>it`s more than just state management</h3>
            <section className={styles.cards}>
              <Card
                title="Whatsup"
                message="Whatsup is a Front-end framework based on ideas of streams and fractals."
                url="https://github.com/whatsup/whatsup"
                color={yield* this.color}
              />
              <Card
                title="Routing"
                message="Routing stream for organizing routing in a WhatsUp application"
                color={yield* this.color}
                url="https://github.com/whatsup/route"
              />
              <Card
                title="Jsx"
                message="WhatsUp JSX Mutator and Renderer"
                color={yield* this.color}
                url="https://github.com/whatsup/jsx"
              />
            </section>
          </Container>
        </>
      )
    }
  }
}

function Container({ children }: JSX.IntrinsicAttributes) {
  return <section className={styles.container}>{children}</section>
}

interface HeaderProps extends JSX.IntrinsicAttributes {
  onMouseEnter: (color: Color) => void
}

function Header({ onMouseEnter }: HeaderProps) {
  return (
    <header className={styles.header}>
      <img src={Logo} alt="Logo" className={styles.logo} />
      <div className={styles.colorBtns}>
        {Palette.map((color) => (
          <ColorBtn key={color} color={color} onMouseEnter={() => onMouseEnter(color)} />
        ))}
      </div>
    </header>
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

interface CardProps {
  title: string
  message: string
  url: string
  color: Color
}

function Card({ title, message, url, color }: CardProps) {
  return (
    <div className={styles.card}>
      <h3 className={styles[color]}>{title}</h3>
      <p>{message}</p>
      <a className={`${styles[color]} ${styles.button}`} href={url} target="_blank" rel="noopener noreferrer">
        More details
      </a>
    </div>
  )
}
