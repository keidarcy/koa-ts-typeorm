import { Card, Checkbox, FormLayout, Layout, Stack, TextField } from '@shopify/polaris';
import React, { useCallback, useContext } from 'react';
import { VaniColorPicker } from './/VaniColorPicker';
import { VaniContext } from '../../utils/contexts/VCScontext';
import { VaniActionEnum } from '../../utils/type.helper';

export const CustomizeForm = () => {
  const { state, dispatch } = useContext(VaniContext);

  const checkboxes = [
    { title: 'Show Add to Cart', isOn: state.customize?.showCart, field: 'showCart' },
    {
      title: 'Show Variants information',
      isOn: state.customize?.showVariant,
      field: 'showVariant'
    },
    {
      title: 'Show Price information',
      isOn: state.customize?.showPrice,
      field: 'showPrice'
    },
    {
      title: 'Crop Product images',
      isOn: state.customize?.cropImage,
      field: 'cropImage'
    },
    {
      title: 'Enable Slideshow animation',
      isOn: state.customize?.enableSlideshow,
      field: 'enableSlideshow'
    }
  ];

  const colors = [
    {
      title: 'Add to Cart button color',
      color: state.customize?.cartColor,
      field: 'cartColor'
    },
    {
      title: 'Recommendation Title color',
      color: state.customize?.titleColor,
      field: 'titleColor'
    },
    {
      title: 'Product Name / Price color',
      color: state.customize?.productNameColor,
      field: 'productNameColor'
    }
  ];

  const cart = {
    title: 'Cart',
    field: 'cartText',
    default: 'ADD TO CART'
  };

  const handleChange = useCallback(
    (value) =>
      dispatch({
        type: VaniActionEnum.CHANGE_CUSTOMIZE_VALUE,
        field: cart.field,
        value
      }),
    []
  );

  return (
    <Layout.Section oneHalf>
      <Card title="Customize Your Product Card">
        <Card.Section>
          <FormLayout>
            <Stack>
              <Stack.Item fill>{cart.title}</Stack.Item>
              <TextField
                label={''}
                labelHidden
                value={state.customize?.cartText}
                onChange={handleChange}
                placeholder={cart.default}
                align="right"
              />
            </Stack>
            {colors.map((color) => (
              <Stack key={color.color}>
                <Stack.Item fill>{color.title}</Stack.Item>
                <VaniColorPicker color={color.color} field={color.field} />
              </Stack>
            ))}
            {checkboxes.map((check) => (
              <Stack key={check.title}>
                <Stack.Item fill>{check.title}</Stack.Item>
                <Checkbox
                  label="Basic checkbox"
                  labelHidden
                  checked={check.isOn}
                  onChange={(value) =>
                    dispatch({
                      type: VaniActionEnum.CHANGE_CUSTOMIZE_VALUE,
                      field: check.field,
                      value
                    })
                  }
                />
              </Stack>
            ))}
          </FormLayout>
        </Card.Section>
      </Card>
    </Layout.Section>
  );
};
