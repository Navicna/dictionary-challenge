import { FlatList, Text, View } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { FlatList as RNFlatList } from "react-native";
import { fullWidth, isAndroid } from "@constants/metrics";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppData } from "@context/AppContext";
import { ArrowButton } from "@components/ArrowButton";
import { TextContainer } from "@components/TextContainer";

import { Screens, StackParams } from "../../routes/types";
import { FullScreenLoading } from "@components/FullScreenLoading";

const numColumns = 3;

function Home() {
  const { data, isLoading, pageSize } = useAppData();

  const [page, setPage] = useState(1);
  const [words, setWords] = useState<string[] | null>([]);

  const { navigate } = useNavigation<StackNavigationProp<StackParams>>();

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

  const handleLoadInitialWords = async () => {
    if (data) {
      setWords(data.slice(0, pageSize));
    }
  };

  const handleNavigate = (word: string) => {
    navigate(Screens.Modal, {
      word,
    });
  };

  useEffect(() => {
    handleLoadInitialWords();
  }, [!!data]);

  if (isLoading) {
    return <FullScreenLoading />;
  }

  return (
    <View alignItems="center" justifyContent="center" flex={1}>
      <FlatList
        ref={flatlistRef}
        ListHeaderComponent={() => {
          return (
            <View
              alignSelf="flex-start"
              mt={isAndroid ? 4 : top * 2}
              mb="24px"
              pl="4"
            >
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
          return (
            <TextContainer
              onPress={(word) => {
                handleNavigate(word);
              }}
            >
              {item}
            </TextContainer>
          );
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
