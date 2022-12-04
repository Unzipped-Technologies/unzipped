Download processing

```jsx
import {BULK_DOWNLOAD_READY, BULK_DOWNLOAD_PROCESSING, BULK_DOWNLOAD_COMPLETE} from 'components/ui/DownloadToasts';
<>
    <DownloadToasts successBanner={BULK_DOWNLOAD_PROCESSING} />
    <br />
    <DownloadToasts
        successBanner={BULK_DOWNLOAD_COMPLETE}
        downloadBulk={() => console.log('Download bulk clicked!')}
        onHide={() => {}}
    />
    <br />
    <DownloadToasts
        successBanner={BULK_DOWNLOAD_READY}
        downloadBulk={() => console.log('Download bulk clicked!')}
        onHide={() => {}}
    />
</>;
```
