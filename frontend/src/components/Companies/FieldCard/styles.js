import { createStyles, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() =>
  createStyles({
    myCard: {
        margin: '10px',
        padding: '10px',
        border: '1px solid black',
        borderRadius: '8px',
        height: '300px'
    },
    icon: {
        marginRight: '5px'
    },
    fieldImage: {
        width: '260px',
        height: '100px',
        justifyContent: 'center',
        alignItems: 'center',
    }

  })
)

export default useStyles