import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51Lf0MxHPYhKi5iJJxhSPbNdzDEWPii1TArM8KP1LQG15sXasyYSMifIpFuTzyOHPo6BR140LBzswwff2nswBY4Dw00PjHoyxgh'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session  from API
    const session = await axios(
      `http://localhost:3000/api/v1/booking/checkout-session/${tourId}`
    );
    // 2) Create checkout form + charge credit card
    if (session.data.session.url) {
      window.location.href = session.data.session.url;
    }
  } catch (err) {
    console.log('====================================');
    console.log(err);
    console.log('====================================');
    showAlert('error', err);
  }
};
