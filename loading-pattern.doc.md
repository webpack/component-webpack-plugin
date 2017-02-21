## loading-pattern

It seems like the folder structure of components have changed. When you install a component, the folder structure for each component looks something like the following:

```
component-name
    |_ x.y.z
        |_ component.json
        |_ index.js

```
It seems like this pattern is consistent for all of the components and there might not even be a need to read all the `component.json` files for every component and figure out version values. There might still be value for getting the name of the component, but as a quick fix, it should be ok to rely on the pattern.

The other difference is the name of components in the `component.json` file. When a component is installed with `component install component/nameofcompoennt` the dependency fields gets updated and looks something like this:

```
"dependencies": {
  "component/calendar": "~0.2.0",
  "component/datepicker": "^1.0.1"
}
```

The `component/` is added which as a quick fix can be replaced with empty string when parsed.
