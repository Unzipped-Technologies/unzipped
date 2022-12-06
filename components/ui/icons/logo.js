import React from 'react'

const alertDoneIcon = ({width, height, color="#E25050"}) => {
    return (
        <svg width="68" height="96" viewBox="0 0 68 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M46.8171 1.42558C43.9605 5.25667 33.7393 19.8683 33.5607 20.3583C33.4268 20.6701 33.6054 20.9374 33.9178 20.9374C34.2749 20.9374 35.3461 19.8237 36.2834 18.4428C38.1134 15.9481 39.3186 15.2799 41.2378 15.7699C42.3983 16.0817 43.6927 18.0418 43.6927 19.601C43.6927 20.091 42.8893 21.6056 41.9074 22.9421C40.7469 24.5458 40.3005 25.4367 40.613 25.6595C40.9254 25.8376 41.5056 25.4813 41.952 24.9021C43.7374 22.6302 55.744 5.43486 55.744 5.21212C55.744 4.7221 49.2274 5.62522e-05 48.5132 5.62522e-05C48.1562 5.62522e-05 47.3974 0.66827 46.8171 1.42558ZM50.8342 4.90029C51.3252 5.39031 51.7269 6.28126 51.7269 6.90493C51.7269 8.15226 50.1647 9.80052 48.9596 9.80052C47.8437 9.80052 45.9245 7.84043 45.9245 6.68219C45.9245 5.43486 47.4867 4.00934 48.8257 4.00934C49.4506 4.00934 50.3433 4.41027 50.8342 4.90029Z" fill={color}/>
        <path d="M34.3194 14.9679C30.9719 16.3934 29.2758 19.0217 29.2758 22.7192C29.2758 28.6886 34.3194 32.7424 39.9434 31.2278C43.6034 30.2477 45.8797 27.174 45.9244 23.2092V21.2491L44.0944 23.8774C41.9519 26.9067 41.5948 27.2185 40.3451 26.9067C39.7202 26.773 38.9614 27.2185 37.9348 28.2876C36.1048 30.1586 34.498 30.3368 32.8019 28.7331C31.4628 27.4858 31.2843 25.8375 32.3109 23.8774C32.7572 23.0756 32.8911 22.051 32.7126 21.1155C32.4894 19.9127 32.7572 19.289 34.3194 17.1508C35.346 15.7698 36.1048 14.567 36.0155 14.4779C35.9709 14.3888 35.1675 14.6115 34.3194 14.9679Z" fill={color}/>
        <path d="M36.0602 20.581C32.4449 25.5258 32.2217 25.9713 33.159 27.3968C33.65 28.1541 34.2749 28.5105 35.2122 28.5105C36.3727 28.5105 36.8637 27.9759 39.4525 24.4121C42.5322 20.0019 43.0678 18.22 41.5056 17.3736C39.631 16.3936 38.8276 16.839 36.0602 20.581Z" fill={color}/>
        <path d="M4.41444 35.5044C4.41444 35.9499 3.52175 38.8455 2.45053 41.9638L0.53125 47.6659H3.61102H6.64616V59.1146C6.69079 76.6664 7.44958 82.0121 10.8418 87.3132C11.7345 88.6496 12.4486 89.5851 12.4486 89.3624C12.4486 89.0951 13.0289 89.4961 13.7877 90.2088C14.5018 90.877 14.9928 91.6343 14.8589 91.8125C14.7696 91.9907 15.0821 92.3026 15.6177 92.4362C16.1086 92.6144 16.9567 93.149 17.4477 93.639C17.9387 94.129 18.6082 94.3963 18.9652 94.2626C19.3223 94.129 19.5901 94.2181 19.5901 94.4854C19.5901 94.7527 19.9026 94.8418 20.3043 94.7081C20.7506 94.5299 20.8845 94.619 20.6614 94.9754C20.4382 95.2872 20.6614 95.3763 21.2862 95.2427C21.8218 95.0645 22.2682 95.1536 22.2682 95.3318C22.2682 95.5545 22.8931 95.6436 23.6072 95.5545C24.366 95.4654 24.9463 95.51 24.9463 95.6882C24.9463 95.8664 26.4638 96 28.2938 96C30.1238 96 31.6414 95.8218 31.6414 95.6436C31.6414 95.4209 32.0431 95.4209 32.5341 95.5545C33.0697 95.7327 33.7392 95.6436 34.007 95.3763C34.3195 95.1536 34.989 94.9754 35.4353 95.0645C36.5958 95.2427 38.7829 94.4854 38.7829 93.9063C38.7829 93.6835 39.0061 93.639 39.2293 93.7726C39.8095 94.129 43.9605 91.4116 45.4781 89.7188C46.2815 88.8278 46.3261 88.6496 45.7012 89.0951C44.8086 89.7633 44.8086 89.7188 45.6566 88.7387C47.0849 87.0905 47.7991 88.2042 47.6205 91.7234L47.4866 94.6636H52.5303C55.253 94.6636 57.5294 94.5299 57.5294 94.3517C57.5294 94.1735 57.8418 94.129 58.1989 94.2626C58.5559 94.4408 58.8684 94.3072 58.8684 93.9954C58.8684 93.7281 59.0916 93.639 59.3594 93.7726C59.9842 94.1735 63.0194 92.1244 64.3584 90.3425C65.876 88.3378 67.0365 85.665 66.6794 85.1304C66.5455 84.8631 66.6348 84.6404 66.9026 84.6404C67.215 84.6404 67.3043 77.7355 67.2596 61.6984C67.1704 49.0914 67.2596 38.7564 67.3936 38.7564C67.5275 38.7564 67.6614 37.8654 67.6614 36.7517V34.7471H55.8779H44.139V36.0835C44.139 37.3308 44.0498 37.4199 42.3537 37.4199C40.6129 37.4199 40.5683 37.4645 40.5683 38.9791V40.5383H37.801C36.2388 40.5383 33.9178 40.6719 32.668 40.8056C30.0792 41.1174 29.499 40.6274 30.0346 38.5336C30.3024 37.4645 30.5256 37.4199 33.5607 37.3308C35.3014 37.3308 36.1049 37.1972 35.3461 37.1081C34.1409 36.9299 33.8731 36.7072 33.8731 35.8162V34.7471H19.1438C5.3964 34.7471 4.41444 34.7916 4.41444 35.5044ZM44.5854 42.5429C44.5854 44.1021 44.5854 44.1021 42.5768 44.1021H40.5683V45.8394C40.5683 47.6213 40.5683 47.6213 42.4876 47.755C44.3176 47.8886 44.3622 47.9332 44.3622 49.4478C44.3622 50.9624 44.3176 51.0069 42.4876 51.1406C40.6129 51.2742 40.5683 51.3188 40.5683 52.8334V54.348H35.2122H29.856V52.7889C29.856 51.2297 29.856 51.2297 31.7753 51.2297C33.6946 51.2297 33.6946 51.2297 33.5161 49.8487C33.3822 48.9578 33.5161 48.3341 33.9178 48.0668C34.3195 47.7995 33.6946 47.6659 32.2217 47.6659H29.856V45.884V44.1021H31.8199C33.5607 44.1021 33.7839 44.013 33.5607 43.2111C33.0251 41.1619 33.5161 40.9837 39.2293 40.9837H44.5854V42.5429ZM44.4961 56.219L44.63 57.9118H42.4876H40.3005L40.479 59.3819L40.6576 60.8965L35.6139 61.1638C32.8465 61.2974 30.4363 61.342 30.2131 61.2083C30.0346 61.0747 29.856 60.2728 29.856 59.4264C29.856 57.9564 29.9007 57.9118 31.7753 57.9118H33.6946L33.5161 56.3527L33.3375 54.838L37.0422 54.6598C39.0954 54.5708 41.5949 54.5262 42.5768 54.5262C44.3176 54.5708 44.3622 54.6153 44.4961 56.219ZM44.5854 63.0348C44.5854 64.594 44.5407 64.594 42.6661 64.594H40.7468L40.7915 66.3759V68.1578H42.7107H44.63L44.3176 70.2515C43.9605 72.8353 42.5322 75.5527 40.97 76.7554C39.0954 78.0919 36.2388 78.181 34.0963 76.9782C32.3556 75.9536 30.3024 73.4589 30.3024 72.3452C30.3024 71.9443 30.8826 71.7216 31.9985 71.7216C33.65 71.7216 33.65 71.7216 33.65 69.9397V68.1578H31.7753H29.856V66.3759V64.594H31.8646C33.8731 64.594 33.8731 64.594 33.8731 63.0348V61.4756H39.2293H44.5854V63.0348Z" fill={color}/>
        <path d="M36.0156 47.9779C36.7744 48.067 38.1134 48.067 38.9168 47.9779C39.6756 47.8888 39.0507 47.7997 37.4439 47.7997C35.8371 47.7997 35.2122 47.8888 36.0156 47.9779Z" fill={color}/>
        <path d="M40.5683 73.2806V74.8398H36.4619H32.3109L33.6499 75.7307C35.7478 77.1117 37.5331 77.2899 39.8541 76.2208C40.97 75.7307 41.9073 75.2407 41.9073 75.1516C41.9073 75.018 42.2197 74.2161 42.5768 73.3252L43.2463 71.7215H41.9073C40.6575 71.7215 40.5683 71.8551 40.5683 73.2806Z" fill={color}/>
        <path d="M12.8949 90.1643C12.8949 90.2534 13.252 90.6098 13.6983 90.9216C14.3678 91.5007 14.4125 91.4562 13.8322 90.7434C13.252 90.0306 12.8949 89.8079 12.8949 90.1643Z" fill={color}/>
        </svg>
    )
}

export default alertDoneIcon

