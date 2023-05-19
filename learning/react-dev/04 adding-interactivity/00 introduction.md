# Adding Interactivity

> Some things on the screen update in response to user input. For example, clicking an image gallery switches the active image. In React, data that changes over time is called state. You can add state to any component, and update it as needed. In this chapter, you’ll learn how to write components that handle interactions, update their state, and display different output over time.

## Responding to events

React lets you add event handlers to your JSX. Event handlers are your own functions that will be triggered in response to user interactions like clicking, hovering, focusing on form inputs, and so on.

Built-in components like `<button>` only support built-in browser events like `onClick`. However, you can also create your own components, and give their event handler props any application-specific names that you like.

## State: a component’s memory

State hooks is the way React handles interactivity for an event. Hooks are special functions that let your components use React features. The `useState` Hook enables the declaration of a state variable, that takes the initial state and returns a pair of values: the current state and a state setter function to update it.

Every time this state setter function gets called, the components gets re-rendered with the new value, but it does not change the value of the component.

```jsx
const [index, setIndex] = useState(0);
const [showMore, setShowMore] = useState(false);
```

## Render and commit

React handles the rendering process in 3 steps:

- Triggering a render
- Rendering the component
- Committing to the DOM

## State as a snapshot

Unlike regular JavaScript variables, React state behaves more like a snapshot. Setting it does not change the state variable you already have, but instead triggers a re-render.

```jsx
console.log(count); // 0
setCount(count + 1); // Request a re-render with 1
console.log(count); // Still 0!
```

## Queueing a series of state updates

Calling a re-render multiple times to apply an update to a component multiple times in a single request might not work, because the state's snapshot will be the same for all the re-renders. Instead what is done is to use an updater function when setting the state.

```jsx
setScore(score + 1); // does not update the state multiple times
setScore((s) => s + 1); // does update the state multiple times
```

## Updating objects in state

Objects that are inside states should be treated as immutable, so, to update a field inside an object, you must copy it into a new object, then make the needed updates, and then re-render the state.

Usually, you will use the ... spread syntax to copy objects and arrays that you want to change. For example, updating a nested object could look like this:

```jsx
const [person, setPerson] = useState({
  name: "Niki de Saint Phalle",
  artwork: {
    title: "Blue Nana",
    city: "Hamburg",
    image: "https://i.imgur.com/Sd1AgUOm.jpg",
  },
});

function handleNameChange(e) {
  setPerson({
    ...person,
    name: e.target.value,
  });
}
```

## Updating arrays in state

Arrays are another type of mutable JavaScript objects you can store in state and should treat as read-only. Just like with objects, when you want to update an array stored in state, you need to create a new one (or make a copy of an existing one), and then set state to use the new array.
