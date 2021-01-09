import { Customize } from '@prisma/client';

export const liquidTemplate = (customize: Customize) => `
<link rel="stylesheet" type="text/css" href="{{ 'vcs.css' | asset_url }}"/>
<div class="vcs-content-container">
  <p class="vcs-section-title" style="color: ${customize?.titleColor};">
    ${customize?.bspTitle}
  </p>
  {%- assign collection = collections['bsp'] -%}
  <div class="vcs-products-container">
    {% for product in collection.products limit: 4 %}
      <div class="vcs-card js-vcs-card" id="vcs-card-container">
        <div class="vcs-image">
          <a href={{product.url}} target="_blank">
            <img alt={{product.title}} class="vcs-image-hover" src={{product.images[0] | img_url: '1000x1000', crop: 'bottom' }}/>
            <img alt={{product.title}} class="vcs-image-back" src={{product.images[1] | img_url: '1000x1000', crop: 'bottom' }}/>
          </a>
        </div>
        <div style="color: ${customize?.productNameColor};">
          <p class="vcs-title">{{product.title}}</p>
          <p class="vcs-title">{{product.vendor}}</p>
          <div class="vcs-title">
            <span class="vcs-compare-price js-vcs-price-1">
              {{product.compareAtPrice}}
            </span>
            <span class="js-vcs-compare-price-1">{{product.price}}</span>
          </div>
        </div>

        {% for product_option in product.options_with_values %}
          <div class="vcs-selection-wrapper">
            <p class="vcs-selection-label">{{product_option.name}}</p>
            <div class="vcs-selection-box">
              <select id={{product_option.name}} name={{product_option.name}}>
                {% for value in product_option.values %}
                  <option {% if product_option.selected_value == value %} selected {% endif %}>
                    {{ value }}
                  </option>
                {% endfor %}
              </select>
            </div>
          </div>
        {% endfor %}

        <select class="js-vcs-variant-select" hidden id="vaiant" name="variant">
          {% for variant in product.variants %}
            <option data-availble={{variant.available}} data-compareatprice={{variant.compareAtPrice}} data-price={{variant.price}} value={{variant.id}}>
              {{variant.title}}
            </option>
          {% endfor %}
        </select>
        <button class="vcs-button js-vcs-button" style="background-color: ${customize?.cartColor}; color: ${customize?.productNameColor}">
          ${customize.cartText}
        </button>
      </div>
    {% endfor %}
  </div>
</div>

<script src="{{ 'vcs.js' | asset_url }}" defer data-no-instant></script>
`;
