import { useNavigate } from "react-router-dom"
const AuthPage = () => {
    const navigate = useNavigate()
    return (
        <main>
            <section> 
            <button onClick={()=> {navigate('/dancer/signup')}}>Sign up as dancer</button>
            <button onClick={()=> {navigate('/company/signup')}}>Sign up as company</button>
            </section>
           
        </main>
    )
}

export default AuthPage
