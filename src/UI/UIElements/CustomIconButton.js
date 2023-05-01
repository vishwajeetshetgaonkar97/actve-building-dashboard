import { Button, withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { color } from '../color/colorConfig';

export const CustomIconButton = withStyles(theme => ({
  root: {
    color: '#fff',
    // backgroundColor: color.black.main_color,
    // marginTop: 10,
    // marginLeft: 10,
    marginRight: 10,
    width: '1vw',
    height: '1vw',
    '&:hover': {
      backgroundColor: color.black.hover_color,
    },
    '&$disabled': {
      color: 'grey',
      backgroundColor: '#2e2e2e',
    },
  },
  disabled: {},
}))(IconButton);

export default null;
