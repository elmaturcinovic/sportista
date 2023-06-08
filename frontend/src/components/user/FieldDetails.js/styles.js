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
    },
    calendar: {
        marginRight: '10%'
    },
    time: {
        backgroundColor: '#3DD47A',
        zIndex: 2,
        marginLeft: '10%',
        marginRight: '10%',
        width: '100%',
        borderRadius: 10
    }
  })
)

export default useStyles