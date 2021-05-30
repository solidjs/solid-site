The style attribute in Solid accepts either style strings or objects. However the object form differs from `Element.prototype.style` and instead is a wrapper for calling `Element.style.setProperty`. This means that keys take the dash case form, like "background-color" rather than "backgroundColor". However it means we have the ability to set CSS variables.

```js
<div style={{ "--my-custom-color": state.themeColor }} />
```

> Todo Example