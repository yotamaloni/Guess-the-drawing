import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from "@fortawesome/free-solid-svg-icons"
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"

export const AppFooter = () => {
    return (
        <section className="app-footer">
            <p className='info'>
                This project made by Yotam Aloni
            </p>
            <div className='icons-container'>
                <a className='clean-link' href='https://www.linkedin.com/in/yotam-aloni-6099b9234/' target="_blank" >
                    <FontAwesomeIcon className='linkedin' icon={faLinkedin} />
                </a>
                <a className='clean-link' href='https://yotamaloni.github.io/My-portfolio/' target="_blank">
                    <FontAwesomeIcon className='my-site' icon={faGlobe} />
                </a>
            </div>
        </section>
    )
}