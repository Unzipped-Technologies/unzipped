import Document, { Html, Head, Main, NextScript } from 'next/document'

import { GA_TRACKING_ID } from '../lib/gtag'
// import Pixel from '../components/Pixel'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* <!-- link manifest.json --> */}
          <link rel="manifest" href="/manifest.json" />
          {/* <!-- this sets the color of url bar  --> */}
          <meta name="theme-color" content="#90cdf4" />
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <link rel="apple-touch-icon" href="/logo-96x96.png" />
          {/* <!-- this sets the color of url bar in Apple smatphones --> */}
          <meta name="apple-mobile-web-app-status-bar" content="#90cdf4" />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          <script dangerouslySetInnerHTML={{ __html: `!function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '384791752906464');
            fbq('track', 'PageView');` }}
          />
          <noscript dangerouslySetInnerHTML={{ 
            __html: `<img height="1" 
              width="1" 
              style="display:none" 
              alt=""
              src="https://www.facebook.com/tr?id=384791752906464&ev=PageView&noscript=1" />` 
            }}
          />
          {/* <Pixel name='FACEBOOK_PIXEL_1' /> */}
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
        </Head>
        <body >
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}