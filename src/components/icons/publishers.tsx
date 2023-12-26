import React from "react";

const PublishersIcon = ({ color = "#E01E26", width = "28", height = "23" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 28 23"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
<path d="M27.6239 12.8752C27.5259 12.9544 27.4143 13.0121 27.2956 13.0449C27.1769 13.0777 27.0533 13.0849 26.932 13.0662C26.8107 13.0476 26.6939 13.0033 26.5885 12.936C26.483 12.8687 26.3909 12.7797 26.3174 12.674C25.7549 11.859 25.0227 11.1977 24.1799 10.7434C23.337 10.2892 22.407 10.0545 21.4646 10.0585C21.2811 10.0585 21.1016 10.0001 20.9487 9.89076C20.7958 9.78139 20.6762 9.62585 20.6049 9.4436C20.5564 9.31983 20.5315 9.18686 20.5315 9.05253C20.5315 8.9182 20.5564 8.78523 20.6049 8.66146C20.6762 8.47921 20.7958 8.32367 20.9487 8.2143C21.1016 8.10493 21.2811 8.04659 21.4646 8.04657C21.9882 8.04652 22.5013 7.88818 22.9457 7.58954C23.39 7.2909 23.7477 6.86393 23.9782 6.35712C24.2087 5.85031 24.3027 5.28398 24.2496 4.72247C24.1965 4.16095 23.9983 3.62674 23.6776 3.18053C23.357 2.73433 22.9266 2.394 22.4355 2.19821C21.9444 2.00242 21.4122 1.95902 20.8993 2.07293C20.3865 2.18684 19.9135 2.4535 19.5342 2.84262C19.1549 3.23174 18.8845 3.72772 18.7536 4.27423C18.7229 4.40221 18.6692 4.52243 18.5955 4.62802C18.5217 4.73362 18.4294 4.82252 18.3238 4.88966C18.2182 4.9568 18.1013 5.00086 17.9799 5.01932C17.8585 5.03779 17.7349 5.03029 17.6162 4.99726C17.4975 4.96424 17.386 4.90633 17.288 4.82684C17.19 4.74736 17.1075 4.64785 17.0453 4.534C16.983 4.42016 16.9421 4.2942 16.925 4.16333C16.9079 4.03246 16.9148 3.89923 16.9454 3.77125C17.1271 3.01341 17.4704 2.31173 17.948 1.72206C18.4255 1.13238 19.0241 0.670985 19.6962 0.374577C20.3683 0.0781688 21.0952 -0.0450684 21.8193 0.014671C22.5433 0.0744105 23.2444 0.315478 23.8668 0.718692C24.4892 1.12191 25.0157 1.67614 25.4044 2.33729C25.7931 2.99843 26.0334 3.74825 26.1059 4.52708C26.1785 5.3059 26.0815 6.09224 25.8225 6.82352C25.5635 7.55479 25.1498 8.21083 24.6142 8.73943C25.8832 9.33168 26.9863 10.2715 27.814 11.4656C27.8876 11.5715 27.941 11.6921 27.9712 11.8203C28.0015 11.9485 28.008 12.082 27.9903 12.2129C27.9726 12.3438 27.9312 12.4697 27.8683 12.5834C27.8054 12.697 27.7224 12.7962 27.6239 12.8752ZM21.3386 20.621C21.4061 20.7355 21.4515 20.8636 21.4719 20.9974C21.4923 21.1313 21.4874 21.2683 21.4575 21.4C21.4275 21.5318 21.3732 21.6557 21.2977 21.7642C21.2221 21.8728 21.127 21.9637 21.0181 22.0316C20.9091 22.0995 20.7885 22.143 20.6636 22.1593C20.5386 22.1757 20.4119 22.1646 20.291 22.1268C20.1702 22.089 20.0576 22.0253 19.9602 21.9394C19.8628 21.8535 19.7825 21.7472 19.7241 21.627C19.1362 20.554 18.299 19.6647 17.295 19.047C16.2909 18.4292 15.1548 18.1043 13.9988 18.1043C12.8427 18.1043 11.7066 18.4292 10.7026 19.047C9.69856 19.6647 8.8613 20.554 8.27342 21.627C8.21508 21.7472 8.13478 21.8535 8.03736 21.9394C7.93994 22.0253 7.8274 22.089 7.70652 22.1268C7.58564 22.1646 7.45892 22.1757 7.33397 22.1593C7.20903 22.143 7.08844 22.0995 6.97947 22.0316C6.8705 21.9637 6.7754 21.8728 6.69989 21.7642C6.62438 21.6557 6.57001 21.5318 6.54007 21.4C6.51013 21.2683 6.50522 21.1313 6.52565 20.9974C6.54607 20.8636 6.59141 20.7355 6.65894 20.621C7.5637 18.9453 8.94324 17.6266 10.5948 16.8588C9.66548 16.0918 8.98247 15.0301 8.64181 13.8231C8.30115 12.616 8.31997 11.3242 8.69561 10.1293C9.07125 8.93435 9.78483 7.89635 10.7361 7.16117C11.6873 6.426 12.8283 6.03063 13.9988 6.03063C15.1692 6.03063 16.3103 6.426 17.2615 7.16117C18.2127 7.89635 18.9263 8.93435 19.3019 10.1293C19.6776 11.3242 19.6964 12.616 19.3557 13.8231C19.0151 15.0301 18.3321 16.0918 17.4027 16.8588C19.0543 17.6266 20.4339 18.9453 21.3386 20.621ZM13.9988 16.0942C14.7371 16.0942 15.4588 15.8582 16.0727 15.4161C16.6865 14.9739 17.165 14.3455 17.4475 13.6103C17.7301 12.875 17.804 12.0659 17.66 11.2854C17.5159 10.5048 17.1604 9.78787 16.6383 9.22513C16.1163 8.66238 15.4511 8.27915 14.727 8.12389C14.0029 7.96863 13.2524 8.04831 12.5703 8.35287C11.8882 8.65742 11.3052 9.17317 10.895 9.83488C10.4848 10.4966 10.2659 11.2746 10.2659 12.0704C10.2659 13.1376 10.6592 14.1611 11.3592 14.9157C12.0593 15.6703 13.0087 16.0942 13.9988 16.0942ZM7.46618 9.05253C7.46618 8.78573 7.36786 8.52986 7.19284 8.34121C7.01783 8.15256 6.78046 8.04657 6.53295 8.04657C6.00933 8.04652 5.49621 7.88818 5.05188 7.58954C4.60755 7.2909 4.24983 6.86393 4.01934 6.35712C3.78885 5.85031 3.69483 5.28398 3.74796 4.72247C3.8011 4.16095 3.99925 3.62674 4.31993 3.18053C4.6406 2.73433 5.07093 2.394 5.56204 2.19821C6.05316 2.00242 6.58536 1.95902 7.09821 2.07293C7.61106 2.18684 8.084 2.4535 8.4633 2.84262C8.84261 3.23174 9.11307 3.72772 9.24398 4.27423C9.30585 4.53269 9.46045 4.75407 9.67375 4.88966C9.88704 5.02526 10.1416 5.06396 10.3813 4.99726C10.6211 4.93057 10.8265 4.76393 10.9523 4.534C11.0781 4.30408 11.114 4.02971 11.0521 3.77125C10.8704 3.01341 10.5271 2.31173 10.0496 1.72206C9.57206 1.13238 8.97344 0.670985 8.30136 0.374577C7.62929 0.0781688 6.90231 -0.0450684 6.17827 0.014671C5.45424 0.0744105 4.75313 0.315478 4.13074 0.718692C3.50834 1.12191 2.98184 1.67614 2.59312 2.33729C2.2044 2.99843 1.9642 3.74825 1.89162 4.52708C1.81904 5.3059 1.9161 6.09224 2.17506 6.82352C2.43402 7.55479 2.84774 8.21083 3.38331 8.73943C2.11561 9.33224 1.01374 10.272 0.187 11.4656C0.0383404 11.679 -0.0255726 11.9474 0.00932086 12.2116C0.0442143 12.4758 0.175056 12.7143 0.373062 12.8745C0.571068 13.0348 0.820019 13.1037 1.06515 13.0661C1.31028 13.0285 1.53151 12.8874 1.68016 12.674C2.24265 11.859 2.9748 11.1977 3.81767 10.7434C4.66055 10.2892 5.5906 10.0545 6.53295 10.0585C6.78046 10.0585 7.01783 9.9525 7.19284 9.76385C7.36786 9.5752 7.46618 9.31933 7.46618 9.05253Z"/>   </svg>
  );
};

export default PublishersIcon;
