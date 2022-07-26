import React from 'react';
import { useWLValidator } from '../../context/toolProvider';

const ResultSection = () => {
  const { wlProof } = useWLValidator();

  return (
    <div>{wlProof.length > 0 && wlProof.map(el => <p key={el}>{el}</p>)}</div>
  );
};

export default ResultSection;
