Some frameworks pair their cleanup methods as return values of their side effects or lifecycle methods. Since everything in a Solid render tree is living inside an (possibly inert) Effect and can be nested we made `onCleanup` a first class method. You can call it at any scope and it will run when that scope is triggered to re-evaluate and when it is finally disposed.

Use it in your components or in your Effects. Use it in your custom directives. Use it pretty much anywhere that is part of the synchronous execution of the reactive system.

> Todo Example