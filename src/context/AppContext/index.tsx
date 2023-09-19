import React, { ReactNode, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import keys from "@constants/keys";

interface AppContext {
  wordList: string[] | null;
  pageSize: number;
  isLoading: boolean;
  loadFavorites(): Promise<string[]>;
  favoriteList: string[];
  loadHistory(): Promise<string[]>;
  historyList: string[];
}

const AppContext = React.createContext<AppContext>({
  wordList: null,
  pageSize: 0,
  isLoading: false,
  loadFavorites: async () => [""],
  favoriteList: [],
  loadHistory: async () => [""],
  historyList: [],
});

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [wordList, setWordsList] = useState<string[] | null>(null);
  const [favoriteList, setFavoritesList] = useState<string[]>([]);
  const [historyList, setHistoryList] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const pageSize = 96;

  const handleReadJSONFile = async () => {
    try {
      setIsLoading(true);
      const path = await require("@data/words_dictionary.json");
      const mappedPath = Object.keys(path);
      setWordsList(mappedPath);
    } finally {
      setIsLoading(false);
    }
  };

  const loadFavorites = async () => {
    try {
      setIsLoading(true);
      const favorites = await AsyncStorage.getItem(keys.favorites);
      if (!favorites) {
        setFavoritesList([]);
        return [];
      }
      const parsedFavorites = JSON.parse(favorites);
      setFavoritesList(parsedFavorites);
      return parsedFavorites;
    } finally {
      setIsLoading(false);
    }
  };

  const loadHistory = async () => {
    try {
      setIsLoading(true);
      const history = await AsyncStorage.getItem(keys.history);
      if (!history) {
        setHistoryList([]);
        return [];
      }
      const parsedHistory = JSON.parse(history);
      setHistoryList(parsedHistory);
      return parsedHistory;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleReadJSONFile();
  }, []);

  useEffect(() => {
    loadFavorites();
  }, []);

  const defaultContext = {
    wordList,
    pageSize,
    isLoading,
    loadFavorites,
    favoriteList,
    loadHistory,
    historyList,
  };

  return (
    <AppContext.Provider value={defaultContext}>{children}</AppContext.Provider>
  );
};

const useAppData = () => React.useContext(AppContext);
export { AppProvider, useAppData };
