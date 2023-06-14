import { createStyles, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      height: '1020px',
      border: '1px solid black',
      flexDirection: 'row'
    },
    userProfileInfo: {
        flex: 1
    },
    fieldDetails: {
        flex: 4
    },
    reserveFieldContainer: {
        display: 'flex',
        marginTop: '20px'
    },
    calendar: {
        marginRight: '30px',
        marginLeft: '100px'
    },
    time: {
        backgroundColor: 'white',
        zIndex: 2,
        width: '100%',
        marginRight: '30px',
        marginLeft: '30px',
        borderRadius: 10,
        maxHeight: '420px',
        border: '1px solid black',
        maxWidth: '620px'
    },
    scrollViewCard: {
      overflow: 'auto', 
      maxHeight: '340px'
    },
    aboutFieldTitle: {
      textAlign: 'center',
      alignItems: 'center',
      fontWeight: 'bolder',
      fontSize: '28px',
      marginTop: '10px',
      padding: '5px'
    }
  })
)

export default useStyles