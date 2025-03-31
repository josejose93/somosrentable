'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import * as authStore from './authStore'

export default function useAuth() {
  const user = useSyncExternalStore(
    authStore.subscribe,
    authStore.getUser,
    () => null
  )
  
  const [loading, setLoading] = useState(user === null)

  useEffect(() => {
    // Solo si no hay usuario cargado
    if (user === null) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/me/`, {
        credentials: 'include',
      })
        .then((res) => {
          if (!res.ok) throw new Error()
          return res.json()
        })
        .then(authStore.setUser)
        .catch(() => authStore.setUser(null))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [user])

  return { user, loading }
}
