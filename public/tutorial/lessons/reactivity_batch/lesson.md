Solid's reactivity is synchronous which means by the next line after any change the DOM will have updated. Often we need to update multiple signals as the result of the same action.

Solid's `batch` helper allows to queue up multiple changes and then apply them all at the same time before notifying their observers.

> Todo Example