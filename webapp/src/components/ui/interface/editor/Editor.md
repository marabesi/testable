# Editor

## Basic usage

Raw Editor component

```jsx
  <Editor />
```

Default text inside the editor

```jsx
  <Editor value={'my text'} />
```

Fire callback when the editor text has changed

```jsx
  <Editor codeChanged={ code => alert(code) } />
```