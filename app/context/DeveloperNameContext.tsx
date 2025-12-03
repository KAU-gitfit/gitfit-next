"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface DeveloperNameContextType {
  developerName: string;
  setDeveloperName: (value: string) => void;
}

const DeveloperNameContext = createContext<
  DeveloperNameContextType | undefined
>(undefined);

export function DeveloperNameProvider({ children }: { children: ReactNode }) {
  const [developerName, setDeveloperNameState] = useState<string>(() => {
    if (typeof window === "undefined") {
      return "김아무개";
    }

    const savedName = window.localStorage.getItem("developerName");
    return savedName ?? "김아무개";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("developerName", developerName);
  }, [developerName]);

  const setDeveloperName = (value: string) => {
    setDeveloperNameState(value);
  };

  return (
    <DeveloperNameContext.Provider value={{ developerName, setDeveloperName }}>
      {children}
    </DeveloperNameContext.Provider>
  );
}

export function useDeveloperName() {
  const context = useContext(DeveloperNameContext);
  if (context === undefined) {
    throw new Error(
      "useDeveloperName must be used within a DeveloperNameProvider"
    );
  }
  return context;
}
