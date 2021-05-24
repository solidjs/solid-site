One of the reasons for fine-grained reactivity in Solid is that it can handle nested updates independently. You can have a list of users and when we update one name we only update a single location in the DOM without diffing the list itself. Very few (even reactive) UI frameworks can do this.

But how do we accomplish this? In the example below we have a list of users in a signal. In order to update the second user's name we would need to replace the user with a clone. This is how most frameworks work, but it's wasteful as we rerun the the list diffing.

Instead in a fine-grained library like Solid we initialize the data with nested Signals like this:

> Todo Example

Now we can update the name by calling the setter without any additional diffing. This is because we've moved the complexity to the data rather than the view. And we know exactly how the data changes.

> Todo Example

This of course requires some manual mapping and it was the only choice available to us in the past. But now thanks to proxies we can do most of this work in the background without manual intervention. Continue to the next tutorials to see how.
