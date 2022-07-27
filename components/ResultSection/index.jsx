import React, { useMemo } from 'react';
import { useWLValidator } from '../../context/toolProvider';

const ResultSection = () => {
  const { wlProof, wlRoot } = useWLValidator();

  const main = useMemo(
    () => (
      <div>
        {wlProof.length > 0 && (
          <div>
            <h4>WlProof</h4>
            {wlProof.map(el => (
              <p key={el}>{el}</p>
            ))}
          </div>
        )}
        {wlProof.length > 0 && wlRoot !== '' && (
          <div>
            <h4>WlRoot</h4>
            {wlRoot}
          </div>
        )}
      </div>
    ),
    [wlProof, wlRoot]
  );

  return main;
};

export default ResultSection;
