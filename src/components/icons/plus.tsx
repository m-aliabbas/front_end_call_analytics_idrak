

import React from "react";
const PlusIcon = ({
  color = "black",
  width = "17",
  height = "17",
  style = {},
  ...props
}) => {
  return (
    <svg
      {...props.props}
      width={width}
      height={height}
      style={style}
      viewBox={`0 0 ${width} ${height}`}
      fill={color}
    >
     <path d="M16.9175 8.22876C16.9175 8.40557 16.8472 8.57514 16.7222 8.70016C16.5972 8.82519 16.4276 8.89543 16.2508 8.89543H9.58415V15.5621C9.58415 15.7389 9.51391 15.9085 9.38889 16.0335C9.26386 16.1585 9.09429 16.2288 8.91748 16.2288C8.74067 16.2288 8.5711 16.1585 8.44608 16.0335C8.32105 15.9085 8.25081 15.7389 8.25081 15.5621V8.89543H1.58415C1.40734 8.89543 1.23777 8.82519 1.11274 8.70016C0.987718 8.57514 0.91748 8.40557 0.91748 8.22876C0.91748 8.05195 0.987718 7.88238 1.11274 7.75736C1.23777 7.63233 1.40734 7.56209 1.58415 7.56209H8.25081V0.895426C8.25081 0.718615 8.32105 0.549046 8.44608 0.424022C8.5711 0.298998 8.74067 0.22876 8.91748 0.22876C9.09429 0.22876 9.26386 0.298998 9.38889 0.424022C9.51391 0.549046 9.58415 0.718615 9.58415 0.895426V7.56209H16.2508C16.4276 7.56209 16.5972 7.63233 16.7222 7.75736C16.8472 7.88238 16.9175 8.05195 16.9175 8.22876Z"/>
    </svg>
  );
};

export default PlusIcon;