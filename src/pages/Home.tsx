import About from '../components/About'
import Contact from '../components/Contact'
import Hero from '../components/Hero'
import Products from '../components/Products'
import Projects from '../components/Projects'
import Rail from '../components/Rail'
import Services from '../components/Services'
import Shell from '../components/Shell'
import Stack from '../components/Stack'

export default function Home() {
  return (
    <Shell>
      <Hero />
      <Stack />
      <Products />
      <Services />
      <Projects />
      <About />
      <Contact />
      <Rail />
    </Shell>
  )
}
