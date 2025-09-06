const Legend = ({ legendName, children }) => {
  return (
    <>
      <fieldset className="fieldset_style">
        <legend className="legend_style">{legendName}</legend>
        {children}
      </fieldset>
    </>
  );
};

export default Legend;
