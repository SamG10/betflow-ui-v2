import { AxiosError } from 'axios';
import { useError } from '../contexts/ErrorContext';

const useFormWithErrorHandling = () => {
  const { showError } = useError();

  const handleFormError = (error: unknown) => {
    let errorMessage: string;

    if (error instanceof AxiosError) {
      errorMessage = error?.response?.data?.message || 'An error occurred';
    } else if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = 'An unknown error occurred';
    }

    showError(errorMessage);
  };

  return { handleFormError };
};

export default useFormWithErrorHandling;
