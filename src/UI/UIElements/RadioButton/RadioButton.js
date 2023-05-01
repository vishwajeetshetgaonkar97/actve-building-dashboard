import React from 'react';
import styles from './styles.module.css';
import { color } from '../../color/colorConfig';

const RadioButton = ({ control }) => {
  return (
    <>
      <div
        style={
          control
            ? { borderColor: color.blue.main_color }
            : { borderColor: 'white' }
        }
        className={styles.radioOuterContainer}
      >
        {control && (
          <div
            style={{
              borderColor: color.blue.main_color,
              color: color.blue.main_color,
              background: color.blue.main_color,
            }}
            className={styles.radioActiveIndicator}
          />
        )}
      </div>
    </>
  );
};

export default RadioButton;
