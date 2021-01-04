export const bspTemplate = `
  {%- assign collection = collections['bsp'] -%}
  {% for product in collection.products limit: 4 %}
  <a href="{{ product.url }}">
    <div>
      <img  src="{{ product.featured_image | img_url: '1000x1000', crop: 'bottom' }}" alt="{{ product.title }}"/>
    </div>
    <p>{{ product.title }}</p>
    <p>{{ product.price | money }}</p>
  </a>
{% endfor %}
`;
