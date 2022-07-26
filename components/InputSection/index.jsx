import React from 'react';
import { useWLValidator } from '../../context/toolProvider';
import { DebounceInput } from 'react-debounce-input';

const InputSection = () => {
  const { inputValue, handleInput } = useWLValidator();

  return (
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
  );
};

export default InputSection;
