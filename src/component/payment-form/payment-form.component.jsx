import './payment-form.styles.scss';
import { CardElement } from '@stripe/react-stripe-js';
// import { StripeCardElement } from '@stripe/stripe-js';
import Button, { BUTTON_TYPE_CLASS } from '../button/button.component';

const PaymentForm = () => {
  return (
    <div>
      <iframe
        width="268"
        height="268"
        src="https://www.youtube.com/watch?v=5g2hT4GmAGU"
        // title="THE PURIFIED CHURCH  (A CLARION CALL TO THE BODY OF CHRIST) WITH APOSTLE JOSHUA SELMAN 14I08I2022"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>

      ;{/* <CardElement /> */}
      <Button buttonType={BUTTON_TYPE_CLASS.inverted}>Pay Now</Button>
    </div>
  );
};

export default PaymentForm;
