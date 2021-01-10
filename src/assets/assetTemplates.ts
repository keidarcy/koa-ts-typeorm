import { Customize } from '@prisma/client';

export const liquidTemplate = (customize: Customize) => `
<link rel="stylesheet" type="text/css" href="{{ 'vcs.css' | asset_url }}"/>
{% assign home_cart = "index,cart" | split:"," %}
{% if home_cart contains template %}
  <div class="vcs-content-container js-bsp-container">
    <p class="vcs-section-title" style="color: ${customize?.titleColor};">
      ${customize?.bspTitle}
    </p>
    {%- assign collection = collections['bsp'] -%}
    <div class="vcs-products-container">
      {% for product in collection.products limit: ${customize?.showNumber} %}
        <div class="vcs-card js-vcs-card" id="vcs-card-container">

          <div class="vcs-image">
            <a href={{product.url}}>
              <img alt={{product.title}} class="vcs-image-hover" src={{product.images[0] | img_url: '1000x1000', crop: 'bottom' }}/>
              <img alt={{product.title}} class="vcs-image-back" src={{product.images[1] | img_url: '1000x1000', crop: 'bottom' }}/>
            </a>
          </div>

          <div>
            <p class="vcs-title" style="color: ${
              customize?.productNameColor
            };">{{product.title}}</p>
            <p class="vcs-title" style="color: ${
              customize?.productNameColor
            };">{{product.vendor}}</p>
            <div class="vcs-title" style="display: ${
              customize?.showPrice ? '' : 'none'
            };">
              {% if product.compare_at_price %}
                <span class="vcs-compare-price js-vcs-price-1">
                  {{ product.compare_at_price | money }}
                </span>
              {% endif %}
              <span class="js-vcs-compare-price-1">{{ product.price | money }}</span>
            </div>
          </div>

          {%- unless product.has_only_default_variant -%}
            {% for product_option in product.options_with_values %}
              <div class="vcs-selection-wrapper"  style="display: ${
                customize?.showVariant ? '' : 'none'
              };">
                <p class="vcs-selection-label">{{product_option.name}}</p>
                <div class="vcs-selection-box">
                  <select id={{product_option.name}} name={{product_option.name}} class="js-vcs-option-{{ forloop.index0 }}">
                    {% for value in product_option.values %}
                      <option {% if product_option.selected_value == value %} selected {% endif %}>
                        {{ value }}
                      </option>
                    {% endfor %}
                  </select>
                </div>
              </div>
            {% endfor %}
          {%- endunless -%}

          <form action="/cart/add" enctype="multipart/form-data" method="post">
            <input name="form_type" type="hidden" value="product">
            <input name="utf8" type="hidden" value="✓">
            {% if product.has_only_default_variant %}
              <input name="id" value="{{ product.first_available_variant.id }}" type="hidden">
            {% else %}
              <select class="js-vcs-variant-select" hidden name="id">
                {% for variant in product.variants %}
                  <option data-availble={{variant.available}} data-compareatprice="{% if product.compare_at_price %}{{ variant.compare_at_price | money }}{% endif %}" data-price="{{ variant.price | money }}" {% if variant == product.selected_or_first_available_variant %} selected="selected" {% endif %} value={{variant.id}}>
                    {{variant.title}}
                  </option>
                {% endfor %}
              </select>
            {% endif %}
            <input hidden name="quantity" type="text" value="1"/>
            <button  class="vcs-button js-vcs-button {%- unless product.available -%}vcs-button-diabled{%- endunless -%}" 
            style="display: ${customize?.showCart ? '' : 'none'};background-color: ${
  customize?.cartColor
}; color: ${customize?.productNameColor}">
              ${customize.cartText}
            </button>
          </form>
        </div>
      {% endfor %}
    </div>
  </div>
{% endif %}

{% if home_cart contains template %}
  <div class="vcs-content-container  js-np-container">
    <p class="vcs-section-title" style="color: ${customize?.titleColor};">
      ${customize?.npTitle}
    </p>
    {%- assign collection = collections['np'] -%}
    <div class="vcs-products-container">
      {% for product in collection.products limit: ${customize?.showNumber} %}
        <div class="vcs-card js-vcs-card" id="vcs-card-container">

          <div class="vcs-image">
            <a href={{product.url}}>
              <img alt={{product.title}} class="vcs-image-hover" src={{product.images[0] | img_url: '1000x1000', crop: 'bottom' }}/>
              <img alt={{product.title}} class="vcs-image-back" src={{product.images[1] | img_url: '1000x1000', crop: 'bottom' }}/>
            </a>
          </div>

          <div>
            <p class="vcs-title" style="color: ${
              customize?.productNameColor
            };">{{product.title}}</p>
            <p class="vcs-title" style="color: ${
              customize?.productNameColor
            };">{{product.vendor}}</p>
            <div class="vcs-title">
              {% if product.compare_at_price %}
                <span class="vcs-compare-price js-vcs-price-1">
                  {{ product.compare_at_price | money }}
                </span>
              {% endif %}
              <span class="js-vcs-compare-price-1">{{ product.price | money }}</span>
            </div>
          </div>

          {%- unless product.has_only_default_variant -%}
            {% for product_option in product.options_with_values %}
              <div class="vcs-selection-wrapper">
                <p class="vcs-selection-label">{{product_option.name}}</p>
                <div class="vcs-selection-box">
                  <select id={{product_option.name}} name={{product_option.name}} class="js-vcs-option-{{ forloop.index0 }}">
                    {% for value in product_option.values %}
                      <option {% if product_option.selected_value == value %} selected {% endif %}>
                        {{ value }}
                      </option>
                    {% endfor %}
                  </select>
                </div>
              </div>
            {% endfor %}
          {%- endunless -%}

          <form action="/cart/add" enctype="multipart/form-data" method="post">
            <input name="form_type" type="hidden" value="product">
            <input name="utf8" type="hidden" value="✓">
            {% if product.has_only_default_variant %}
              <input name="id" value="{{ product.first_available_variant.id }}" type="hidden">
            {% else %}
              <select class="js-vcs-variant-select" hidden name="id">
                {% for variant in product.variants %}
                  <option data-availble={{variant.available}} data-compareatprice="{% if product.compare_at_price %}{{ variant.compare_at_price | money }}{% endif %}" data-price="{{ variant.price | money }}" {% if variant == product.selected_or_first_available_variant %} selected="selected" {% endif %} value={{variant.id}}>
                    {{variant.title}}
                  </option>
                {% endfor %}
              </select>
            {% endif %}
            <input hidden name="quantity" type="text" value="1"/>
            <button class="vcs-button js-vcs-button {%- unless product.available -%}vcs-button-diabled{%- endunless -%}" style="background-color: ${
              customize?.cartColor
            }; color: ${customize?.productNameColor}">
              ${customize.cartText}
            </button>
          </form>
        </div>
      {% endfor %}
    </div>
  </div>
{% endif %}

<script>
  const VCSMain = () => {
    const vcsCards = document.querySelectorAll(".js-vcs-card");

    vcsCards.forEach((card) => {
      const select1 = card.querySelector(".js-vcs-option-0");
      const select2 = card.querySelector(".js-vcs-option-1");
      const select3 = card.querySelector(".js-vcs-option-2");
      const price = card.querySelector(".js-vcs-price-1");
      const compareAtPrice = card.querySelector(".js-vcs-compare-price-1");
      const variantSelect = card.querySelector(".js-vcs-variant-select");
      const button = card.querySelector("button.js-vcs-button");

      const selectVariantOption = (fullTitle) => {
        let shouldDisable = true;
        Array.from(variantSelect.children).forEach((option, index) => {
          if (option.innerHTML.trim() === fullTitle.trim()) {
            variantSelect.value = variantSelect.children[index].value;
            const data = option.dataset;
            price.innerHTML = data.price;
            if (data.compareatprice) 
              compareAtPrice.innerHTML = data.compareatprice;
            


            if (data.availble === "true") {
              shouldDisable = false;
            }
          }
        });
        if (shouldDisable) {
          button.disabled = true;
          button.classList.add("vcs-button-diabled");
        } else {
          button.disabled = false;
          button.classList.remove("vcs-button-diabled");
        }
      };

      if (select1) {
        select1.addEventListener("change", () => {
          const option1 = select1.value;
          const option2 = select2
            ? " / " + select2.value
            : "";
          const option3 = select3
            ? " / " + select3.value
            : "";
          const fullTitle = option1 + option2 + option3;
          selectVariantOption(fullTitle);
        });
      }

      if (select2) {
        select2.addEventListener("change", () => {
          const option1 = select1.value;
          const option2 = " / " + select2.value;
          const option3 = select3
            ? " / " + select3.value
            : "";
          const fullTitle = option1 + option2 + option3;
          selectVariantOption(fullTitle);
        });
      }

      if (select3) {
        select3.addEventListener("change", () => {
          const option1 = select1.value;
          const option2 = " / " + select2.value;
          const option3 = " / " + select3.value;
          const fullTitle = option1 + option2 + option3;
          selectVariantOption(fullTitle);
        });
      }
    });
  };


  const vcs = {};
  vcs.productHandle = "{{ product.handle }}";
  vcs.collectionHandle = "{{ collection.handle }}";
  vcs.shopUrl = "{{ shop.url }}";
  vcs.template = "{{ template.name }}";
  vcs.moneyFormat = "{{ shop.money_format }}";

  // Mobile Responsive
  if(window.innerWidth < 768 || ${customize?.showNumber > 5}) {
    console.log({innerWidth})
    document.querySelectorAll('.vcs-products-container').forEach(g => {
      g.style.justifyContent = 'start'
    })
  }

  // BSP
  if (${customize?.bestSellingProducts}) {
    document.querySelector('.js-bsp-container').style.display = '';
  } else {
    document.querySelector('.js-bsp-container').style.display = 'none';
  }


  // NP
  if (${customize?.newestProducts}) {
    document.querySelector('.js-np-container').style.display = '';
  } else {
    document.querySelector('.js-np-container').style.display = 'none';
  }

  // RP



  VCSMain();
</script>
`;
