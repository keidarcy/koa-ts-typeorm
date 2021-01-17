import { Popover } from '@shopify/polaris';
import React, { useContext, useCallback } from 'react';
import { ChromePicker } from 'react-color';
import { VaniContext } from '../../utils/contexts/VCScontext';
import { VaniActionEnum } from '../../utils/type.helper';

interface VaniColorPickerProps {
  color: string;
  field: string;
}

export const VaniColorPicker: React.FC<VaniColorPickerProps> = ({ color, field }) => {
  const { state, dispatch } = useContext(VaniContext);

  const colorStyle = {
    width: '2rem',
    height: '2rem',
    backgroundColor: color,
    border: '1px solid #333',
    borderRadius: '5px'
  };

  const togglePopoverActive = useCallback(() => {
    dispatch({
      type: VaniActionEnum.CHANGE_ROOT_VALUE,
      field: `${field}Open`,
      value: !state[`${field}Open`]
    });
  }, [state]);

  const activator = <div onClick={togglePopoverActive} style={colorStyle} />;

  return (
    <>
      <Popover
        active={state[`${field}Open`]}
        activator={activator}
        onClose={togglePopoverActive}
      >
        <ChromePicker
          color={color}
          onChangeComplete={({ hex }) =>
            dispatch({ type: VaniActionEnum.CHANGE_CUSTOMIZE_VALUE, field, value: hex })
          }
        />
      </Popover>
    </>
  );
};
