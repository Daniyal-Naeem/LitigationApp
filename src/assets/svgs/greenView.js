import * as React from "react"
import Svg, { G, Text, TSpan, Path } from "react-native-svg"

function GreenView(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={61.936}
      height={15.699}
      viewBox="0 0 61.936 15.699"
      {...props}
    >
      <G data-name="Group 17012">
        <Text
          data-name="More info"
          transform="translate(-9 -1.714) translate(9 13.063)"
          fill="#292929"
          fontSize={12}
          fontFamily="Poppins-Regular, Poppins"
        >
          <TSpan x={0} y={0}>
            {"More info"}
          </TSpan>
        </Text>
        <Path
          data-name="Path 10015"
          d="M63.501 15.998l6.435-6.435-6.435-6.435"
          fill="none"
          stroke="#292929"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          transform="translate(-9 -1.714)"
        />
      </G>
    </Svg>
  )
}

export default GreenView
