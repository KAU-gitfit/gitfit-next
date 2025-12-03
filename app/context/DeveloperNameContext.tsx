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
  const [developerName, setDeveloperNameState] = useState<string>("김아무개");
  const [isHydrated, setIsHydrated] = useState(false);

  // 컴포넌트 마운트 시 localStorage에서 개발자 이름 로드
  useEffect(() => {
    const savedName = localStorage.getItem("developerName");
    if (savedName) {
      setDeveloperNameState(savedName);
    }
    setIsHydrated(true);
  }, []);

  // developerName이 변경될 때마다 localStorage에 저장
  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem("developerName", developerName);
  }, [developerName, isHydrated]);

  const setDeveloperName = (value: string) => {
    setDeveloperNameState(value);
  };

  // 하이드레이션이 완료될 때까지 기본값 반환
  if (!isHydrated) {
    return (
      <DeveloperNameContext.Provider
        value={{ developerName: "김아무개", setDeveloperName }}
      >
        {children}
      </DeveloperNameContext.Provider>
    );
  }

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
