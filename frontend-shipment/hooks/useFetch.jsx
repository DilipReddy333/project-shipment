import { useState } from "react";

export const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const makeHttpRequest = async (url, config) => {
    try {
      setLoading(true);
      const resp = await fetch(url, config);
      const data = await resp.json();
      if (resp.ok) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setError(null);
        setData(data);
      } else {
        setError(data);
        setData([]);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    data,
    setData,
    error,
    makeHttpRequest,
  };
};
