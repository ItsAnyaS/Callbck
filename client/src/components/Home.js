import '../styles/Home.css'
import { useNavigate} from 'react-router-dom'
const Home = () => {
const navigate = useNavigate()
    return (
<main id='home'>
    <section id='hero'>
        <div id='hero-container'>
        <h1>Quick, transparent, convientent.</h1>
        <h3>This is a short sentence about why you should make an account</h3>
        <button onClick={()=> {navigate('/signup')}}>Get Started</button>
        </div>
        <img src='./hero-img.png' id='hero-img' alt='hero image text'/>
    </section>
    <section id="cta-section">
        This is going to have some kind of cta info
    </section>

</main>
    )
}

export default Home