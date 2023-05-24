import React from 'react';
import useStyles from './styles'
import FieldCard from '../FieldCard/FieldCard';

const CompanyProfile = () => {
const classes = useStyles()

  return (
    <div className={classes.container}>
        <div className={classes.mainWrapper}>
            <div className={classes.navBar}>
               navBar 
            </div>
            <div className={classes.coverPhotoContainer}>
            <img src="./teren2.jpg" alt="cover" className={classes.coverImage} />
            </div>
            <div className={classes.content}>
                <div className={classes.fields}>
                   <FieldCard/>
                   <FieldCard/>
                   <FieldCard/>
                   <FieldCard/>
                </div>
            </div>
        </div>
    </div>
  );
};

export default CompanyProfile;