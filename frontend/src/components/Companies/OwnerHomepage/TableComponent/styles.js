
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    table: {
      width: '1200px',
      borderCollapse: 'collapse',
      backgroundColor: '#f2f2f2',
    },
    tableHeader: {
      backgroundColor: '#808080',
      color: 'white',
    },
    tableCell: {
      padding: '10px',
      borderBottom: '1px solid #ddd',
    },
    tableImage: {
      width: '50px',
      height: '50px',
      objectFit: 'cover',
      borderRadius: '50%',
    },
    buttonIcon: {
      cursor: 'pointer',
      backgroundColor: 'red',
    },
    addButton: {
      color: 'white',
      padding: '8px',
      border: 'none',
      borderRadius: '10px',
    },
    greenButton: {
      backgroundColor: 'green',
      color: 'white'
    }
  }));

  export default useStyles