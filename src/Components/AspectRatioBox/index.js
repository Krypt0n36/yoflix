
const AspectRatioBox = ({ children, ratio = 1 }) => {
  return (
    <div style={ { position: "relative" }}>
      <div style={{
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    "& > *": { height: "100%", width: "100%" }}}>{children}</div>
      <div style={{ paddingBottom: (1 / ratio) * 100 + "%" }} />
    </div>
  );
};

export default AspectRatioBox;