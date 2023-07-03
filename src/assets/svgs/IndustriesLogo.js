import * as React from "react";
import Svg, { Defs, Pattern, Image, G, Rect } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */ const IndustriesLogo =
  (props) => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={130}
      height={130}
      viewBox="0 0 265 264"
      {...props}
    >
      <Defs>
        <Pattern
          id="pattern"
          preserveAspectRatio="none"
          width="100%"
          height="100%"
          viewBox="0 0 1280 1279"
        >
          <Image
            width={1280}
            height={1279}
          />
        </Pattern>
      </Defs>
      <G
        transform="matrix(1, 0, 0, 1, 0, 0)"
        filter="url(#Industries_commerce)"
      >
        <Rect
          id="Industries_commerce-2"
          data-name="Industries commerce"
          width={250}
          height={249}
          rx={114}
          transform="translate(6.5 4.5)"
          fill="url(#pattern)"
        />
      </G>
    </Svg>
  );
export default IndustriesLogo;