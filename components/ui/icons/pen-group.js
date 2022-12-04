import React from 'react'

const alertDoneIcon = ({width, height, color="#E25050"}) => {
    return (
        <svg width="88" height="82" viewBox="0 0 88 82" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_11167_138024)">
        <path d="M86.9556 31.4478L73.0395 8.45603C72.9378 8.28915 72.7949 8.15123 72.6245 8.05554C72.4541 7.95984 72.2619 7.90958 72.0665 7.90958C71.871 7.90958 71.6789 7.95984 71.5085 8.05554C71.3381 8.15123 71.1952 8.28915 71.0935 8.45603L57.1774 31.4478C57.085 31.6038 57.0311 31.7796 57.0203 31.9606C57.0095 32.1417 57.0421 32.3226 57.1153 32.4885L62.2926 43.9243C61.106 44.4622 60.14 45.391 59.5558 46.5555C58.9717 47.72 58.8049 49.0496 59.0832 50.3223C59.3616 51.595 60.0683 52.7337 61.0852 53.548C62.1021 54.3624 63.3676 54.8031 64.6704 54.7966H79.4626C80.7565 54.7918 82.01 54.3461 83.0165 53.5332C84.0231 52.7203 84.7225 51.5886 84.9995 50.3247C85.2764 49.0609 85.1144 47.7404 84.5402 46.581C83.9659 45.4216 83.0136 44.4926 81.8404 43.9471L87.0176 32.4885C87.0909 32.3226 87.1234 32.1417 87.1127 31.9606C87.1019 31.7796 87.048 31.6038 86.9556 31.4478ZM72.0659 28.4546C72.5081 28.4536 72.9407 28.5838 73.309 28.8287C73.6772 29.0735 73.9646 29.4221 74.1348 29.8303C74.3049 30.2385 74.3502 30.6879 74.2649 31.1219C74.1796 31.5558 73.9676 31.9547 73.6556 32.2681C73.3436 32.5815 72.9456 32.7954 72.5121 32.8827C72.0786 32.9699 71.6289 32.9267 71.2199 32.7583C70.811 32.59 70.4611 32.3042 70.2146 31.9371C69.968 31.5699 69.8359 31.1379 69.8349 30.6957V30.6843C69.8366 30.0933 70.0722 29.5269 70.4903 29.1091C70.9083 28.6913 71.4748 28.456 72.0659 28.4546ZM82.8761 49.1078C82.8761 49.5568 82.7877 50.0013 82.6159 50.4161C82.4441 50.8308 82.1923 51.2077 81.8749 51.5251C81.5574 51.8426 81.1805 52.0944 80.7658 52.2662C80.351 52.438 79.9065 52.5264 79.4576 52.5264H64.6704C63.7972 52.4788 62.9754 52.0984 62.3742 51.4635C61.7729 50.8286 61.4378 49.9874 61.4378 49.1129C61.4378 48.2384 61.7729 47.3972 62.3742 46.7623C62.9754 46.1274 63.7972 45.747 64.6704 45.6994H79.4626C80.3667 45.7007 81.2334 46.0601 81.8731 46.6989C82.5128 47.3376 82.8734 48.2038 82.8761 49.1078ZM79.5766 43.4191H64.5564L59.4361 32.1087L70.9289 13.1458V26.3275C69.8671 26.6046 68.9427 27.2591 68.3287 28.1685C67.7146 29.0779 67.4529 30.1798 67.5926 31.2682C67.7323 32.3566 68.2638 33.3568 69.0876 34.0816C69.9114 34.8065 70.9711 35.2063 72.0684 35.2063C73.1657 35.2063 74.2254 34.8065 75.0492 34.0816C75.873 33.3568 76.4045 32.3566 76.5442 31.2682C76.6839 30.1798 76.4222 29.0779 75.8081 28.1685C75.194 27.2591 74.2697 26.6046 73.2079 26.3275V13.1445L84.7006 32.1138L79.5766 43.4191Z" fill="currentColor" stroke="currentColor" stroke-width="0.5"/>
        <path d="M30.2645 31.4478L16.3484 8.45603C16.2466 8.28915 16.1037 8.15123 15.9333 8.05554C15.7629 7.95984 15.5707 7.90958 15.3753 7.90958C15.1799 7.90958 14.9878 7.95984 14.8174 8.05554C14.647 8.15123 14.504 8.28915 14.4023 8.45603L0.486199 31.4478C0.393793 31.6038 0.339959 31.7796 0.329168 31.9606C0.318378 32.1417 0.350929 32.3226 0.424144 32.4885L5.6014 43.9243C4.41485 44.4622 3.4488 45.391 2.86469 46.5555C2.28057 47.72 2.11374 49.0496 2.39209 50.3223C2.67043 51.595 3.3771 52.7337 4.39399 53.548C5.41089 54.3624 6.67642 54.8031 7.97919 54.7966H22.7715C24.0653 54.7918 25.3188 54.3461 26.3254 53.5332C27.3319 52.7203 28.0313 51.5886 28.3083 50.3247C28.5853 49.0609 28.4233 47.7404 27.849 46.581C27.2747 45.4216 26.3225 44.4926 25.1493 43.9471L30.3265 32.4885C30.3997 32.3226 30.4323 32.1417 30.4215 31.9606C30.4107 31.7796 30.3569 31.6038 30.2645 31.4478ZM15.3747 28.4546C15.8169 28.4536 16.2495 28.5838 16.6178 28.8287C16.9861 29.0735 17.2734 29.4221 17.4436 29.8303C17.6138 30.2385 17.6591 30.6879 17.5738 31.1219C17.4885 31.5558 17.2764 31.9547 16.9644 32.2681C16.6524 32.5815 16.2545 32.7954 15.8209 32.8827C15.3874 32.9699 14.9377 32.9267 14.5288 32.7583C14.1198 32.59 13.7699 32.3042 13.5234 31.9371C13.2769 31.5699 13.1448 31.1379 13.1438 30.6957V30.6843C13.1454 30.0933 13.381 29.5269 13.7991 29.1091C14.2171 28.6913 14.7836 28.456 15.3747 28.4546ZM26.1849 49.1078C26.1849 49.5568 26.0965 50.0013 25.9247 50.4161C25.7529 50.8308 25.5011 51.2077 25.1837 51.5251C24.8662 51.8426 24.4894 52.0944 24.0746 52.2662C23.6599 52.438 23.2153 52.5264 22.7664 52.5264H7.97919C7.10603 52.4788 6.28428 52.0984 5.683 51.4635C5.08173 50.8286 4.74665 49.9874 4.74665 49.1129C4.74665 48.2384 5.08173 47.3972 5.683 46.7623C6.28428 46.1274 7.10603 45.747 7.97919 45.6994H22.7715C23.6755 45.7007 24.5422 46.0601 25.1819 46.6989C25.8216 47.3376 26.1823 48.2038 26.1849 49.1078ZM22.8854 43.4191H7.86524L2.74498 32.1087L14.2377 13.1458V26.3275C13.1759 26.6046 12.2516 27.2591 11.6375 28.1685C11.0234 29.0779 10.7617 30.1798 10.9014 31.2682C11.0411 32.3566 11.5726 33.3568 12.3964 34.0816C13.2202 34.8065 14.2799 35.2063 15.3772 35.2063C16.4745 35.2063 17.5342 34.8065 18.358 34.0816C19.1819 33.3568 19.7133 32.3566 19.853 31.2682C19.9927 30.1798 19.731 29.0779 19.117 28.1685C18.5029 27.2591 17.5785 26.6046 16.5168 26.3275V13.1445L28.0095 32.1138L22.8854 43.4191Z" fill="currentColor" stroke="currentColor" stroke-width="0.5"/>
        <path d="M32.6736 28.268L24.3646 43.0635L32.1444 60.1983C32.1444 60.1983 55.7605 61.2462 55.8795 60.9031C55.9986 60.56 64.2133 42.2919 64.2133 42.2919L44.2098 10.3838L32.6736 28.268Z" fill="none"/>
        <path d="M67.7919 41.1636L45.5699 0.957433C45.4604 0.739301 45.3061 0.546804 45.1169 0.392593C44.9278 0.238382 44.7081 0.125952 44.4724 0.0626887C44.2367 -0.000574169 43.9902 -0.0132364 43.7493 0.0255357C43.5083 0.0643078 43.2783 0.153636 43.0744 0.287648C42.8199 0.458778 42.6102 0.688467 42.4628 0.957433L20.2409 41.1636C20.0926 41.4414 20.0067 41.7483 19.9895 42.0628C19.9722 42.3773 20.0238 42.6918 20.1408 42.9843L28.4087 62.9892C26.1516 64.228 24.4371 66.2632 23.5995 68.6978C22.7619 71.1324 22.8613 73.7918 23.8785 76.157C24.5236 77.852 25.6616 79.3149 27.1459 80.3571C28.6301 81.3992 30.3925 81.9729 32.2058 82.004H55.8269C60.8446 81.9863 64.8988 77.5181 64.8836 72.0231C64.9118 70.1872 64.4365 68.3786 63.5092 66.7938C62.582 65.209 61.2383 63.9085 59.624 63.0335L67.8919 42.9944C68.011 42.7007 68.0639 42.3843 68.0466 42.0678C68.0293 41.7513 67.9423 41.4425 67.7919 41.1636ZM44.0139 35.9268C44.8015 35.8536 45.5929 36.0201 46.2843 36.4045C46.9758 36.7889 47.5349 37.3732 47.8884 38.0809C48.242 38.7886 48.3734 39.5866 48.2655 40.3703C48.1577 41.1539 47.8155 41.8867 47.2839 42.4726C46.7523 43.0584 46.0561 43.47 45.2865 43.6532C44.517 43.8365 43.71 43.783 42.9714 43.4996C42.2328 43.2163 41.597 42.7164 41.1475 42.0654C40.698 41.4145 40.4556 40.6429 40.4522 39.8518V39.8316C40.4109 38.8426 40.762 37.8773 41.4291 37.1459C42.0962 36.4146 43.0252 35.9764 44.0139 35.9268ZM61.2751 72.0446C61.3408 73.5582 60.8041 75.0363 59.7825 76.1551C58.761 77.274 57.3377 77.9425 55.8244 78.0144H32.2058C30.7174 77.8772 29.334 77.1889 28.3268 76.0845C27.3195 74.9801 26.7611 73.5393 26.7611 72.0446C26.7611 70.5499 27.3195 69.1091 28.3268 68.0047C29.334 66.9003 30.7174 66.212 32.2058 66.0748H55.8269C57.3412 66.1464 58.7653 66.8153 59.7872 67.935C60.8092 69.0547 61.3456 70.5339 61.2789 72.0484L61.2751 72.0446ZM56.0054 62.0953H32.0248L23.8481 42.3145L42.2007 9.15186V32.2095C40.2794 32.8578 38.6772 34.2135 37.7197 36.001C36.7622 37.7884 36.5214 39.8734 37.0463 41.8321C37.2253 42.794 37.5992 43.7092 38.1451 44.5212C38.691 45.3332 39.3974 46.0249 40.2206 46.5538C41.0438 47.0826 41.9665 47.4374 42.932 47.5963C43.8975 47.7552 44.8853 47.7149 45.8345 47.4778C47.7548 46.8279 49.3559 45.4719 50.3131 43.6849C51.2703 41.8979 51.512 39.8138 50.989 37.8552C50.7073 36.5419 50.0815 35.3271 49.1757 34.3353C48.27 33.3435 47.1169 32.6102 45.8345 32.2107V9.15566L64.1872 42.3284L56.0054 62.0953Z" fill="none"/>
        <path d="M65.4633 41.8127L45.4178 8.69944C45.2719 8.45833 45.0662 8.25894 44.8206 8.12055C44.5751 7.98216 44.298 7.90945 44.0162 7.90945C43.7343 7.90945 43.4573 7.98216 43.2117 8.12055C42.9662 8.25894 42.7605 8.45833 42.6146 8.69944L22.564 41.8127C22.4312 42.0375 22.3538 42.2907 22.3382 42.5514C22.3225 42.8121 22.3692 43.0727 22.4742 43.3118L29.9317 59.7842C28.2221 60.5588 26.8301 61.8967 25.9885 63.5743C25.1468 65.2519 24.9065 67.1675 25.3076 69.001C25.7087 70.8346 26.727 72.4749 28.1923 73.6478C29.6575 74.8207 31.481 75.4551 33.3578 75.445H54.6656C56.5296 75.4387 58.3357 74.7972 59.7859 73.6263C61.2362 72.4554 62.2441 70.8252 62.6433 69.0045C63.0424 67.1838 62.809 65.2814 61.9816 63.6112C61.1542 61.941 59.7821 60.6027 58.0918 59.8171L65.5494 43.3118C65.6557 43.0732 65.7033 42.8126 65.6883 42.5518C65.6733 42.291 65.5962 42.0376 65.4633 41.8127ZM44.0162 37.5078C44.6533 37.5061 45.2766 37.6933 45.8073 38.0458C46.338 38.3984 46.7522 38.9004 46.9976 39.4883C47.243 40.0763 47.3085 40.7238 47.1858 41.349C47.0632 41.9742 46.7578 42.549 46.3085 43.0007C45.8591 43.4523 45.2859 43.7606 44.6614 43.8864C44.0368 44.0123 43.3889 43.9501 42.7997 43.7077C42.2105 43.4654 41.7064 43.0537 41.3512 42.5248C40.9959 41.9959 40.8055 41.3736 40.804 40.7365V40.72C40.8063 39.8688 41.1455 39.0531 41.7474 38.4512C42.3493 37.8493 43.165 37.5102 44.0162 37.5078ZM59.5897 67.262C59.5897 68.5663 59.0715 69.8171 58.1493 70.7393C57.2271 71.6616 55.9762 72.1797 54.672 72.1797H33.3629C32.7105 72.1901 32.0626 72.0707 31.4569 71.8283C30.8512 71.5859 30.2997 71.2254 29.8347 70.7677C29.3697 70.3101 29.0004 69.7645 28.7483 69.1628C28.4962 68.561 28.3663 67.9151 28.3663 67.2626C28.3663 66.6102 28.4962 65.9643 28.7483 65.3625C29.0004 64.7608 29.3697 64.2152 29.8347 63.7575C30.2997 63.2999 30.8512 62.9394 31.4569 62.697C32.0626 62.4546 32.7105 62.3351 33.3629 62.3456H54.6707C55.9733 62.3456 57.2227 62.8625 58.1445 63.7829C59.0663 64.7033 59.5851 65.9518 59.5871 67.2544L59.5897 67.262ZM54.8366 59.0663H33.1996L25.8244 42.7737L42.3791 15.4593V34.4514C40.8496 34.85 39.5178 35.7923 38.6329 37.102C37.7481 38.4116 37.3708 39.9988 37.5717 41.5666C37.7727 43.1343 38.538 44.5751 39.7246 45.6193C40.9111 46.6635 42.4375 47.2395 44.0181 47.2395C45.5987 47.2395 47.125 46.6635 48.3116 45.6193C49.4981 44.5751 50.2635 43.1343 50.4644 41.5666C50.6654 39.9988 50.2881 38.4116 49.4032 37.102C48.5184 35.7923 47.1866 34.85 45.6571 34.4514V15.4593L62.2118 42.7825L54.8366 59.0663Z" fill="currentColor"/>
        </g>
        <defs>
        <clipPath id="clip0_11167_138024">
        <rect width="87.4418" height="82" fill="white"/>
        </clipPath>
        </defs>
        </svg>
    )
}

export default alertDoneIcon
