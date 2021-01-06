import { Layout } from '@shopify/polaris';
import { useContext, useEffect } from 'react';
import { VaniContext } from '../../utils/contexts/VCScontext';
import { productCardAnimate, selectVariant } from '../../utils/vcs.liquid';
import './card.css';

export const CustomizeCard = () => {
  const {
    state: { customize, product }
  } = useContext(VaniContext);
  useEffect(() => {
    selectVariant();
    productCardAnimate();
  }, [product]);

  return (
    <Layout.Section key="customize-card">
      <div className="vcs-content-container">
        <p className="vcs-section-title" style={{ color: customize?.titleColor }}>
          {customize?.bspTitle}
        </p>
        <div id="vcs-card-container" className="vcs-card js-vcs-card">
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
          <div style={{ color: customize?.productNameColor }}>
            <p className="vcs-title">{product?.title}</p>
            <p className="vcs-title">{product?.vendor}</p>
            {customize?.showPrice && (
              <div className="vcs-title">
                <span className="vcs-compare-price js-vcs-price-1">
                  {product?.compareAtPrice}
                </span>
                <span className="js-vcs-compare-price-1">{product?.price}</span>
              </div>
            )}
          </div>
          {customize?.showVariant &&
            product?.options.map((option, index) => (
              <>
                <div className="vcs-selection-wrapper">
                  <p className="vcs-selection-label">{option.name}</p>
                  <div className="vcs-selection-box">
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
                  </div>
                </div>
              </>
            ))}
          <select name="variant" id="vaiant" hidden className="js-vcs-variant-select">
            {product?.variants.map((variant) => (
              <option
                key={variant.id}
                value={variant.id}
                data-price={variant.price}
                data-compareatprice={variant.compareAtPrice}
                data-availble={variant.availble.toString()}
              >
                {variant.title}
              </option>
            ))}
          </select>
          {customize?.showCart && (
            <button
              className="vcs-button js-vcs-button"
              style={{
                backgroundColor: customize?.cartColor,
                color: customize?.productNameColor
              }}
            >
              ADD TO CART
            </button>
          )}
        </div>
      </div>
    </Layout.Section>
  );
};
