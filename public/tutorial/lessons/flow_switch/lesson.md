Sometimes you need to deal with conditionals with more than 2 mutual exclusive outcomes. For this reason we have the `<Switch>` and `<Match>` components modelled roughly after JavaScript's `switch`/`case`.

It will try in order to match each condition, stopping to render the first that evaluates to true. Failing all of them it will render the the fallback. This is useful for simple router type logic.

> TODO Example