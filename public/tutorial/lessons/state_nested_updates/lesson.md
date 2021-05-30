Solid's State setter also supports path syntax so that we can do nested updates. In this way we can still maintain control of our reactivity but do pinpoint updates.

Solid's path syntax has many forms and includes some powerful syntax to do iteration and ranges. Refer to the API documentation for a full reference.

Now we can rewrite our example from our previous tutorial in granular way without doing our manual data mapping. The State proxy will handle creating the signals automatically and we just need to set our value.

> Todo Example