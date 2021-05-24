One of the reasons for fine-grained reactivity is that it can handle nested updates independently. You can have a list of users and update one name and have it update a single location in the DOM without running diffing on the list itself. Very few (even reactive) UI frameworks can do this.

But how do we accomplish this? In the example we have a list of users in a signal. In order to update the second users name we replace the user with a clone. This is how most frameworks work, but it's wasteful as we rerun the the list diffing.

Instead in fine-grained library you would initialize the data with nested Signals like this:

> Todo Example

Now you can update the name by calling the setter and no additional diffing happens. This is because we've moved the complexity to the data rather than the view. And we know exactly how the data changes.

> Todo Example

This of course requires some manual mapping and was the only choice we had available in the past. But now thanks to proxies we can do most of this work in the background without manual intervention. Continue to the next tutorials to see how.