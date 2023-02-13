import '../styles/Home.css'
import { useNavigate} from 'react-router-dom'
const Home = () => {
const navigate = useNavigate()
    return (
<main id='home'>
    <section id='hero'>
        <div id='hero-container'>
        <h1>Quick. Transparent. Convenient.</h1>
        <h3>Callbck is a listing website that's fast, free, and transparent—all while keeping you in the loop on the application process. You can apply for jobs directly from the site, so you don't have to worry about any paper work or waiting around.</h3>
        <button onClick={()=> {navigate('/signup')}}>Get Started</button>
        </div>
        <img src='./hero-img.png' id='hero-img' alt='Dancer doing a stag leap over the home secton'/>
    </section>
    <section id="cta-section">
        <h2>Never wonder how much you're getting paid.</h2>
        <p>Every listing must have an compensation rate and description outlining the job details.</p>
        <button onClick={()=> {navigate('/signup')}} >Sign Up</button>
    </section>
    <section id='company-cta-section'>
        <section className='company-cta-illustration'>
            <div className='company-cta-illustration-container'>
                <div>
                <ion-icon name="clipboard-outline"></ion-icon>
                <p>Sign Up</p>
                </div>
                <div className='company-cta-illustration-container-middle'>
                <ion-icon name="create-outline"></ion-icon>
                <p>Create a listing</p>
                </div>
                <div>
                <ion-icon name="checkbox-outline"></ion-icon>
                <p>Done</p>
                </div>
            </div>
        </section>
        <section className='company-cta-copy'>
        <h1>Ready.  Set.  List.</h1>
        <p>Creating a listing is as easy as 1. Sign Up 2. Fill out brief listing form, 3. done.  Our streamlined process allows you to create a listing in as little as three clicks.</p>
        <button>Join the community</button>
        </section>
    </section>

</main>
    )
}

export default Home