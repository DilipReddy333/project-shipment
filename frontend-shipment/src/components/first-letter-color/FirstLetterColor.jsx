const FirstLetterColor = ({ letter }) => {
  return (
    <span style={{ color: "red", fontWeight: "bold", fontSize: "larger" }}>
      {letter}
    </span>
  );
};

export default FirstLetterColor;
