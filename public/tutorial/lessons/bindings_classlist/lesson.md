Solid supports using both `class` and `className` to set the `className` property on an element. However often it is convenient to conditionally set classes. For that reason Solid has a built-in `classList` JSX attribute that takes an object where the key is the class name/s and the value is a boolean expression. When true the class is applied and when false it is removed.

> Todo Example

Remember you can apply names dynamically like what you'd receive in CSS modules as well.

```jsx
import { active } from "./style.module.css"

<div classList={ [active]: isActive() } />
```