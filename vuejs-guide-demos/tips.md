#### Important Tips
- Don’t use arrow functions on an instance property or callback (e.g. `vm.$watch('a', newVal => this.myMethod())`). As arrow functions are bound to the parent context, this will not be the Vue instance as you’d expect and this.myMethod will be undefined.
- Vue 2.x filters can only be used inside mustache interpolations and `v-bind` expressions (the latter supported since 2.1.0), because filters are primarily designed for text transformation purposes. For more complex data transforms in other directives, you should use [Computed properties](https://vuejs.org/v2/guide/computed.html) instead.
- That’s why for any complex logic, you should use a **computed property**
- While **computed properties are more appropriate in most cases**, there are times when a custom watcher is necessary. That’s why Vue provides a more generic way to react to data changes through the `watch` option. **This is most useful when you want to perform asynchronous or expensive operations in response to changing data**.
- A common need for **data binding** is **manipulating an element’s class list and its inline styles**.
- Generally speaking, `v-if` has higher toggle costs while `v-show` has higher initial render costs. So prefer `v-show` if you need to toggle something very often, and prefer `v-if` if the condition is unlikely to change at runtime
- When iterating over an object, the order is based on the key enumeration order of `Object.keys()`, which is **not** guaranteed to be consistent across JavaScript engine implementations.
- Displaying Filtered/Sorted Results
  - Sometimes we want to display a filtered or sorted version of an array without actually mutating or resetting the original data. In this case, you can create a **computed property** that returns the filtered or sorted array.
  - Alternatively, you can also just use a method where **computed properties are not feasible (e.g. inside nested `v-for` loops)**

## Q

- **list-rendering: [key](https://cn.vuejs.org/v2/guide/list.html#key)????????**
- browser rendering
- DOM event
