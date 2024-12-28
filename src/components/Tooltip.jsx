import { Tooltip as T } from "react-tooltip";

const style = {
  zIndex: 420,
  width: "15rem",
  textAlign: "center",
};

export const Tooltip = (props) => {
  return <T {...props} style={style} />;
};

export default Tooltip;
