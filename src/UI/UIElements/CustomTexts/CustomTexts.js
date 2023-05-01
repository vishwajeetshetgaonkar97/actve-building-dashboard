import { withStyles, Typography } from '@material-ui/core';

export const FormInputTitle = withStyles(theme => ({
  root: {
    opacity: 0.7,
  },
}))(Typography);

export const FormSectionTitle = withStyles(theme => ({
  root: {
    fontStyle: 'italic',
    fontFamily: 'GothamMedium',
  },
}))(Typography);
