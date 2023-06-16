import React from 'react'
import useStyles from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faDollarSign, faEnvelope, faPhone , faHome} from '@fortawesome/free-solid-svg-icons';


const AboutField = ({ item }) => {
    const classes = useStyles()

    const { name, photo, address, price, email, phone } = item;

  return (
    <div className={classes.container}>
        <div className={classes.aboutFieldTitleContainer}>
            <div className={classes.aboutFieldTitle}>
                {name}
            </div>
            
        </div>
        <div className={classes.aboutFieldContentContainer}>
            <div className={classes.aboutFieldImageContainer}>
               <div className={classes.aboutFieldImageContainerSize} style={{margin : '0px',width: '100%', height: '100%'}}> 
                    <img src={`http://localhost:8000${photo}`} alt="cover" className={classes.aboutFieldImage}  style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
               </div>
            </div>
            <div className={classes.aboutFieldTextContainer}>
                <div className={classes.aboutFieldIcon}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    <span className={classes.insideText}>{name}</span>
                </div>
                <div>
                    <FontAwesomeIcon icon={faHome} />
                    <span className={classes.insideText}>{address}</span>
                </div>
                <div>
                    <FontAwesomeIcon icon={faDollarSign} />
                    <span className={classes.insideText}>{price}</span>
                </div>
                <div>
                    <FontAwesomeIcon icon={faEnvelope} />
                    <span className={classes.insideText}>{email}</span>
                </div>
                <div>
                    <FontAwesomeIcon icon={faPhone} />
                    <span className={classes.insideText}>{phone}</span>
                </div>
            </div>
        </div>
        
    </div>

  )
}

export default AboutField