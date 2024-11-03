import './AppH.css'
import Header from './Header'
import Hero from './Hero'
import Blocks from './Blocks'
import Description from './Description'
import Quote from './Quote'
import Footer from './Footer'

function AppH({setShowAppH,setShowMymap}) {
  return (
    <div>
      <Header setShowAppH={setShowAppH} setShowMymap={setShowMymap}/>
      <main>
        <Hero />
        <Description />
        <Blocks />
        <Quote />
      </main>
      <Footer />
    </div>
  );
}

export default AppH;
