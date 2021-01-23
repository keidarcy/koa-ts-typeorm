import { Customize } from '@prisma/client';

export const liquidTemplate = (customize: Customize) => `
<link rel="stylesheet" type="text/css" href="{{ 'vcs.css' | asset_url }}"/>
{% assign home_cart = "index,cart" | split:"," %}
{% assign max_number = ${customize.showNumber} %}
{% assign rvp_pages = "index,product,collection,cart" | split:"," %}
{% if home_cart contains template %}
  <div class="vcs-content-container js-bsp-container">
    <p class="vcs-section-title" style="color: ${customize?.titleColor};">
      ${customize?.bspTitle}
    </p>
    {%- assign collection = collections['bsp'] -%}
    <div class="vcs-products-container">
      {% for product in collection.products limit: max_number %}
        {% if product.images[0] %}
        <div class="vcs-card js-vcs-card" id="vcs-card-container">

          <div class="vcs-image">
            <a href={{product.url}}>
              <img alt={{product.title}} class="vcs-image-hover" src={{product.images[0] | img_url: '1000x1000', crop: 'bottom' }}/>
              {% if product.images[1] %}
                <img alt={{product.title}} class="vcs-image-back" src={{product.images[1] | img_url: '1000x1000', crop: 'bottom' }}/>
              {% endif %}
            </a>
          </div>

          <div>
            <p class="vcs-title" style="color: ${customize?.productNameColor};">{{product.title}}</p>
            <p class="vcs-title" style="color: ${customize?.productNameColor};">{{product.vendor}}</p>
            <div class="vcs-title" style="display: ${customize?.showPrice ? 'block' : 'none'};">
              {% if product.compare_at_price %}
                <span class="vcs-compare-price js-vcs-compare-price-1">
                  {{ product.compare_at_price | money }}
                </span>
              {% endif %}
              <span class="js-vcs-price-1">{{ product.price | money }}</span>
            </div>
          </div>

          {%- unless product.has_only_default_variant -%}
            {% for product_option in product.options_with_values %}
              <div class="vcs-selection-wrapper"  style="display: ${customize?.showVariant ? 'block' : 'none'};">
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
            style="display: ${customize?.showCart ? 'block' : 'none'};background-color: ${customize?.cartColor}; color: ${customize?.productNameColor};">
              ${customize.cartText}
            </button>
          </form>
        </div>
        {% endif %}
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
      {% for product in collection.products limit: max_number %}
        {% if product.images[0] %}
        <div class="vcs-card js-vcs-card" id="vcs-card-container">

          <div class="vcs-image">
            <a href={{product.url}}>
              <img alt={{product.title}} class="vcs-image-hover" src={{product.images[0] | img_url: '1000x1000', crop: 'bottom' }}/>
                {% if product.images[1] %}
              <img alt={{product.title}} class="vcs-image-back" src={{product.images[1] | img_url: '1000x1000', crop: 'bottom' }}/>
          {% endif %}
            </a>
          </div>

          <div>
            <p class="vcs-title" style="color: ${customize?.productNameColor};">{{product.title}}</p>
            <p class="vcs-title" style="color: ${customize?.productNameColor};">{{product.vendor}}</p>
            <div class="vcs-title">
              {% if product.compare_at_price %}
                <span class="vcs-compare-price js-vcs-compare-price-1">
                  {{ product.compare_at_price | money }}
                </span>
              {% endif %}
              <span class="js-vcs-price-1">{{ product.price | money }}</span>
            </div>
          </div>

          {%- unless product.has_only_default_variant -%}
            {% for product_option in product.options_with_values %}
              <div class="vcs-selection-wrapper"  style="display: ${customize?.showVariant ? 'block' : 'none'};">
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
            <button
                class="vcs-button js-vcs-button {%- unless product.available -%}vcs-button-diabled{%- endunless -%}"
                style="display: ${customize?.showCart ? 'block' : 'none'};background-color: ${customize?.cartColor}; color: ${customize?.productNameColor};"
                >
              ${customize.cartText}
            </button>
          </form>
        </div>
        {% endif %}
      {% endfor %}
    </div>
  </div>
{% endif %}

{% if "product" contains template %}
  <div class="vcs-content-container js-rp-container">
    <p class="vcs-section-title" style="color: ${customize?.titleColor};">
      ${customize?.rpTitle}
    </p>
    <div class="vcs-products-container">
    </div>
  </div>
{% endif %}

{% if rvp_pages contains template %}
  <div class="vcs-content-container js-rvp-container">
    <p class="vcs-section-title" style="color: ${customize?.titleColor};">
      ${customize?.rvpTitle}
    </p>
    <div class="vcs-products-container">
    </div>
  </div>
{% endif %}


<script>
  var vcs = {};
  vcs.productHandle = "{{ product.handle }}";
  vcs.collectionHandle = "{{ collection.handle }}";
  vcs.shopUrl = "{{ shop.url }}";
  vcs.template = "{{ template.name }}";
  vcs.moneyFormat = "{{ shop.money_format }}";
  vcs.localKey = "VCS_LOCAL_STORAGE_VIEWED_PRODUCTS"
  vcs.moneyFormatWithCurrency = (number) => {
    let newNumber = number;
    const currencyCode = "{{ shop.currency }}";
    if (currencyCode === 'JPY') {
      newNumber = number / 100;
    }
    return new Intl.NumberFormat(currencyCode, { style: 'currency', currency: currencyCode }).format(newNumber)
  }
  vcs.main = () => {
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
            if (data.compareatprice.replace(/[^0-9]+/g, '') > 0)
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
            : ""; const fullTitle = option1 + option2 + option3;
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


  vcs.handleRecentlyProduct = (newProduct) => {
    const item = localStorage.getItem(vcs.localKey);

    const storedProducts = JSON.parse(item);

    if(['product'].includes('{{template}}') && newProduct.hasImage) {

        let newProducts = [];

        if (!storedProducts) {
          newProducts = [newProduct];
        } else {
          const products = storedProducts.filter((product) => product.handle !== '{{product.handle}}');
          newProducts = [...[newProduct], ...products];
        }

        const productsToStore = newProducts.slice(0, {{ max_number}})

        const productsString = JSON.stringify(productsToStore);
        localStorage.setItem(vcs.localKey, productsString);
    }

    const rvpHtml = vcs.renderRecentlyViewedProduct(storedProducts ?? []);
    return rvpHtml;
  }


  vcs.renderRecentlyViewedProduct = (products) => {
    let recentlyViewedProductsHtml = "";
    products.forEach(product => {
      recentlyViewedProductsHtml += \`
      <div class="vcs-card js-vcs-card" id="vcs-card-container">

        <div class="vcs-image">
          <a href=\${product.url}>
            <img alt=\${product.title} class="vcs-image-hover" src=\${product.images[0]}/>
          \`;

            const number = product.images[1].includes('gif') ? 0 : 1;
            recentlyViewedProductsHtml += \`
            <img alt=\${product.title} class="vcs-image-back" src=\${product.images[number]}/>
          \`;
            recentlyViewedProductsHtml += \`
          </a>
        </div>

        <div>
          <p class="vcs-title" style="color: ${customize?.productNameColor};">\${product.title}</p>
          <p class="vcs-title" style="color: ${customize?.productNameColor};">\${product.vendor}</p>
          <div class="vcs-title" style="display: ${customize?.showPrice ? 'block' : 'none'};">
            \`;
        if(product.compare_at_price){
          recentlyViewedProductsHtml += \`
                <span class="vcs-compare-price js-vcs-compare-price-1">
                  \${product.compare_at_price}
                </span>
          \`;
        }
        recentlyViewedProductsHtml += \`
              <span class="js-vcs-price-1">\${product.price}</span>
            </div>
          </div>
        \`;

        if(!product.has_only_default_variant){
          product.options.forEach((option, index) => {
            recentlyViewedProductsHtml += \`
                <div class="vcs-selection-wrapper"  style="display: ${customize?.showVariant ? 'block' : 'none'};">
                  <p class="vcs-selection-label">\${option.name}</p>
                  <div class="vcs-selection-box">
                    <select id=\${option.name} name=\${option.name} class="js-vcs-option-\${index}">
            \`;

            option.values.forEach((value, innerIndex) => {
              recentlyViewedProductsHtml += \`
                        <option \${!innerIndex ? "selected" : ""}>
                          \${value}
                        </option>
                        \`;
              })
              recentlyViewedProductsHtml += \`
                      </select>
                    </div>
                  </div>
              \`
          })
        }

        recentlyViewedProductsHtml += \`
          <form action="/cart/add" enctype="multipart/form-data" method="post">
            <input name="form_type" type="hidden" value="product">
            <input name="utf8" type="hidden" value="✓">
        \`;

        if(product.has_only_default_variant){

          recentlyViewedProductsHtml += \`
            <input name="id" value="\${product.variants[0].id}" type="hidden">
          \`;

      } else {
        recentlyViewedProductsHtml += \`
          <select class="js-vcs-variant-select" hidden name="id">
          \`;
        product.variants.forEach(variant => {
          recentlyViewedProductsHtml += \`
            <option
              data-availble=\${variant.available}
              data-compareatprice="\${vcs.moneyFormatWithCurrency(variant.compare_at_price)}"
              data-price="\${vcs.moneyFormatWithCurrency(variant.price)}"
              value=\${variant.id}>
              \${variant.title}
            </option>
          \`;
        })
        recentlyViewedProductsHtml += \`
          </select>
          \`;
      }
      recentlyViewedProductsHtml += \`
            <input hidden name="quantity" type="text" value="1"/>
            <button
              class="vcs-button js-vcs-button \${product.available? "": "vcs-button-diabled"}"
              style="display: ${customize?.showCart ? 'block' : 'none'};background-color: ${customize?.cartColor}; color: ${customize?.productNameColor};">
              ${customize.cartText}
            </button>

          </form>
        </div>
      \`;
    })
    return recentlyViewedProductsHtml;
  }

  vcs.renderRecommendProducts = async (productId) => {
    const rawProducts = await fetch(\`/recommendations/products.json?product_id=\${productId}&limit={{ max_number}}\`)
    const {products} = await rawProducts.json()
    let recommendsHtml = "";
    products.forEach(product => {
      if(product.images.length){
      recommendsHtml += \`
        <div class="vcs-card js-vcs-card" id="vcs-card-container">
          <div class="vcs-image">
            <a href=\${product.url}>
              <img alt=\${product.title} class="vcs-image-hover" src=\${product.images[0]}/>
          \`;

            const number = product.images.length === 1 ? 0 : 1;
            recommendsHtml += \`
            <img alt=\${product.title} class="vcs-image-back" src=\${product.images[number]}/>
          \`;
            recommendsHtml += \`
          </a>
        </div>

          <div>
          <p class="vcs-title" style="color: ${customize?.productNameColor};">\${product.title}</p>
          <p class="vcs-title" style="color: ${customize?.productNameColor};">\${product.vendor}</p>
          <div class="vcs-title" style="display: ${customize?.showPrice ? 'block' : 'none'};">
              \`;

      if (product.compare_at_price) {
        recommendsHtml += \`
              <span class="vcs-compare-price js-vcs-compare-price-1">
                \${vcs.moneyFormatWithCurrency(product.compare_at_price)}
              </span>
              \`;
      }
        recommendsHtml += \`
              <span class="js-vcs-price-1">
                \${vcs.moneyFormatWithCurrency(product.price)}
              </span>
            </div>
          </div>
          \`;

      if (product.options[0].values[0] !== "Default Title") {
        product.options.forEach((option, index) => {
          recommendsHtml += \`
              <div class="vcs-selection-wrapper"  style="display: ${customize?.showVariant ? 'block' : 'none'};">
                <p class="vcs-selection-label">\${option.name}</p>
                <div class="vcs-selection-box">
                  <select id=\${option.name} name=\${option.name} class="js-vcs-option-\${index}">
                    \`;

          option.values.forEach((value, innerIndex) => {
            recommendsHtml += \`
                    <option \${!innerIndex ? "selected" : ""}>
                      \${value}
                    </option>
                      \`;
            })
          recommendsHtml += \`
                  </select>
                </div>
              </div>
            \`
        })
      }

      recommendsHtml += \`
          <form action="/cart/add" enctype="multipart/form-data" method="post">
            <input name="form_type" type="hidden" value="product">
            <input name="utf8" type="hidden" value="✓">
            \`;

      if (product.options[0].values[0] === "Default Title") {
        recommendsHtml += \`
              <input name="id" value="\${product.variants[0].id}" type="hidden">
              \`;
      } else {
        recommendsHtml += \`
          <select class="js-vcs-variant-select" hidden name="id">
            \`;
        product.variants.forEach(variant => {
          recommendsHtml += \`
            <option
              data-availble=\${variant.available}
              data-compareatprice="\${vcs.moneyFormatWithCurrency(variant.compare_at_price)}"
              data-price="\${vcs.moneyFormatWithCurrency(variant.price)}"
              value=\${variant.id}>
                \${variant.title}
            </option>
          \`;
        })
        recommendsHtml += \`
          </select>
          \`;
      }
      recommendsHtml += \`
            <input hidden name="quantity" type="text" value="1"/>
            <button
              class="vcs-button js-vcs-button \${product.available? "": "vcs-button-diabled"}"
              style="display: ${customize?.showCart ? 'block' : 'none'};background-color: ${customize?.cartColor}; color: ${customize?.productNameColor};">
              ${customize.cartText}
            </button>

          </form>
        </div>
      \`;
    }
      })
      return recommendsHtml;
  }

  // Mobile Responsive
  if(window.innerWidth < 768 || window.innerWidth < 300*'{{ max_number }}') {
    document.querySelectorAll('.vcs-products-container').forEach(g => {
      g.style.justifyContent = 'start'
    })
  }

  // BSP
  if (${customize?.bestSellingProducts}) {
    if(['index', 'cart'].includes('{{template}}')) {
      document.querySelector('.js-bsp-container').style.display = 'block';
    }
  } else {
    if(['index', 'cart'].includes('{{template}}')) {
      document.querySelector('.js-bsp-container').style.display = 'none';
    }
  }

  // NP
  if (${customize?.newestProducts}) {
    if(['index', 'cart'].includes('{{template}}')) {
      document.querySelector('.js-np-container').style.display = 'block';
    }
  } else {
    if(['index', 'cart'].includes('{{template}}')) {
      document.querySelector('.js-np-container').style.display = 'none';
    }
  }

  // RP
  if (${customize?.recommendedProducts}) {
    if(['product'].includes('{{template}}')) {
      document.querySelector('.js-rp-container').style.display = 'block';
      const fn = async () => {
        const recommendsHtml = await vcs.renderRecommendProducts('{{ product.id }}');
        document.querySelector('.js-rp-container').querySelector('.vcs-products-container').innerHTML = recommendsHtml;
        vcs.main();
      }
      fn();
    }
  } else {
    if(['product'].includes('{{template}}')) {
      document.querySelector('.js-rp-container').style.display = 'none';
    }
  }

  // RVP
  if (${customize?.recentlyViewedProducts}) {
    document.querySelector('.js-rvp-container').style.display = 'block';
    const rvpHtml = vcs.handleRecentlyProduct({
      hasImage: {{ product.images | json}} && {{ product.images | json}}.length,
      available: {{ product.available | json }},
      handle: '{{ product.handle }}',
      title: '{{ product.title }}',
      vendor: '{{ product.vendor }}',
      compare_at_price: '{{ product.compare_at_price | money }}',
      price: '{{ product.price | money }}',
      images: [
        "{{ product.images[0] | img_url: '1000x1000', crop: 'bottom' }}",
        "{{ product.images[1] | img_url: '1000x1000', crop: 'bottom' }}"
      ],
      url: '{{ product.url }}',
      id: '{{ product.id }}',
      has_only_default_variant: {{ product.has_only_default_variant | json }},
      options: {{ product.options_with_values | json }},
      variants: {{ product.variants | json }}
    })
    document.querySelector('.js-rvp-container').querySelector('.vcs-products-container').innerHTML = rvpHtml;
    if (!rvpHtml) {
        document.querySelector('.js-rvp-container').style.display = 'none';
    }
  } else {
    document.querySelector('.js-rvp-container').style.display = 'none';
  }


  if(${customize?.bestSellingProducts} || ${customize?.newestProducts} || ${customize?.recommendedProducts} || ${customize?.recentlyViewedProducts}){
    vcs.main();
  }
</script>
`;
