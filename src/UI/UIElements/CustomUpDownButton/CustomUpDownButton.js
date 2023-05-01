import React from 'react';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { color } from '../../color/colorConfig';

const CustomUpDownButton = ({ no = 3, updateFoulsScore, type = 's' }) => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <ExpandLessIcon
          style={{
            color: color.green.main_color,
            cursor: 'pointer',
          }}
          onClick={() => updateFoulsScore(type, '+')}
        />
        <span
          style={{
            fontFamily: 'gotham',
            fontSize: '3vh',
            fontWeight: '600',
          }}
        >
          {no}
        </span>
        <ExpandMoreIcon
          style={{ color: color.red.main_color, cursor: 'pointer' }}
          onClick={() => updateFoulsScore(type, '-')}
        />
      </div>
    </>
  );
};

export default CustomUpDownButton;
