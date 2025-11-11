"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { signIn } from "next-auth/react"
import { LoginPayload } from "@/services/auth.service"

export default function useAuthSignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true
    return () => { mountedRef.current = false }
  }, [])

  const signInUser = useCallback(async (payload: LoginPayload) => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await signIn("credentials", {
        redirect: false,
        identifier: payload.identifier,
        password: payload.password,
      })

      if (res?.error) throw new Error(res.error)
      return res
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err))
      if (mountedRef.current) setError(e)
      throw e
    } finally {
      if (mountedRef.current) setIsLoading(false)
    }
  }, [])

  return { signIn: signInUser, isLoading, error } as const
}
