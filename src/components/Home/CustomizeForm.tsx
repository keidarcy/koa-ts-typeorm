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

  const columns = {
    showNumber: {
      title: 'How many product to show',
      field: 'showNumber',
      default: 4
    },
    cart: {
      title: 'Text in cart button',
      field: 'cartText',
      default: 'ADD TO CART'
    }
  };

  const handleChange = useCallback((value, field) => {
    dispatch({
      type: VaniActionEnum.CHANGE_CUSTOMIZE_VALUE,
      field,
      value
    });
  }, []);

  return (
    <Layout.Section oneHalf>
      <Card title="Customize Your Product Card">
        <Card.Section>
          <FormLayout>
            <TextField
              label={columns.showNumber.title}
              type="number"
              value={state.customize?.showNumber?.toString()}
              id={columns.showNumber.field}
              onChange={handleChange}
              placeholder={columns.showNumber.default.toString()}
              helpText="The recommendation is 4. The maximum number is 20."
            />
            <TextField
              label={columns.cart.title}
              id={columns.cart.field}
              value={state.customize?.cartText}
              onChange={handleChange}
              placeholder={columns.cart.default}
            />
            {colors.map((color, index) => (
              <Stack key={`${color.color}-${index}`}>
                <Stack.Item fill>{color.title}</Stack.Item>
                <VaniColorPicker color={color.color} field={color.field} />
              </Stack>
            ))}
            {checkboxes.map((check, index) => (
              <Stack key={`${check.title}-${index}`}>
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
