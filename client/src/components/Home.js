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
        <img src='./hero-img.png' id='hero-img' alt='Dancer doing a stag leap over the home secton'/>
    </section>
    <section id="cta-section">
        <h2>Never wonder how much you're getting paid.</h2>
        <p>Every listing must have an compensation rate and description outlining the job details.</p>
        <button>Get started</button>
    </section>
    <section id='company-cta-section'>
        <h1>Ready.  Set.  List.</h1>
        <p>Creating a listing is as easy as 1. Sign Up 2. Fill out brief listing form, 3. done.  Our streamlined process allows you to create a listing in as little as three clicks.</p>
        <button>Join the community</button>
    </section>

</main>
    )
}

export default Home