Use `syndicationStatuses` and `syndicationUserStatusTypes` to style this badge.

```js
import {syndicationStatuses, syndicationUserStatusTypes} from 'utils/constants';
<div style={{display: 'flex', flexFlow: 'column', alignItems: 'flex-start', gap: 10}}>
    <SyndicationBadge status={syndicationStatuses.INITIATED}>{syndicationStatuses.INITIATED}</SyndicationBadge>
    <SyndicationBadge status={syndicationStatuses.DISPATCHED}>{syndicationStatuses.DISPATCHED}</SyndicationBadge>
    <SyndicationBadge status={syndicationStatuses.DEADLINE_PASSED}>
        {syndicationStatuses.DEADLINE_PASSED}
    </SyndicationBadge>
    <SyndicationBadge status={syndicationStatuses.ALLOCATED}>{syndicationStatuses.ALLOCATED}</SyndicationBadge>
    <SyndicationBadge status={syndicationStatuses.CANCELED}>{syndicationStatuses.CANCELED}</SyndicationBadge>
    <SyndicationBadge status={syndicationUserStatusTypes.INPUT_COMPLETE}>
        {syndicationUserStatusTypes.INPUT_COMPLETE}
    </SyndicationBadge>
    <SyndicationBadge status={syndicationUserStatusTypes.PAYMENT_PENDING}>
        {syndicationUserStatusTypes.PAYMENT_PENDING}
    </SyndicationBadge>
    <SyndicationBadge status={syndicationUserStatusTypes.PAYMENT_RECEIVED}>
        {syndicationUserStatusTypes.PAYMENT_RECEIVED}
    </SyndicationBadge>
    <SyndicationBadge color="darkRed">custom color!</SyndicationBadge>
</div>;
```
