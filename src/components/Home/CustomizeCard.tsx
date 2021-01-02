import { Card, Layout, List } from '@shopify/polaris';
import { useContext } from 'react';
import { VaniContext } from '../../utils/contexts/VCScontext';

export const CustomizeCard = () => {
  const { state, dispatch } = useContext(VaniContext);
  return (
    <Layout.Section>
      <Card title="Product Card">
        <Card.Section>
          <img src={state.product.images[0]} alt={state.product.title} />
          <h1>{state.product.title}</h1>
          <h2>{state.product.vendor}</h2>
          {state.product.options.map((option) => (
            <>
              <h2>{option.name}</h2>
              <select name={option.name} id={option.name}>
                {option.values.map((value) => (
                  <option value={value}>{value}</option>
                ))}
              </select>
            </>
          ))}
        </Card.Section>
      </Card>
    </Layout.Section>
  );
};
