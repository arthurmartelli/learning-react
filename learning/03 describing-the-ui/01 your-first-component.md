# Your First Component

> Components are one of the core concepts of React. They are the foundation upon which you build user interfaces (UI), which makes them the perfect place to start your React journey!

## Components: UI building blocks

On the web, we create rich structured documents with the built-in set of tags of HTML:

```html
<article>
  <h1>My First Component</h1>
  <ol>
    <li>Components: UI Building Blocks</li>
    <li>Defining a Component</li>
    <li>Using a Component</li>
  </ol>
</article>
```

The markup represents an ordered list (`<ol>`) of items (`<li>`), under a heading (`<h1>`), all wrapped inside an article (`<article>`). Markup like this, combined with CSS for styling and JavaScript for interactivity lie behind every web page that exists.

React allows a combination of markup, CSS and JavaScript to create reusable pieces of UI, components. This component will speed-up the development process and simplify the development of complex and interactive UIs.

## Defining a component

A React component is a JavaScript function that you can sprinkle with markup. Therefore, interactivity comes first when creating them.

```jsx
export default function Profile() {
  return <img src="https://i.imgur.com/MK3eW3Am.jpg" alt="Katherine Johnson" />;
}
```

### Step 1: Export the component

`export default` is standard JavaScript syntax. It lets you define the main function in a file so that other files can use it as well.

### Step 2: Define the function

With `function Profile() {}` you define a JS function with the name `Profile`

### Step 3: Add markup

The component must return a markup. The one used in react is JSX, similar but better than HTML. These return statements must return only one element overall, but this element can have various children.

```jsx
// You can do one-liners
return <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />;

// And multi-liners
return (
  <div>
    <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  </div>
);

// This is for returning 2 images
return (
  <div>
    <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
    <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  </div>
);
```

## Using Components

Now that you've defined your Profile component, you can nest it inside other components. For example, you can export a Gallery component that uses multiple Profile components:

```jsx
function Profile() {
  return <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />;
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

### What the browser sees

Notice the difference in casing:

- `<section>` is lowercase, so React knows we refer to an HTML tag.
- `<Profile />` starts with a capital P, so React knows that we want to use our component called `Profile`.

And `Profile` contains even more HTML: `<img />`. In the end, this is what the browser sees:

```html
<section>
  <h1>Amazing scientists</h1>
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
</section>
```

### Nesting and organizing components

Components are regular JS functions, so there can be multiple in a single file. Otherwise, if the file gets too crowded, components can be moved to other files to maintain organization.

> Because the Profile components are rendered inside `Gallery` —even several times!— we can say that `Gallery` is a parent component, rendering each `Profile` as a "child". This is part of the magic of React: you can define a component once, and then use it in as many places and as many times as you like.

## Recommendations

1. Component names must always start with a capital letter: `Profile` will work, but `profile` will not.
2. Without parenthesis, any code after `return` will be ignored
3. Components can render other components, but you must never nest their definitions:

```jsx
// this is very slow and causes bugs.
export default function Gallery() {
  // Never define a component inside another component!
  function Profile() {
    // ...
  }
  // ...
}

// Instead, define every component at the top level
export default function Gallery() {
  // ...
}

// Declare components at the top level
function Profile() {
  // ...
}
// When a child component needs some data from a parent, pass it by props instead of nesting definitions.
```
