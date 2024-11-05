import './Header.css'
import SlideoutMenu from './SlideoutMenu'
import InlineMenu from './InlineMenu'

function Header ({setShowAppH,setShowMymap}) {
    return (
        <header>
            <h1>YOROKOBI</h1>
            <InlineMenu setShowAppH={setShowAppH} setShowMymap={setShowMymap} />
            <SlideoutMenu />
        </header>
    )
}

export default Header