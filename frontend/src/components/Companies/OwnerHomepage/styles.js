import { createStyles, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      height: '1020px',
      border: '1px solid black',
      flexDirection: 'column'
    },
    coverImageContainer: {
        display: 'flex',
        flex: 1
    },
    coverImage: {

    },
    allFieldsEdit: {
        display: 'flex',
        flex: 6
    }
  })
)

export default useStyles