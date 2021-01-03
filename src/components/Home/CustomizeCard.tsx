import { Card, Layout, List } from '@shopify/polaris';
import { useContext, useEffect } from 'react';
import { VaniContext } from '../../utils/contexts/VCScontext';
import { selectVariant } from '../../utils/front.helper';
import './card.css';

export const CustomizeCard = () => {
  const {
    state: { product }
  } = useContext(VaniContext);
  useEffect(() => {
    selectVariant();
  }, [product]);

  return (
    <Layout.Section>
      <div id="vcs-container" className="vcs-box">
        <div className="vcs-image">
          <a href={product?.url} target="_blank">
            <img
              className="vcs-image-hover"
              src={product?.images[0]}
              alt={product?.title}
            />
            <img
              className="vcs-image-back"
              src={product?.images[1]}
              alt={product?.title}
            />
          </a>
        </div>
        <p className="vcs-title">{product?.title}</p>
        <p className="vcs-title">{product?.vendor}</p>
        <div className="vcs-title">
          <span className="vcs-compare-price js-vcs-price-1">
            {product?.compareAtPrice}
          </span>
          <span className="js-vcs-compare-price-1">{product?.price}</span>
        </div>
        {product?.options.map((option, index) => (
          <>
            <h2>{option.name}</h2>
            <select
              name={option.name}
              className={`js-vcs-option-${index}`}
              id={option.name}
            >
              {option.values.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </>
        ))}
        <select name="variant" id="vaiant" className="js-vcs-variant-select">
          {product?.variants.map((variant) => (
            <option
              key={variant.id}
              value={variant.id}
              data-price={variant.price}
              data-compareatprice={variant.compareAtPrice}
              data-availble={variant.availble}
            >
              {variant.title}
            </option>
          ))}
        </select>
      </div>
    </Layout.Section>
  );
};
