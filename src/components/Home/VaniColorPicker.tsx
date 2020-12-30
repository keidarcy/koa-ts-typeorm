import { Popover } from '@shopify/polaris';
import React, { useCallback, useContext, useState } from 'react';
import ChromePicker from 'react-color/lib/components/chrome/Chrome';
import { VaniContext } from '../../utils/contexts/VCScontext';
import { VaniActionEnum } from '../../utils/type.helper';

interface VaniColorPickerProps {
  color: string;
  field: string;
}

export const VaniColorPicker: React.FC<VaniColorPickerProps> = ({ color, field }) => {
  const [popoverActive, setPopoverActive] = useState(false);
  const { dispatch } = useContext(VaniContext);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );

  const colorStyle = {
    width: '2rem',
    height: '2rem',
    backgroundColor: color,
    border: '1px solid #333',
    borderRadius: '5px'
  };

  const activator = <div onClick={togglePopoverActive} style={colorStyle} />;

  return (
    <>
      <Popover active={popoverActive} activator={activator} onClose={togglePopoverActive}>
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
