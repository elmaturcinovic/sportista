import { createStyles, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      height: '100%',
      flexDirection: 'row',
    },
    userProfileInfo: {
        flex: 1
    },
    fieldDetails: {
        flex: 4
    },
    reserveFieldContainer: {
        display: 'flex',
        marginTop: '20px',
        width: '100%'
    },
    calendar: {
        textAlign: 'center',
        marginRight: '20px',
        marginLeft: '30px'
    },
    timeWrapper:{
      textAlign: 'center',
      marginRight: '20px',
      marginLeft: '30px',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 2,
      width: '100%',
      height: '430px'
    },
    time: {
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 10,
        maxHeight: '430px',
        color: '#303030'
    },
    scrollViewCard: {
      overflow: 'auto', 
      maxHeight: '430px',
      color: '#303030',
      borderRadius: '15px'

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