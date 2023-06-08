import React from 'react'
import useStyles from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faDollarSign, faEnvelope, faPhone , faHome} from '@fortawesome/free-solid-svg-icons';


const AboutField = () => {
    const classes = useStyles()

  return (
    <div className={classes.container}>
        <div className={classes.aboutFieldTitleContainer}>
            <div className={classes.aboutFieldTitle}>
                O terenu
            </div>
            
        </div>
        <div className={classes.aboutFieldContentContainer}>
            <div className={classes.aboutFieldImageContainer}>
               <div> 
                    <img src="./teren2.jpg" alt="cover" className={classes.aboutFieldImage} />
               </div>
            </div>
            <div className={classes.aboutFieldTextContainer}>
                <div className={classes.aboutFieldIcon}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    <span className={classes.insideText}>Vistafon</span>
                </div>
                <div>
                    <FontAwesomeIcon icon={faHome} />
                    <span className={classes.insideText}>Salke Lagumdzije 14</span>
                </div>
                <div>
                    <FontAwesomeIcon icon={faDollarSign} />
                    <span className={classes.insideText}>100 KM</span>
                </div>
                <div>
                    <FontAwesomeIcon icon={faEnvelope} />
                    <span className={classes.insideText}>vistafon@gmail.com</span>
                </div>
                <div>
                    <FontAwesomeIcon icon={faPhone} />
                    <span className={classes.insideText}>033 632 113</span>
                </div>
            </div>
        </div>
        
    </div>

  )
}

export default AboutField