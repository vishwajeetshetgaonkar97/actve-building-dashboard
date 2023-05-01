import { withStyles, Divider } from '@material-ui/core';

const styledBy = (property, mapping) => props => mapping[props[property]];

export const CustomDivider = withStyles(theme => ({
  root: {
    background: styledBy('color', {
      default: 'transparent',
      main: '',
    }),
    backgroundColor: 'transparent',
  },
}))(Divider);

export const FormElementSeperator = withStyles(theme => ({
  root: {
    backgroundColor: 'transparent',
    height: '3vh',
  },
}))(Divider);
