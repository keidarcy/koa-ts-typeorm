import {
  Card,
  Checkbox,
  FormLayout,
  Layout,
  List,
  Page,
  Stack,
  TextField
} from '@shopify/polaris';
import React, { useCallback, useState } from 'react';
import { ChromePicker } from 'react-color';
import { VaniColorPicker } from '../components/Home/VaniColorPicker';

const Customize: React.FC = () => {
  const [checked, setChecked] = useState(false);
  const [color, setColor] = useState('#67c61e');
  const handleChange = useCallback((newChecked) => setChecked(newChecked), []);
  const [textFieldValue, setTextFieldValue] = useState('1');

  const handleTextFieldChange = useCallback((value) => setTextFieldValue(value), []);
  const checkboxes = [
    { title: 'Show Variants information', isOn: true },
    { title: 'Show Price information', isOn: true },
    { title: 'Crop Product images', isOn: true },
    { title: 'Enable Slideshow animation', isOn: true },
    { title: 'Enable Zoom effect', isOn: true },
    { title: 'Show Variants information', isOn: true },
    { title: 'Show Variants information', isOn: true }
  ];

  const colors = [
    { title: 'Add to Cart button color', color },
    { title: 'Recommendation Title color', color },
    { title: 'Product Name / Price color', color }
  ];

  return (
    <>
      <Layout.Section oneHalf>
        <Card title="Staff accounts">
          <Card.Section>
            <FormLayout>
              <TextField type="email" label="Add to Cart text" onChange={() => {}} />
              {colors.map((color) => (
                <Stack>
                  <Stack.Item fill>{color.title}</Stack.Item>
                  <VaniColorPicker color={color.color} setColor={setColor} />
                </Stack>
              ))}
              {checkboxes.map((check) => (
                <Stack>
                  <Stack.Item fill>{check.title}</Stack.Item>
                  <Checkbox
                    label="Basic checkbox"
                    checked={check.isOn}
                    onChange={handleChange}
                  />
                </Stack>
              ))}
            </FormLayout>
          </Card.Section>
        </Card>
      </Layout.Section>
      <Layout.Section oneHalf>
        <Card title="Staff accounts">
          <Card.Section>
            <List>
              <List.Item>Felix Crafford</List.Item>
              <List.Item>Ezequiel Manno</List.Item>
            </List>
          </Card.Section>
        </Card>
      </Layout.Section>
    </>
  );
};

export default Customize;
