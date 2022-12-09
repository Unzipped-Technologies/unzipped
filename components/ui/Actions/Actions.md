Multiple Actions

```jsx
import Action from '../Action';
<Actions>
    <Action onClick={() => {}}>Item 1</Action>
    <Action onClick={() => {}}>Item 2</Action>
</Actions>;
```

Single Action

```jsx
import Action from '../Action';
<Actions>
    <Action onClick={() => {}}>Single Item</Action>
</Actions>;
```

Single Action With Forced Menu

```jsx
import Action from '../Action';
<Actions forceMenu>
    <Action onClick={() => {}}>Single Item</Action>
</Actions>;
```
