import { createStyles, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '350px',
      margin: 10
    },
    aboutFieldTitleContainer: {
        display: 'flex',
        flex: 1,
        textAlign: 'center',
        alignItems: 'center',
        fontSize: '56px',
        color: '#303030'
        
    },
    aboutFieldTitle:{
        margin: 15
    },
    aboutFieldContentContainer: {
        display: 'flex',
        flex: 7,
        height: '350px'
    },
    aboutFieldImageContainer: {
        display: 'flex',
        margin: 20,
        borderRadius: 20,
        background: 'white',
        width: '450px'
    },
    aboutFieldImageContainerSize: {
        marginLeft: '170px'
    },
    aboutFieldTextContainer: {
        backgroundColor: 'white',
        display: 'flex',
        flex: 1,
        margin: '20px',
        padding:'40px',
        flexDirection: 'column',
        fontSize: 30,
        alignItems: 'center',
        gap: 12,
        borderRadius: 15,
        color: '#303030'
  
    },
    aboutFieldImage: {
        width: '450px',
        height: '100%',
        borderRadius: 20
    },
    aboutFieldText: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        flexDirection: 'column',
    },
    aboutFieldTextNames: {
        fontWeight: 'bold',
        fontSize: 30,
        fontFamily: 'Arial',
        margin: 5,
    },
    aboutFieldIcon: {
        textAlign: 'left',
        display: 'flex',
        alignItems: 'center',
        height: '20px'
    },
    insideText: {
        fontSize: '20px'
    },
    insideTextTitle: {
        fontSize: '25px',
        fontWeight: 600,
        marginBottom: '30px',
    }
  })
)

export default useStyles