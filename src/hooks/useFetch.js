import { useReducer, useEffect } from "react";
import axiosInstance from "custom-axios";

const ACTIONS = {
    API_REQUEST: "api-request",
    FETCH_DATA: "fetch-data",
    ERROR: "error",
};

const initialState = {
    data: [],
    loading: false,
    error: null
};

function reducer(state, { type, payload }) {
    switch (type) {
        case ACTIONS.API_REQUEST:
            return { ...state, data: [], loading: true };
        case ACTIONS.FETCH_DATA:
            return { ...state, data: payload, loading: false };
        case ACTIONS.ERROR:
            return { ...state, data: [], error: payload, loading: false };
        default:
            return state;
    }
}

const useFetch = (url) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({ type: ACTIONS.API_REQUEST });
        axiosInstance
            .get(url)
            .then((res) => {
                dispatch({ type: ACTIONS.FETCH_DATA, payload: res });
            })
            .catch((e) => {
                dispatch({ type: ACTIONS.ERROR, payload: e });
            });
    }, [url]);


    function fetchData() {
        // dispatch({ type: ACTIONS.API_REQUEST });
        axiosInstance
            .get(url)
            .then((res) => {
                dispatch({ type: ACTIONS.FETCH_DATA, payload: res });
            })
            .catch((e) => {
                dispatch({ type: ACTIONS.ERROR, payload: e });
            });
    }

    return {
        ...state,
        fetchData
    }
};


export default useFetch;
