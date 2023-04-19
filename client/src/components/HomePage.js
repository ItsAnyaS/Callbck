import '../styles/Home.css'
import { useNavigate} from 'react-router-dom'
const Home = () => {
const navigate = useNavigate()
    return (
<main id='home'>
    <section id='hero'>
        <div id='hero-container'>
        <h1>The all-in-one place for
            everything auditions</h1>
        <button onClick={()=> {navigate('/signup')}}>Get Started</button>
        </div>
        <img src='./hero-img.png' id='hero-img' alt='Dancer doing a stag leap over the home secton'/>
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
                <p>Create a listing </p>
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
        <button  onClick={()=> {navigate('/company-signup')}} >Join the community</button>
        </section>
    </section>
    <section id="cta-section">
        <img src="transparent-icon.png" alt="" />
        <div className="cta-copy">
        <h2>Always Transparent</h2>
        <p>Never wonder how much you’re getting paid.  Every listing has compensation information.</p>
        <button onClick={()=> {navigate('/signup')}} >Join now</button>
        </div>
    </section>
</main>
    )
}

export default Home