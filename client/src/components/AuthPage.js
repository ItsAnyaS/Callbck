import { useState } from "react"
import CompanySignUp from './CompanySignUp'
import DancerSignUp from './DancerSignUp'
const AuthPage = () => {
    const [isCompany, setIsCompany] = useState(false)
    const [isDancer, setIsDancer] = useState(false)
    return (
        <main>
           {!isCompany && !isDancer && <section> 
            <button>Sign up as dancer</button>
            <button>Sign up as company</button>
            </section>}
            { isCompany && 
                <CompanySignUp/>
            }
            { isDancer && 
                <DancerSignUp/>
            }
        </main>
    )
}

export default AuthPage
