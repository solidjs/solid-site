Sometimes it beneficial to insert elements outside the normal flow of the app. Z-index are sometimes insufficient to deal with render contexts for floating elements like Modals.

Solid has a `<Portal>` component whose child content will be inserted at the location of your choosing. By default its elements will be rendered in a `<div>` in the `document.body`.

> TODO Example