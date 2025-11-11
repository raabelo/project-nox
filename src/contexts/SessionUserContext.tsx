"use client";

import { createContext, useContext } from "react";
import { useSessionUser } from "@/hooks/useSessionUser";
import { User } from "@prisma/client";

interface SessionUserContextValue {
  user: User | undefined;
  isLoading: boolean;
  error: unknown;
}

const SessionUserContext = createContext<SessionUserContextValue>({
  user: undefined,
  isLoading: true,
  error: null,
});

export function SessionUserProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading, error } = useSessionUser();
  const user = data?.user ?? undefined;

  return (
    <SessionUserContext.Provider value={{ user, isLoading, error }}>
      {children}
    </SessionUserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(SessionUserContext);
}
