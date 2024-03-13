import * as React from 'react'
import Svg, {Rect, Path} from 'react-native-svg'
const SVGComponent = props => (
  <Svg
    width={64}
    height={64}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Rect width={64} height={64} rx={16} fill="#000001" />
    <Path
      d="M37.0938 40.6141C33.469 39.676 29.4179 40.4862 26.3902 43.1728C25.9211 43.5992 25.4946 44.0256 25.1108 44.4947C27.9253 42.7037 31.2516 42.2346 34.3219 43.0448C34.7057 46.2005 33.8102 49.4414 31.678 52.0001C32.1897 51.6589 32.6588 51.3178 33.1279 50.8913C36.1556 48.2048 37.5202 44.3242 37.0938 40.6141Z"
      fill="white"
    />
    <Path
      d="M32.0191 28.0768C32.872 28.3326 33.7249 28.5458 34.6204 28.6738C33.7675 28.8017 32.9146 28.887 32.0618 28.887H32.0191C31.8912 28.887 31.7632 28.887 31.6353 28.887C24.9402 28.887 19.098 25.5181 15.6012 20.4435C19.098 15.3689 24.9402 12 31.5927 12C31.7206 12 31.8485 12 31.9765 12H32.0191C32.872 12 33.7675 12.0853 34.5777 12.2132C33.6822 12.3412 32.8293 12.5544 31.9765 12.8102C27.7121 14.0896 24.0447 16.8188 21.5713 20.4435C24.0873 24.0256 27.7121 26.7548 32.0191 28.0768Z"
      fill="white"
    />
    <Path
      d="M37.7334 12.7676C37.7334 12.7676 48.1385 15.4541 48.3944 24.9637C48.6502 34.4733 37.7334 39.2921 37.7334 39.2921C37.7334 39.2921 42.5522 32.1279 37.7334 29.4414C37.7334 29.4414 41.7846 29.1855 42.8933 31.1471C42.8933 31.1471 50.953 21.3816 37.7334 12.7676Z"
      fill="white"
    />
    <Path
      d="M30.7824 22.6184C30.7824 23.4286 30.1001 24.1109 29.2899 24.1109C28.4797 24.1109 27.7974 23.4286 27.7974 22.6184C27.7974 21.8082 28.4797 21.1259 29.2899 21.1259C30.1001 21.1685 30.7824 21.8082 30.7824 22.6184Z"
      fill="white"
    />
  </Svg>
)
export default SVGComponent
