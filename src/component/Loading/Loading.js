import { RotatingLines } from "react-loader-spinner";

function Loading() {
  return (
    <>
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="50"
        visible={true}
      />
    </>
  );
}
export default Loading;
