import { useState, useEffect, useCallback } from 'react'

export function usePersistentState<T>(
  key: string,
  defaultValue: T,
  options: {
    serialize?: (value: T) => string
    deserialize?: (value: string) => T
  } = {}
): [T, (value: T | ((prev: T) => T)) => void, boolean] {
  const {
    serialize = JSON.stringify,
    deserialize = JSON.parse
  } = options

  const [isLoading, setIsLoading] = useState(true)
  const [state, setState] = useState<T>(defaultValue)

  // Load initial value from localStorage
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const storedValue = localStorage.getItem(key)
        if (storedValue !== null) {
          setState(deserialize(storedValue))
        }
      }
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error)
    } finally {
      setIsLoading(false)
    }
  }, [key, deserialize])

  // Save to localStorage whenever state changes
  const setPersistentState = useCallback((value: T | ((prev: T) => T)) => {
    setState(prevState => {
      const newState = value instanceof Function ? value(prevState) : value
      
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem(key, serialize(newState))
        }
      } catch (error) {
        console.error(`Error saving ${key} to localStorage:`, error)
      }
      
      return newState
    })
  }, [key, serialize])

  return [state, setPersistentState, isLoading]
}