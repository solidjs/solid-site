With Suspense when data is loading we show fallback content. But we can do more when we already have data loaded. We can avoid going back to the fallback state by leveraging `useTransition`. It provides a wrapper and a pending indicator. The wrapper puts all downstream updates in a transaction that doesn't commit until all async events complete.

This means when control flow is suspended it continues to show the current branch while rendering the next off screen. Resource reads under existing boundaries add it the transition. However, any new nested `Suspense` components will show "fallback" if they have not completed loading before coming into view.

> Todo Example