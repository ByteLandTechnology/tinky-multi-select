[**tinky-multi-select**](../README.md)

---

[tinky-multi-select](../globals.md) / MultiSelect

# Function: MultiSelect()

> **MultiSelect**(`props`): `Element`

A multi-select component for Tinky CLIs.
Allows users to select multiple items from a list using keyboard navigation.
Supports scrolling, filtering highlighting, and custom theming.

## Parameters

### props

[`MultiSelectProps`](../interfaces/MultiSelectProps.md)

The props for the MultiSelect component.

## Returns

`Element`

The rendered MultiSelect component.

## Example

```tsx
<MultiSelect
  options={[
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
  ]}
  onSubmit={(values) => console.log(values)}
/>
```
