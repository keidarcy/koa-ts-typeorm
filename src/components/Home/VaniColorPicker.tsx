import { Button, Popover } from '@shopify/polaris';
import React, { useCallback, useState } from 'react';
import ChromePicker from 'react-color/lib/components/chrome/Chrome';

interface VaniColorPickerProps {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}

export const VaniColorPicker: React.FC<VaniColorPickerProps> = ({ color, setColor }) => {
  const [popoverActive, setPopoverActive] = useState(true);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );

  const style = {
    width: '2rem',
    height: '2rem',
    backgroundColor: color,
    border: '1px solid #333',
    borderRadius: '5px'
  };

  const activator = <div onClick={togglePopoverActive} style={style} />;

  return (
    <>
      <Popover active={popoverActive} activator={activator} onClose={togglePopoverActive}>
        <ChromePicker color={color} onChangeComplete={({ hex }) => setColor(hex)} />
      </Popover>
    </>
  );
};
