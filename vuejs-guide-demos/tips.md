## Important Tips
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
- components
  - Note that Vue does not enforce the [W3C rules](http://www.w3.org/TR/custom-elements/#concepts) for custom tag names (**all-lowercase, must contain a hyphen**) though following this convention is considered good practice.
  - Local Registration
  - **prefer using string templates whenever possible**
  - Note that objects and arrays in JavaScript are passed by reference, so if the prop is an array or object, mutating the object or array itself inside the child **will** affect parent state.
  - ​
- vuejs lifecycle: ![lifecycle](https://cloud.githubusercontent.com/assets/1112181/23449543/045c9586-fe92-11e6-9bad-4cf710b79548.png)
## Q

- **list-rendering: [key](https://cn.vuejs.org/v2/guide/list.html#key)????????**
- browser rendering
- DOM event
- By default, v-model syncs the input with the data after each input event (with the exception of IME composition as stated above). You can add the lazy modifier to instead sync after change events:
- Binding Native Events to Components:There may be times when you want to listen for a native event on the root element of a component. In these cases, you can use the `.native` modifier for `v-on`. For example:`<my-component v-on:click.native="doTheThing></my-component>"`
- [Compilation-Scope](https://vuejs.org/v2/guide/components.html#Compilation-Scope)
