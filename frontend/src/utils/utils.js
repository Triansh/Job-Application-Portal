import { setStatus } from '../features/statusSlice';

export const saveError = (error, dispatch) => {
  console.error(error.response.data.message);
  dispatch(setStatus({ status: 'error', message: error.response.data.message }));
};
