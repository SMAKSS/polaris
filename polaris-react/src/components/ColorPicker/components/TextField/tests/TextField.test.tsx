import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {TextField as PolarisTextField} from '../../../../TextField';
import {TextField} from '../TextField';
import styles from '../TextField.scss';

const BLUE = {
  hsl: {
    hue: 240,
    brightness: 1,
    saturation: 1,
  },
  hex: '0000FF',
};

const RED = {
  hsl: {
    hue: 0,
    brightness: 1,
    saturation: 1,
  },
  hex: 'FF0000',
};

describe('<TextField />', () => {
  it('shows the hex color and `#` as prefix inside the input field', () => {
    const textField = mountWithApp(
      <TextField color={BLUE.hsl} onChange={noop} />,
    );
    expect(textField).toContainReactComponent(PolarisTextField, {
      value: BLUE.hex,
      prefix: '#',
      placeholder: BLUE.hex,
    });
  });

  describe('styles/classes', () => {
    it('does not apply fullWidth styles based on props', () => {
      const textField = mountWithApp(
        <TextField color={BLUE.hsl} onChange={noop} />,
      );
      expect(textField.find('div')?.props.className).not.toMatch(
        styles.fullWidth,
      );
    });

    it('applies fullWidth styles based on props', () => {
      const textField = mountWithApp(
        <TextField color={RED.hsl} onChange={noop} fullWidth />,
      );
      expect(textField.find('div')?.props.className).toMatch('fullWidth');
    });
  });
});

function noop() {}
