import { createStyles, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      position: 'center',
      margin: '0 auto',
      borderWidth: 5,
      borderColor: 'black',
      border: 'solid',
      height: '1000px',
      width: '80%',
      backgroundColor: 'white'
    },
    mainWrapper: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      margin: '10px',
      borderWidth: 5,
      borderColor: 'red',
      border: 'solid',
    },
    navBar: {
      display: 'flex',
      flex: 1,
      margin: '10px',
      borderWidth: 2,
      borderColor: 'red',
      border: 'solid',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#61dafb'
    },
    coverPhotoContainer: {
      display: 'flex',
      margin: '10px',
      borderWidth: 2,
      borderColor: 'red',
      border: 'solid',
      height: '230px',
      borderRadius: '15px'
    },
    coverImage: {
      width:'100%',
      borderRadius: '15px'
    },
    content: {
      display: 'flex',
      flex: 11,
      margin: '10px',
      borderWidth: 2,
      borderColor: 'red',
      border: 'solid',
    },
    contact: {
      display: 'flex',
      flex: 1,
      margin: '10px',
      borderWidth: 2,
      borderColor: 'red',
      border: 'solid',
    },
    fields: {
      display: 'flex',
      flex: 4,
      margin: '10px',
      borderWidth: 2,
      borderColor: 'red',
      border: 'solid',
    },

  })
)

export default useStyles