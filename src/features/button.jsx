function Button(props) {
  const handleClick = (e) => {
    props.action(props.payload);
  };

  return (
    <button
      className="Button"
      id={props.buttonType}
      onClick={(e) => handleClick(e)}
    >
      {props.children}
    </button>
  );
}

export default Button;
