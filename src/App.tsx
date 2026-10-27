import Header from './components/Header'
import Hero from './components/Hero'
import Products from './components/Products'
import { About, Contact, Footer, Marquee, Projects, Services } from './components/Sections'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Products />
        <Services />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
