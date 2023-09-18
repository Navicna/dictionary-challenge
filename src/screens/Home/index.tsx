import { FlatList, Text, View } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { FlatList as RNFlatList } from "react-native";
import { fullWidth } from "@constants/metrics";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppData } from "@context/AppContext";
import { ArrowButton } from "@components/ArrowButton";
import { TextContainer } from "@components/TextContainer";

const numColumns = 3;

function Home() {
  const { data, pageSize } = useAppData();

  const [page, setPage] = useState(1);
  const [words, setWords] = useState<string[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const flatlistRef = useRef<RNFlatList>(null);

  const { top } = useSafeAreaInsets();

  const scrollToTop = () => {
    flatlistRef.current?.scrollToOffset({
      offset: 0,
    });
  };

  const handleLoadWords = () => {
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;

    if (!data) {
      return;
    }

    const actualData = data.slice(startIndex, endIndex);

    if (words) {
      return setWords([...words, ...actualData]);
    } else {
      return setWords(actualData);
    }
  };

  const handleLoadNextPage = () => {
    setPage((p) => p + 1);
    handleLoadWords();
  };

  const handleReadJSONFile = async () => {
    setIsLoading(true);
    if (data) {
      setWords(data.slice(0, pageSize));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleReadJSONFile();
  }, []);

  if (isLoading) {
  }

  return (
    <View alignItems="center" justifyContent="center" flex={1}>
      <FlatList
        ref={flatlistRef}
        ListHeaderComponent={() => {
          return (
            <View alignSelf="flex-start" mt={top * 2} mb={top} pl="4">
              <Text fontSize="3xl" fontWeight="bold" color="emerald.500">
                Word list
              </Text>
            </View>
          );
        }}
        flex={1}
        backgroundColor="black"
        width={fullWidth}
        keyExtractor={(_) => _}
        data={words}
        numColumns={numColumns}
        renderItem={({ item }) => {
          return <TextContainer>{item}</TextContainer>;
        }}
        onScroll={(event) => {
          const { layoutMeasurement, contentOffset, contentSize } =
            event.nativeEvent;
          const isAtBottom =
            layoutMeasurement.height + contentOffset.y >= contentSize.height;
          if (isAtBottom) {
            handleLoadNextPage();
          }
        }}
      />
      <ArrowButton onPress={scrollToTop} />
    </View>
  );
}

export default Home;
