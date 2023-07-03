import * as React from "react";
import Svg, {
  Defs,
  ClipPath,
  Circle,
  G,
  Rect,
  Text,
  TSpan,
  Image,
  Path,
} from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */ const Hanif =
  (props) => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={191}
      height={190}
      viewBox="0 0 191 190"
      {...props}
    >
      <Defs>
        <ClipPath id="clip-path">
          <Circle
            id="Ellipse_173"
            data-name="Ellipse 173"
            cx={43}
            cy={43}
            r={43}
            transform="translate(268 596)"
            fill="#fff"
          />
        </ClipPath>
      </Defs>
      <G
        id="Group_16934"
        data-name="Group 16934"
        transform="translate(-10.5 -790.5)"
      >
        <G
          transform="matrix(1, 0, 0, 1, 10.5, 790.5)"
          filter="url(#Rectangle_6220)"
        >
          <Rect
            id="Rectangle_6220-2"
            data-name="Rectangle 6220"
            width={176}
            height={175}
            rx={6}
            transform="translate(7.5 4.5)"
            fill="#fff"
          />
        </G>
        <Text
          id="Graphic_Designer"
          data-name="Graphic Designer"
          transform="translate(47 943)"
          fontSize={14}
          fontFamily="Gontserrat-Light, Montserrat"
          fontWeight={300}
        >
          <TSpan x={0} y={0}>
            {"Graphic Designer"}
          </TSpan>
        </Text>
        <Text
          id="Hafiz_Hanif_Jamal"
          data-name="Hafiz Hanif Jamal"
          transform="translate(45 927)"
          fontSize={14}
          fontFamily="Gontserrat-Medium, Montserrat"
          fontWeight={500}
        >
          <TSpan x={0} y={0}>
            {"Hafiz Hanif Jamal"}
          </TSpan>
        </Text>
        <G
          id="Mask_Group_2205"
          data-name="Mask Group 2205"
          transform="translate(-210 220)"
          clipPath="url(#clip-path)"
        >
          <Image
            id="IMG_20170122_143244_440"
            width={85}
            height={85}
            transform="translate(269 598)"
          />
        </G>
        <Path
          id="Intersection_5"
          data-name="Intersection 5"
          d="M19.54,102.612a51.5,51.5,0,0,1-18.524-7.8Q.5,94.467,0,94.109l2.135-3.093q.486.346.98.68A48.048,48.048,0,0,0,77.054,61.521a48.552,48.552,0,0,0,0-19.377,47.826,47.826,0,0,0-7.23-17.191A48.191,48.191,0,0,0,48.684,7.536a47.763,47.763,0,0,0-9.02-2.8,48.369,48.369,0,0,0-9.684-.977q-1.228,0-2.453.062c-.033-1.269-.062-2.525-.085-3.758Q28.71,0,29.98,0A52.167,52.167,0,0,1,40.421,1.053a51.5,51.5,0,0,1,18.524,7.8,51.984,51.984,0,0,1,18.77,22.8,51.58,51.58,0,0,1,3.019,9.729,52.364,52.364,0,0,1,0,20.892,51.56,51.56,0,0,1-7.8,18.534A51.964,51.964,0,0,1,50.146,99.592a51.508,51.508,0,0,1-9.724,3.02,52.287,52.287,0,0,1-20.882,0Z"
          transform="translate(72.212 807.168)"
          fill="#06ab8d"
        />
      </G>
    </Svg>
  );
export default Hanif;