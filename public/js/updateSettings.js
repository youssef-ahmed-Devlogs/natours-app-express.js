import axios from 'axios';
import { showAlert } from './alerts';

export const updateSettings = async (data, type) => {
  try {
    const url = type == 'password' ? 'updateMyPassword' : 'updateMe';
    const res = await axios({
      method: 'PATCH',
      url: `http://localhost:3000/api/v1/users/${url}`,
      data,
    });

    if (res.data.status == 'success')
      showAlert('success', `Your ${type.toUpperCase()} updated successfully!`);
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
