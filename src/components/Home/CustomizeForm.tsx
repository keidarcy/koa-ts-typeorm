import { Card, Checkbox, FormLayout, Layout, Stack, TextField } from '@shopify/polaris';
import React, { useCallback, useContext } from 'react';
import { VaniColorPicker } from './/VaniColorPicker';
import { VaniContext } from '../../utils/contexts/VCScontext';
import { VaniActionEnum } from '../../utils/type.helper';
import { useT } from '../../utils/hooks/useT';

export const CustomizeForm = () => {
  const { state, dispatch } = useContext(VaniContext);

  const t = useT();

  const columns = {
    showNumber: {
      title: t.customize.number,
      field: 'showNumber',
      default: 4
    },
    cart: {
      title: t.customize.cart,
      field: 'cartText',
      default: 'ADD TO CART'
    }
  };

  const checkboxes = [
    {
      title: t.customize.showCart,
      isOn: state.customize?.showCart,
      field: 'showCart'
    },
    {
      title: t.customize.showVariant,
      isOn: state.customize?.showVariant,
      field: 'showVariant'
    },
    {
      title: t.customize.showPrice,
      isOn: state.customize?.showPrice,
      field: 'showPrice'
    }
  ];

  const colors = [
    {
      title: t.customize.cartButtonColor,
      color: state.customize?.cartColor,
      field: 'cartColor'
    },
    {
      title: t.customize.titleColor,
      color: state.customize?.titleColor,
      field: 'titleColor'
    },
    {
      title: t.customize.textColor,
      color: state.customize?.productNameColor,
      field: 'productNameColor'
    }
  ];

  const handleChange = useCallback((value, field) => {
    dispatch({
      type: VaniActionEnum.CHANGE_CUSTOMIZE_VALUE,
      field,
      value
    });
  }, []);

  return (
    <Layout.Section oneHalf>
      <Card title={t.customize.title}>
        <Card.Section>
          <FormLayout>
            <TextField
              label={columns.showNumber.title}
              type="number"
              value={state.customize?.showNumber?.toString()}
              id={columns.showNumber.field}
              onChange={handleChange}
              placeholder={columns.showNumber.default.toString()}
              helpText={t.customize.numberHelpText}
              max={20}
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
