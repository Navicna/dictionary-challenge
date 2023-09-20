import React, { ReactNode, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import keys from "@constants/keys";
import { Credentials } from "@interfaces/index";
import { AppState, AppStateStatus } from "react-native";
import { useToast } from "native-base";
import { isDateLessThanOrEqualToNextDay } from "@utils/date";

interface AppContext {
  wordList: string[] | null;
  pageSize: number;
  isLoading: boolean;
  loadFavorites(): Promise<string[]>;
  favoriteList: string[];
  loadHistory(): Promise<string[]>;
  historyList: string[];
  credentials: Credentials | null;
  setCredentials: (credentials: Credentials | null) => void;
}

const AppContext = React.createContext<AppContext>({
  wordList: null,
  pageSize: 0,
  isLoading: false,
  loadFavorites: async () => [""],
  favoriteList: [],
  loadHistory: async () => [""],
  historyList: [],
  credentials: null,
  setCredentials: (credentials: Credentials | null) => {},
});

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [credentials, setCredentials] = useState<Credentials | null>(null);

  const [wordList, setWordsList] = useState<string[] | null>(null);
  const [favoriteList, setFavoritesList] = useState<string[]>([]);
  const [historyList, setHistoryList] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toast = useToast();

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

  useEffect(() => {
    const validateToken = async () => {
      if (!credentials) {
        return;
      }

      const valid = isDateLessThanOrEqualToNextDay(credentials.createdAt);

      if (valid) {
        return;
      }

      setCredentials(null);
      toast.show({
        description: "Session expired!",
        placement: "top",
      });
    };

    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      if (nextAppState === "active") {
        validateToken();
      }
    };

    const subscribe = AppState.addEventListener("change", handleAppStateChange);

    return () => {
      subscribe.remove();
    };
  }, []);

  const defaultContext = {
    wordList,
    pageSize,
    isLoading,
    loadFavorites,
    favoriteList,
    loadHistory,
    historyList,
    credentials,
    setCredentials,
  };

  return (
    <AppContext.Provider value={defaultContext}>{children}</AppContext.Provider>
  );
};

const useAppData = () => React.useContext(AppContext);
export { AppProvider, useAppData };
