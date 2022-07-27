import React, { useMemo } from 'react';
import { useWLValidator } from '../../context/toolProvider';
import { DebounceInput } from 'react-debounce-input';

const InputSection = () => {
  const { inputValue, handleInput } = useWLValidator();

  const main = useMemo(
    () => (
      <>
        <label htmlFor="Address">Addres to Check</label>
        <DebounceInput
          type="text"
          id="Address"
          name="Address"
          value={inputValue.Address || ''}
          onChange={handleInput}
          placeholder="0x........"
          minLength={0}
          debounceTimeout={250}
        />
      </>
    ),
    [inputValue.Address, handleInput]
  );

  return main;
};

export default InputSection;
