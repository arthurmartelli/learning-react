# Conditional Rendering

> Your components will often need to display different things depending on different conditions. In React, you can conditionally render JSX using JavaScript syntax like `if` statements, `&&`, and `? :` operators.

## Conditionally returning JSX

JSX can be conditionally returned by a function to be rendered with some elements, or not be rendered (`null`).

Let’s say you have a PackingList component rendering several Items, which can be marked as packed or not:

```jsx
function Item({ name, isPacked }) {
  return <li className="item">{name}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item isPacked={true} name="Space suit" />
        <Item isPacked={true} name="Helmet with a golden leaf" />
        <Item isPacked={false} name="Photo of Tam" />
      </ul>
    </section>
  );
}
```

The function item could e modified as such:

### Rendering a checkmark for packed elements

```jsx
function Item({ name, isPacked }) {
  if (isPacked) {
    return <li className="item">{name} ✔</li>;
  }

  return <li className="item">{name}</li>;
}
```

```jsx
function Item({ name, isPacked }) {
  return <li className="item">{isPacked ? name + " ✔" : name}</li>;
}
```

```jsx
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked && "✔"}
    </li>
    // Don’t put numbers on the left side of &&.
    // If such case is needed, use ordering operators.
  );
}
```

```jsx
function Item({ name, isPacked }) {
  let itemContent = name;
  if (isPacked) {
    itemContent = name + " ✔";
  }
  return <li className="item">{itemContent}</li>;
}
```

### Not rendering an element

```jsx
function Item({ name, isPacked }) {
  if (isPacked) {
    return null;
  }

  return <li className="item">{name}</li>;
}
```

The examples above are equivalent.
