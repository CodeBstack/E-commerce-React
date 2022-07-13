import './button.styles.scss';

// default button
//  inverted
// google sign-in

const BUTTON_TYPES_CLASS = {
  google: 'google-sign-in',
  inverted: 'inverted',
};

const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button
      className={`button-container ${BUTTON_TYPES_CLASS[buttonType]}`}
      {...otherProps} //main function of the button
    >
      {/* button label */}
      {children}
    </button>
  );
};
export default Button;
