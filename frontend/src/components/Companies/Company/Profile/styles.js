import { createStyles, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      maxWidth:' 600px',
      margin: 'auto',
      padding: '20px',
      color: 'red'
    },
    coverImage: {
      backgroundImage: 'url(path/to/cover-image.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '300px',
      borderWidth: '1px',
      borderColor: 'black'
    },
  })
)

export default useStyles

