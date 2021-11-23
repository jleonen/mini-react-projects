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
      data: action.responseData,
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

function useHttp(requestFunction) {
  const [httpState, dispatch] = useReducer(httpReducer, {
    status: null,
    data: null,
    error: null,
  });

  const sendRequest = useCallback(
    async function (data) {
      dispatch({ type: "SEND" });
      try {
        const responseData = await requestFunction(data);
        console.log(responseData);
        dispatch({ type: "SUCCESS", responseData });
        console.log(httpState);
      } catch (error) {
        dispatch({
          type: "ERROR",
          errorMsg: "Something went wrong. Please try again later.",
        });
      }
    },
    [requestFunction, httpState]
  );
  return {
    sendRequest,
    ...httpState,
  };
}

export default useHttp;
