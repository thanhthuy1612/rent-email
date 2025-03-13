import { useState, useCallback } from "react";

function useObjectState<T extends object>(initialState: T) {
  const [state, _setState] = useState<T>(initialState);

  const setState = useCallback(
    (newState: Partial<T> | ((prevState: T) => Partial<T>)) => {
      _setState((prevState) => ({
        ...prevState,
        ...(typeof newState === "function" ? newState(prevState) : newState),
      }));
    },
    []
  );

  const resetState = useCallback(() => {
    setState(initialState);
  }, [setState]);

  return [state, setState, resetState] as const;
}

export default useObjectState;
