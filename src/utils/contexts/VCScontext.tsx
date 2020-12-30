import { createContext, useContext, useReducer } from 'react';
import { VaniActions } from '../type.helper';
import { initVaniState, reducer, VaniStateType } from './VCSreducer';

const VaniContext = createContext<{
  state: VaniStateType;
  dispatch: React.Dispatch<VaniActions>;
}>({ state: initVaniState, dispatch: () => null });

const VaniContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initVaniState);
  return (
    <VaniContext.Provider value={{ state, dispatch }}>{children}</VaniContext.Provider>
  );
};

export { VaniContext, VaniContextProvider };
