import { FlatList, Text, View } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import {
  ActivityIndicator,
  FlatList as RNFlatList,
  TouchableOpacity,
} from "react-native";
import { fullWidth, isAndroid } from "@constants/metrics";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppData } from "@context/AppContext";
import { ArrowButton } from "@components/ArrowButton";
import { WordContainer } from "@components/WordContainer";

import { Screens, StackParams } from "../../routes/types";
import { FullScreenLoading } from "@components/FullScreenLoading";
import { Tabs } from "@interfaces/index";
import { TabBar } from "@components/TabBar";
import keys from "@constants/keys";
import { LogoutIcon } from "@components/LogoutIcon";

const numColumns = 3;

function Home() {
  const {
    wordList,
    historyList,
    favoriteList,
    isLoading,
    pageSize,
    loadFavorites,
    loadHistory,
    setCredentials,
  } = useAppData();

  const [page, setPage] = useState(1);

  const [activeTab, setActiveTab] = useState<Tabs>("Word list");
  const [words, setWords] = useState<string[] | null>([]);

  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const isFocused = useIsFocused();

  const { navigate } = useNavigation<StackNavigationProp<StackParams>>();

  const flatlistRef = useRef<RNFlatList>(null);

  const { top } = useSafeAreaInsets();

  const scrollToTop = () => {
    flatlistRef.current?.scrollToOffset({
      offset: 0,
    });
  };

  const handleLoadWords = () => {
    try {
      setIsLoadingMore(true);
      const startIndex = page * pageSize;
      const endIndex = startIndex + pageSize;

      if (!wordList) {
        return;
      }

      const actualData = wordList.slice(startIndex, endIndex);

      if (words) {
        return setWords([...words, ...actualData]);
      } else {
        return setWords(actualData);
      }
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleLoadNextPage = () => {
    setPage((p) => p + 1);
    handleLoadWords();
  };

  const handleLoadInitialWords = async () => {
    if (wordList) {
      setWords(wordList.slice(0, pageSize));
    }
  };

  const handleNavigate = (word: string) => {
    navigate(Screens.Modal, {
      word,
    });
  };

  const logout = async () => {
    setCredentials(null);
    await AsyncStorage.removeItem(keys.credentials);
  };

  const handleClear = async () => {
    await AsyncStorage.removeItem(
      activeTab === "Favorites" ? keys.favorites : keys.history
    );

    if (activeTab === "Favorites") {
      loadFavorites();
    }
    if (activeTab === "History") {
      loadHistory();
    }
  };

  const data = useMemo(() => {
    if (activeTab === "History") {
      return historyList;
    }
    if (activeTab === "Favorites") {
      return favoriteList;
    }

    return words;
  }, [activeTab, words]);

  useEffect(() => {
    handleLoadInitialWords();
  }, [!!wordList, isLoading]);

  if (isLoading && isFocused) {
    return <FullScreenLoading />;
  }

  return (
    <View alignItems="center" justifyContent="center" flex={1} bgColor="black">
      <FlatList
        ref={flatlistRef}
        ListHeaderComponent={() => {
          return (
            <View mt={isAndroid ? "24px" : "48px"}>
              <LogoutIcon
                style={{ marginLeft: 16, marginTop: 16 }}
                onPress={logout}
              />
              <TabBar
                onPress={(tab) => {
                  setActiveTab(tab);
                }}
                activeTab={activeTab}
              />
              <View
                justifyContent="space-between"
                mt={isAndroid ? 4 : top}
                mb="24px"
                pl="16px"
                pr="16px"
                flexDirection="row"
                alignItems="center"
              >
                <Text fontSize="3xl" fontWeight="bold" color="emerald.500">
                  {activeTab}
                </Text>

                {activeTab !== "Word list" && (
                  <TouchableOpacity onPress={handleClear}>
                    <Text
                      fontSize="xs"
                      fontWeight="bold"
                      color="danger.400"
                      mt="4px"
                    >
                      {activeTab === "Favorites"
                        ? "Clear favorites"
                        : "Clear history"}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        }}
        flex={1}
        backgroundColor="black"
        width={fullWidth}
        keyExtractor={(_) => _}
        data={data}
        numColumns={numColumns}
        renderItem={({ item }) => {
          return (
            <WordContainer
              onPress={(word) => {
                handleNavigate(word);
              }}
            >
              {item}
            </WordContainer>
          );
        }}
        onEndReached={handleLoadNextPage}
        onEndReachedThreshold={1.5}
      />
      <ArrowButton onPress={scrollToTop} />
      {isLoadingMore && <ActivityIndicator />}
    </View>
  );
}

export default Home;
