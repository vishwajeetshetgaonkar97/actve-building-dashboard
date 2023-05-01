import {
  withStyles,
  DialogTitle,
  DialogActions,
  DialogContent,
  Typography,
} from '@material-ui/core';
import { color } from '../color/colorConfig';

export const CustomTitle = withStyles({
  root: {
    backgroundColor: color.dialogHeading,
    fontSize: '1rem',
    padding: '9px 15px',
    fontFamily: 'GothamMedium !important',
  },
})(Typography);

export const CustomDialogContent = withStyles({
  root: {
    // paddingTop: '3.2vh',
  },
})(DialogContent);

export const CustomDialogActions = withStyles({
  root: {
    paddingBottom: '2.6vh',
    paddingRight: '1.8vw',
    paddingLeft: '1.8vw',
  },
})(DialogActions);
export default null;
