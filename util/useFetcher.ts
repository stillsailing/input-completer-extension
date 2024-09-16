import { useState } from "react"

export default function useFetcher<Param = any, Result = any>(
  fetcher: (param: Param) => Promise<Result>
) {
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<Error>(null)
  const [loading, setLoading] = useState(false)

  return {
    data,
    error,
    loading,
    fetch: (param: Param) => {
      setLoading(true)
      fetcher(param)
        .then((result) => {
          setData(result)
          setError(null)
        })
        .catch((error) => setError(error))
        .finally(() => setLoading(false))
    }
  }
}
