Your SSR is indeed firing (as you can see from the server logs). However, **the key issue** is hidden in your Redux store’s `HYDRATE` handler. Specifically, in `rootReducer` you have this snippet:

```js
if (state.listings) {
  nextState.listings = {
    ...state.listings,
    ...action.payload.listings,
    status: 'loading',

    // notice here ↓
    singleListing:
      state.listings.singleListing || action.payload.listings.singleListing,

    // ...
  };
}
```

That line:

```js
singleListing: state.listings.singleListing || action.payload.listings.singleListing,
```

…means “use the old singleListing from the previous store if it exists; otherwise use the new singleListing from SSR.”

So if the user **already** had `singleListing` set (e.g., ID = 14 from a past page), the code keeps the old listing data instead of overwriting it. This is why you see the correct SSR logs on the server, but your UI is still showing the old listing once the client rehydrates the store.

---

## **How to fix it**

You want the SSR-provided data to overwrite or at least merge the old data. So, change that line (or remove the entire “preserve” logic). For instance, **invert** the logic to prefer the SSR data:

```diff
 if (state.listings) {
   nextState.listings = {
     ...state.listings,
     ...action.payload.listings,
     status: 'loading',

-    singleListing: state.listings.singleListing || action.payload.listings.singleListing,
+    singleListing: action.payload.listings.singleListing ?? state.listings.singleListing,
     // ...
   };
 }
```

**Explanation**:

- `??` means “use `action.payload.listings.singleListing` if it’s not null or undefined; otherwise, fallback to `state.listings.singleListing`.”
- This way, **if SSR does provide a `singleListing`, it overwrites the old one**. Or if SSR is null, it leaves the old data in place.

### Or simply remove the line

If you do not need to preserve any client state for `singleListing`:

```diff
 singleListing: action.payload.listings.singleListing
```

Hence every HYDRATE will set `singleListing` to the new SSR data (if any).

---

## **Why this is happening**

When Next.js does an SSR pass for `[id].js`, it dispatches `setListing(...)` in your store. In memory on the server, `singleListing` is correct. Then Next.js serializes that new store state to the client.

But once the client rehydrates, the `HYDRATE` action merges the existing store client-side with what the server provided. Because your code uses `state.listings.singleListing || payload.singleListing`, **the old client listing** is winning over the new SSR listing. That is exactly the cause of your stale data.

Remove or invert that line, and you’ll see each newly loaded listing from SSR appear as intended.

---

> **Question: Would this: singleListing: action.payload.listings.singleListing || state.listings.singleListing work as well?

Yes, that snippet would also work. Specifically:

```js
singleListing: action.payload.listings.singleListing || state.listings.singleListing
```

In JavaScript, the `||` operator uses the left operand unless it’s *falsey* (i.e., `null`, `undefined`, `0`, `""`, etc.), in which case it uses the right operand. Therefore, if `action.payload.listings.singleListing` is a valid object from SSR, it will overwrite the old `singleListing`. If the SSR-provided value happens to be `null` or `undefined`, it falls back to the previous state.

In a typical scenario (where `singleListing` is an object), that’s exactly what you want: SSR data overwrites the old data if present, otherwise you retain the old data if SSR has nothing.

> **Note**: If you find yourself dealing with edge cases (for example, if the server sometimes returns an empty object `{}` or an empty array `[]` that you consider "invalid"), you might need additional checks, but for normal usage an OR (`||`) check is fine.

