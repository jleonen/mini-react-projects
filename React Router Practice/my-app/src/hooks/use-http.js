import { useCallback, useReducer } from "react";

function httpReducer(state, action) {
  if (action.type === "SEND") {
    return {
      data: null,
      error: null,
      status: "loading",
    };
  }
  if (action.type === "SUCCESS") {
    return {
      data: action.response,
      error: null,
      status: "completed",
    };
  }
  if (action.type === "ERROR") {
    return {
      data: null,
      error: action.errorMsg,
      status: "completed",
    };
  }
  return state;
}

function useHttp(requestFunction, loading = false) {
  const [httpState, dispatch] = useReducer(httpReducer, {
    status: loading ? "loading" : null,
    data: null,
    error: null,
  });

  const sendRequest = useCallback(
    async function (data) {
      dispatch({ type: "SEND" });
      try {
        const response = await requestFunction(data);
        dispatch({ type: "SUCCESS", response });
      } catch (error) {
        dispatch({
          type: "ERROR",
          errorMsg: "Something went wrong. Please try again later.",
        });
      }
    },
    [requestFunction]
  );
  return {
    sendRequest,
    ...httpState,
  };
}

export default useHttp;
