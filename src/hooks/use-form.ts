'use client';

import { useState, useEffect } from 'react';
import { useToast } from './use-toast';

export interface FormState<T> {
  data: T | null;
  errors: Record<string, string[]> | null;
  message: string | null;
}

export function useForm<T>(
  action: (prevState: any, formData: FormData) => Promise<FormState<T>>,
  initialState: FormState<T>
) {
  const [state, setState] = useState<FormState<T>>(initialState);
  const { toast } = useToast();

  const formAction = async (formData: FormData) => {
    try {
      const result = await action(state, formData);
      setState(result);
      if (result.message && result.message !== 'Success') {
        toast({
          title: 'Form Action',
          description: result.message,
          variant: result.errors ? 'destructive' : 'default',
        });
      }
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setState({ ...state, errors: { _form: [errorMessage] }, message: errorMessage });
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      return state;
    }
  };

  return [state, formAction] as const;
}
