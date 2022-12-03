Big version, used as header

```js
import {syndicationStatuses} from 'utils/constants';
<SyndicationTitle
    name="This is the title of a syndication"
    size="big"
    status={syndicationStatuses.DISPATCHED}
    metadata="Metadata looks like this"
/>;
```

Medium standard version

```js
import {syndicationUserStatusTypes} from 'utils/constants';
<SyndicationTitle
    size="medium"
    status={syndicationUserStatusTypes.IN_PROGRESS}
    name="This is the title of a syndication"
    metadata="Metadata looks like this"
/>;
```

Small version

```js
import {syndicationUserStatusTypes} from 'utils/constants';
<SyndicationTitle
    size="small"
    status={syndicationUserStatusTypes.IN_PROGRESS}
    name="This is the title of a syndication"
    metadata="Metadata looks like this"
/>;
```

Use the `image` prop to use a custom syndication icon and no metadata

```js
import {syndicationUserStatusTypes} from 'utils/constants';
<SyndicationTitle
    name="This is the title of a syndication"
    status={syndicationUserStatusTypes.IN_PROGRESS}
    image="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
    size="medium"
/>;
```

Use the `badgeColor` prop to color the badge

```js
<SyndicationTitle
    id={12}
    name="This is the title of a syndication"
    image="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
    size="medium"
    status="Green Color"
    badgeColor="green"
    metadata="Metadata looks like this"
/>
```
