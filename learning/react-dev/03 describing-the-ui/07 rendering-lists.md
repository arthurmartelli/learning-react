# Rendering Lists

> You will often want to display multiple similar components from a collection of data. You can use the JavaScript array methods to manipulate an array of data. On this page, you'll use `filter()` and `map()` with React to filter and transform your array of data into an array of components.

A list of JSX items can be created from an array of objects with the `map()` method:

```jsx
const people = [
  "Creola Katherine Johnson: mathematician",
  "Mario José Molina-Pasquel Henríquez: chemist",
  "Mohammad Abdus Salam: physicist",
  "Percy Lavon Julian: chemist",
  "Subrahmanyan Chandrasekhar: astrophysicist",
];

const listItems = people.map((person) => <li>{person}</li>);

return <ul>{listItems}</ul>;
```

This way a list can be created interactively. Combining different uses of `map()` and `filter()`, any array can be filtered and mapped to a collection of JSX elements to be rendered.

Something to note is that React keeps track of different components with `keys`. An element can have a key, and to avoid re-rendering it over and over again, it's a good practice to assign it to each one.

The keys should be attached to the data, not the object holding the data. As the later can change, changing therefore the keys, and that can cause subtle bugs in the program.
