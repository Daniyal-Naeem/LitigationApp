import * as React from "react"
import Svg, { Defs, LinearGradient, Stop, Path } from "react-native-svg"

function Card(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={357.661}
      height={109}
      viewBox="0 0 367.661 109"
      {...props}
    >
      <Defs>
        <LinearGradient
          id="a"
          y1={0.5}
          x2={1.058}
          y2={0.5}
          gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} stopColor="#823d3f" />
          <Stop offset={1} stopColor="#411f20" />
        </LinearGradient>
      </Defs>
      <Path
        data-name="Path 10152"
        d="M14.459 0H353.2a14.235 14.235 0 0114.459 14v81a14.235 14.235 0 01-14.459 14H14.459A14.235 14.235 0 010 95V14A14.235 14.235 0 0114.459 0z"
        fill="url(#a)"
      />
    </Svg>
  )
}

export default Card
