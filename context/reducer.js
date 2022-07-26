import { initialState } from './toolProvider';

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

const reducer = (state, action) => {
  if (action.type === INITIAL_STATE) {
    return {
      ...initialState,
    };
  }
  if (action.type === HANDLE_INPUT_TOOL) {
    return {
      ...state,
      inputValue: {
        ...state.inputValue,
        [action.payload.name]: action.payload.value,
      },
    };
  }

  if (action.type === GET_CSV_TOKENIDS) {
    return {
      ...state,
      csvTokenIDs: action.payload.csvTokenIDs,
    };
  }

  if (action.type === REMOVE_CSV_TOKENIDS) {
    return {
      ...state,
      csvTokenIDs: null,
      inputValue: {
        ...state.inputValue,
      },
      whitelist: null,
      wlRoot: '',
      wlProof: '',
    };
  }

  if (action.type === DECONSTRUCT_CSV) {
    return {
      ...state,
      whitelist: action.payload.whitelistArray,
    };
  }

  if (action.type === DECONSTRUCT_TREE) {
    return {
      ...state,
      tree: action.payload.tree,
    };
  }

  if (action.type === GET_WL_PROOF) {
    return {
      ...state,
      wlProof: action.payload.proofs,
    };
  }

  if (action.type === GET_WL_ROOT) {
    return {
      ...state,
      wlRoot: action.payload.root,
    };
  }
};

export default reducer;
