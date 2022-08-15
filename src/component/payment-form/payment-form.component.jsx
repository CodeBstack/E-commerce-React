import './payment-form.styles.scss';
import { CardElement } from '@stripe/react-stripe-js';
// import { StripeCardElement } from '@stripe/stripe-js';
import Button, { BUTTON_TYPE_CLASS } from '../button/button.component';

const PaymentForm = () => {
  return (
    <div>
      {/* <CardElement /> */}
      <Button buttonType={BUTTON_TYPE_CLASS.inverted}>Pay Now</Button>
    </div>
  );
};

export default PaymentForm;
