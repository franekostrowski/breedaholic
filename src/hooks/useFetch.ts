import { useCallback, useEffect, useState } from "react";

const useFetch = (service) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  const fetchAPI = useCallback(async () => {
    try {
      const res = await fetch(service);
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err);
    }
    setLoading(false);
  }, [service]);

  useEffect(() => {
    fetchAPI();
  }, [fetchAPI]);

  return { data, error, loading };
};

export default useFetch;
