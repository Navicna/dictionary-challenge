import React, { ReactNode, useEffect, useState } from "react";

interface AppContext {
  data: string[] | null;
  pageSize: number;
  isLoading: boolean;
}

const AppContext = React.createContext<AppContext>({
  data: null,
  pageSize: 0,
  isLoading: false,
});

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const pageSize = 96;

  const handleReadJSONFile = async () => {
    try {
      const path = await require("@data/words_dictionary.json");
      const mappedPath = Object.keys(path);
      setData(mappedPath);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleReadJSONFile();
  }, []);

  const defaultContext = { data, pageSize, isLoading };

  return (
    <AppContext.Provider value={defaultContext}>{children}</AppContext.Provider>
  );
};

const useAppData = () => React.useContext(AppContext);
export { AppProvider, useAppData };
