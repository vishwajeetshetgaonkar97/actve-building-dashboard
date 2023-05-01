import { withStyles, Switch } from '@material-ui/core';
import { color } from '../color/colorConfig';

const styledBy = (property, mapping) => props => mapping[props[property]];

export const CustomToggleSwitch = withStyles(theme => ({
  switchTrack: {
    backgroundColor: 'white',
  },
  switchBase: {
    color: 'white',
    '&.Mui-checked': {
      color: styledBy('color', {
        blue: color.blue.main_color,
        red: color.red.main_color,
        green: color.green.main_color,
        white: color.white.main_color,
      }),
    },
    '&.Mui-checked + .MuiSwitch-track': {
      backgroundColor: styledBy('color', {
        blue: color.blue.hover_color,
        red: color.red.hover_color,
        green: color.green.hover_color,
        white: color.white.hover_color,
      }),
    },
    '&.Mui-disabled': {
      color: 'grey',
    },
  },
}))(Switch);

export default null;
