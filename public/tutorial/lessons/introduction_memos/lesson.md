# Memos

Most of the time composing derived Signals is sufficient. However, it is sometimes beneficial to cache values reduce duplicated work. We can use Memos, a special primitive, to store and access the last cached value without re-evaluating it until their dependencies change. By preventing re-evaluation when the value is read we can reduce work required when accessing expensive operations like DOM Node creation, when accessed in many places or part of Effects that have multiple dependencies.

Memos are both a tracking computation like an Effect and a read-only Signal. Since they are aware of both their dependencies and their observers they can ensure that they only run once for any change. This makes them preferable to registering Effects that write to Signals. Generally, what can be derived, should be derived.

