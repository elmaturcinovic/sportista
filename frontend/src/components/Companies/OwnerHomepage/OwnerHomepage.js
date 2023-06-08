import React from 'react'
import useStyles from './styles'
import TableComponent from './TableComponent/TableComponent'

function OwnerHomepage() {
    const classes = useStyles()
  return (
    <div className={classes.container}>
        <div className={classes.coverImageContainer}>
            <img src="./teren2.jpg" alt="cover" className={classes.coverImage} />
        </div>
        <div className={classes.allFieldsEdit}>
            <TableComponent/>
        </div>
    </div>
  )
}

export default OwnerHomepage