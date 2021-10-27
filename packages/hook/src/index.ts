import { useEffect, useState, useRef } from 'react';
import Validator, { ValidatorOption } from 'validator.tool';

export interface UseValidator extends ValidatorOption {}
export function useValidator(props: UseValidator = {}) {
  const validator = useRef<Validator>(new Validator({ ...props }));
  const [upState, forceUpdate] = useState(0);

  useEffect(() => {
    if (validator.current && props.form) {
      validator.current.setForm(props.form);
    }
  }, [props.form, validator.current]);

  const handleForceUpdate = () => forceUpdate(upState + 1);
  // return { ...validator.current, forceUpdate: handleForceUpdate };
  return {
    validator: validator.current,
    forceUpdate: handleForceUpdate
  }
}