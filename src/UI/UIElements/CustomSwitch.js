import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';

export const AntSwitch = withStyles(theme => ({
  root: {
    width: 34,
    height: 18,
    padding: 0,
    display: 'flex',
    marginRight: 10,
    marginLeft: 10,
    [theme.breakpoints.down('md')]: {
      height: 18,
      width: 32,
    },
  },
  switchBase: {
    padding: 3,
    [theme.breakpoints.down('md')]: {
      padding: '3px !important',
    },
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(15px)',
      [theme.breakpoints.down('md')]: {
        transform: 'translateX(14px) !important',
      },
      color: '#fff',
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary,
        borderColor: theme.palette.primary,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
    backgroundColor: '#fff',
    [theme.breakpoints.down('md')]: {
      height: '12px !important',
      width: '12px !important',
    },
  },
  track: {
    border: `1px solid ${theme.palette.primary}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: '#ffffff3f',
  },
  checked: {},
}))(Switch);

export default null;
