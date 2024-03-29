import { toastr } from 'react-redux-toastr';
import { ErrorResponse } from '@/redux/auth/slice';

export const errorHandler = (error: { data: ErrorResponse }) => {
  const errorResponse = error.data;
  if (!errorResponse.isError) return;
  if (typeof errorResponse.errorMessage === 'string') {
    toastr.error('エラー', errorResponse.errorMessage);
  } else {
    errorResponse.errorMessage.forEach((message) => toastr.error('エラー', message));
  }
};
