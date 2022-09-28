import { useNavigate } from "react-router-dom"
import '../styles/AuthPage.css'
const AuthPage = () => {
    const navigate = useNavigate()
    return (
        <main id="select-signup">
            <section> 
            <button className="hover" onClick={()=> {navigate('/dancer/signup')}}>Sign up as dancer</button>
            <button className="hover" onClick={()=> {navigate('/company/signup')}}>Sign up as company</button>
            </section>
           
        </main>
    )
}

export default AuthPage
