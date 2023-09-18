import React, { ReactNode, useEffect, useState } from "react";

interface AppContext {
  data: string[] | null;
  pageSize: number;
}

const AppContext = React.createContext<AppContext>({
  data: null,
  pageSize: 0,
});

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<string[] | null>(null);

  const pageSize = 96;

  const handleReadJSONFile = async () => {
    const path = await require("@data/words_dictionary.json");
    const mappedPath = Object.keys(path);
    setData(mappedPath);
  };

  useEffect(() => {
    handleReadJSONFile();
  }, []);

  const defaultContext = { data, pageSize };

  return (
    <AppContext.Provider value={defaultContext}>{children}</AppContext.Provider>
  );
};

const useAppData = () => React.useContext(AppContext);
export { AppProvider, useAppData };
