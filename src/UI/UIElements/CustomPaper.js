import { withStyles, Paper } from '@material-ui/core';

const styledBy = (property, mapping) => props => mapping[props[property]];

const CustomPaper = withStyles(theme => ({
  root: {
    background: styledBy('color', {
      // default: '#000000',
      main: '',
    }),
    // color: '#fff',
  },
}))(Paper);

export default CustomPaper;
