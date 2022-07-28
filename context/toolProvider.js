import { createContext, useContext, useEffect, useReducer } from 'react';
import reducer from './reducer';

import {
  INITIAL_STATE,
  HANDLE_INPUT_TOOL,
  GET_CSV_TOKENIDS,
  REMOVE_CSV_TOKENIDS,
  DECONSTRUCT_CSV,
  DECONSTRUCT_TREE,
  GET_WL_PROOF,
  GET_WL_ROOT,
} from './actions';

const initialState = {
  csvTokenIDs: null,
  inputValue: {
    Address: '',
  },
  whitelist: null,
  tree: null,
  wlRoot: '',
  wlProof: '',
};

const keccak256 = require('keccak256');

const ToolContext = createContext();

const ToolProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const init = () => {
      dispatch({ type: INITIAL_STATE });
    };
    init();
  }, []);

  useEffect(() => {
    if (state.csvTokenIDs === null) return;

    let _whitelistArray = [];

    const deconstructCsv = async () => {
      for (let i = 1; i < state.csvTokenIDs.length; i++) {
        if (state.csvTokenIDs[i][0] === '') continue;
        _whitelistArray.push(state.csvTokenIDs[i][0]);
      }

      const whitelistArray = _whitelistArray.map(el => el.toLowerCase());

      dispatch({ type: DECONSTRUCT_CSV, payload: { whitelistArray } });
    };

    deconstructCsv();
  }, [state.csvTokenIDs]);

  useEffect(() => {
    if (state.whitelist === null || state.csvTokenIDs === null) return;

    const plantTree = () => {
      const leaves = state.whitelist.map(x => keccak256(x).toString('hex'));
      const tree = [leaves];
      let layers = 0;

      while (leaves.length > Math.pow(2, layers)) {
        let tempArr = [];
        const layer = tree[layers];

        for (let i = 0; i < layer.length; i++) {
          const _num = Math.floor(i / 2);
          if (!tempArr[_num]) {
            tempArr.push(layer[i]);
          } else {
            if (tempArr[_num] <= layer[i]) {
              tempArr[_num] = keccak256(
                '0x' + tempArr[_num] + layer[i]
              ).toString('hex');
            } else {
              tempArr[_num] = keccak256(
                '0x' + layer[i] + tempArr[_num]
              ).toString('hex');
            }
          }
        }
        tree.push(tempArr);
        layers++;
      }
      dispatch({ type: DECONSTRUCT_TREE, payload: { tree } });
    };

    plantTree();
  }, [state.whitelist, state.csvTokenIDs]);

  useEffect(() => {
    if (
      state.whitelist === null ||
      state.csvTokenIDs === null ||
      state.inputValue.Address === '' ||
      state.tree === null
    )
      return;

    const getProof = () => {
      let index = state.whitelist.indexOf(
        state.inputValue.Address.toLowerCase()
      );
      const proofs = [];
      for (let node of state.tree) {
        if (node.length === 1) continue;

        let proof;
        if (index % 2 === 0) {
          proof = node[index + 1];
        } else {
          proof = node[index - 1];
        }

        if (proof) {
          proofs.push('0x' + proof);
        }
        index = Math.floor(index / 2);
      }

      dispatch({ type: GET_WL_PROOF, payload: { proofs } });
    };

    getProof();
  }, [
    state.whitelist,
    state.csvTokenIDs,
    state.inputValue.Address,
    state.tree,
  ]);

  useEffect(() => {
    if (
      state.whitelist === null ||
      state.csvTokenIDs === null ||
      state.tree === null
    )
      return;

    const getRoot = () => {
      const root = '0x' + state.tree[state.tree.length - 1][0];
      dispatch({ type: GET_WL_ROOT, payload: { root } });
    };

    getRoot();
  }, [
    state.whitelist,
    state.csvTokenIDs,
    state.inputValue.Address,
    state.tree,
  ]);

  const handleInput = e => {
    dispatch({
      type: HANDLE_INPUT_TOOL,
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const getCSVTokenIDs = async csvTokenIDs => {
    try {
      await dispatch({ type: GET_CSV_TOKENIDS, payload: { csvTokenIDs } });
    } catch (error) {
      console.error(error);
    }
  };
  const removeCSVTokenIDs = async e => {
    try {
      await dispatch({ type: REMOVE_CSV_TOKENIDS });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ToolContext.Provider
      value={{
        ...state,
        handleInput,
        getCSVTokenIDs,
        removeCSVTokenIDs,
      }}
    >
      {children}
    </ToolContext.Provider>
  );
};

function useWLValidator() {
  return useContext(ToolContext);
}

export { initialState, useWLValidator };

export default ToolProvider;

// const getRoot = tree => '0x' + tree[tree.length - 1][0];
