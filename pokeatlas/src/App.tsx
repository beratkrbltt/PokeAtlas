import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import Loading from './components/Loading'
import PokeList from './components/PokeList'

function App() {

  return (
    <div>
      <Header />
      <div className="main-container">
        <Hero />
        <Loading />
        <PokeList />
      </div>
      <Footer />
    </div>

  )
}

export default App
