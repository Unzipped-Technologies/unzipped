import React from 'react'

const ColorPhone = ({width, height, color="white"}) => {
    return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M28 22.1304C28 22.512 27.9339 22.8935 27.8016 23.5294C27.668 24.0382 27.5294 24.5469 27.3832 24.8013C27.1046 25.5644 26.2957 26.2003 24.9577 26.9634C23.7113 27.5993 22.4776 27.9809 21.2579 27.9809H20.2048C19.8728 27.8537 19.4951 27.7265 19.0703 27.7265C18.6467 27.5993 18.3288 27.4722 18.1164 27.345C17.918 27.345 17.5529 27.2177 17.0226 26.9634C16.4922 26.709 16.1679 26.7091 16.0483 26.5819C14.7485 26.2004 13.5886 25.5644 12.5685 24.9284C10.8711 23.9109 9.11453 22.5118 7.29819 20.7312C5.4952 18.8234 4.07008 17.0429 3.0227 15.3895C2.38639 14.372 1.83618 13.2274 1.37221 11.9555C1.3324 11.8283 1.2131 11.4467 1.01418 10.938C0.81539 10.4292 0.676121 10.0476 0.59663 9.79326C0.530239 9.66608 0.43752 9.28458 0.318219 8.90302C0.198919 8.52146 0.112687 8.13987 0.0596503 7.75832C0.0198411 7.37676 0 7.12232 0 6.74077C0 5.46891 0.33806 4.19717 1.01418 3.0525C1.75657 1.65345 2.45927 0.890333 3.12216 0.508775C3.45361 0.381589 3.90436 0.254341 4.4744 0.127155C5.05768 -3.10532e-05 5.52839 0 5.8863 0H6.30397C6.54258 0.127186 6.89386 0.635868 7.35797 1.52617C7.50372 1.78054 7.70264 2.16216 7.95447 2.54372C8.20642 3.05246 8.43841 3.43402 8.65056 3.81558C8.86258 4.19714 9.06811 4.57873 9.26703 4.96029C9.30671 4.96029 9.4194 5.08735 9.60509 5.46891C9.80388 5.72328 9.94976 5.97765 10.0426 6.10484C10.1353 6.35921 10.1817 6.48639 10.1817 6.74077C10.1817 6.99514 9.98957 7.24957 9.60509 7.75832C9.23383 8.13987 8.82289 8.52149 8.37215 8.77587C7.93463 9.15742 7.52356 9.4117 7.13921 9.79326C6.76795 10.1748 6.58238 10.5564 6.58238 10.8108C6.58238 10.938 6.61545 11.0651 6.68172 11.1923C6.74811 11.4466 6.80115 11.5739 6.84083 11.5739C6.89386 11.7011 6.98671 11.8283 7.11924 12.0827C7.26512 12.337 7.34461 12.4641 7.35797 12.4641C8.36553 14.2447 9.51886 15.8983 10.8181 17.1701C12.117 18.442 13.675 19.5866 15.4913 20.6041C15.518 20.6041 15.6439 20.7314 15.869 20.8585C16.0941 20.9857 16.2531 21.1128 16.3459 21.1128C16.4388 21.1128 16.5723 21.24 16.744 21.24C16.9297 21.3672 17.0824 21.3672 17.2019 21.3672C17.4397 21.3672 17.745 21.2401 18.1164 20.8585C18.4878 20.477 18.8388 20.0954 19.1707 19.5867C19.5014 19.2051 19.8665 18.6964 20.2645 18.3148C20.6614 17.9333 20.9933 17.806 21.2579 17.806C21.4436 17.806 21.6293 17.806 21.8149 17.9332C22.0146 18.0604 22.2525 18.1876 22.531 18.3148C22.8095 18.5692 22.9749 18.6963 23.0283 18.6963C23.3603 18.9507 23.7113 19.0778 24.0827 19.3322C24.4668 19.5866 24.8903 19.7138 25.3545 19.9681C25.8188 20.2225 26.1774 20.4769 26.4293 20.6041C27.3564 21.1128 27.8601 21.4944 27.9402 21.6216C27.9797 21.7488 28 21.876 28 22.1304Z" fill="#E74C3C"/>
        <path d="M0.278283 4.76953C0.0934817 5.41513 0 6.07878 0 6.717C0 7.07567 0.039682 7.40559 0.0794913 7.75052C0.132528 8.08222 0.198665 8.47802 0.317965 8.90308C0.437266 9.3275 0.529857 9.64444 0.596248 9.85697C0.675739 10.0559 0.834468 10.4388 1.03339 10.9699C1.23231 11.5002 1.35135 11.8042 1.39116 11.9237C1.85514 13.2249 2.38436 14.3988 3.02067 15.4214C4.06805 17.1206 5.51021 18.849 7.3132 20.6678C9.12941 22.4726 10.8627 23.911 12.5596 24.9603C13.5809 25.5975 14.7574 26.1648 16.0572 26.6303C16.1768 26.6697 16.4808 26.788 17.0111 26.9877C17.5415 27.1861 17.9256 27.3056 18.124 27.3845C18.3364 27.4506 18.6531 27.5435 19.0779 27.663C19.5027 27.7826 19.8588 27.8881 20.1908 27.9416C20.5355 27.981 20.9056 27.981 21.2642 27.981C22.4839 27.981 23.7138 27.6643 24.9603 26.9877C26.2995 26.2436 27.1059 25.5441 27.3844 24.8802C27.5307 24.5495 27.649 24.1005 27.7825 23.5295C27.9148 22.9457 27.9809 22.456 27.9809 22.0986C27.9809 21.9129 27.9809 21.754 27.9415 21.6611C27.8944 21.5199 27.6528 21.3266 27.3056 21.1053C26.9838 21.7336 26.2207 22.3924 24.9603 23.0919C23.7138 23.7686 22.4839 24.126 21.2642 24.126C20.9056 24.126 20.5355 24.0865 20.1908 24.0458C19.8588 23.9924 19.5027 23.9276 19.0779 23.808C18.6531 23.6885 18.3364 23.5956 18.124 23.5295C17.9256 23.4493 17.5415 23.2916 17.0111 23.0919C16.4808 22.8935 16.1768 22.774 16.0572 22.7346C14.7574 22.2703 13.5809 21.7425 12.5596 21.1053C10.8627 20.056 9.12941 18.6175 7.3132 16.8128C5.51021 14.994 4.06805 13.2249 3.02067 11.5257C2.38436 10.5041 1.85514 9.36934 1.39116 8.06848C1.35135 7.94893 1.23231 7.60565 1.03339 7.07478C0.834468 6.54378 0.675739 6.20063 0.596248 6.00171C0.529857 5.78905 0.437266 5.47211 0.317965 5.04781C0.289475 4.94657 0.30283 4.86556 0.278283 4.76953Z" fill="#C0392B"/>
        </svg>
    )
}

export default ColorPhone

