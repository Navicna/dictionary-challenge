import { fullHeight, fullWidth } from "@constants/metrics";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Box,
  Button,
  Text,
  View,
  IconButton,
  ChevronDownIcon,
  PlayIcon,
  CheckCircleIcon,
} from "native-base";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Screens, StackParams } from "@routes/types";
import { ActivityIndicator, TouchableOpacity, BackHandler } from "react-native";
import * as Speech from "expo-speech";
import { useAppData } from "@context/AppContext";
import keys from "@constants/keys";

const modalSize = fullHeight * 0.8;

type ModalRoute = RouteProp<StackParams, Screens.Modal>;

function Modal() {
  const { wordList, loadFavorites, favoriteList, loadHistory, historyList } =
    useAppData();
  const route = useRoute<ModalRoute>();

  const [word, setWord] = useState(route.params.word);
  const [historyDraft, setHistoryDraft] = useState<string[]>(historyList);

  const { goBack } = useNavigation();

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isFavorite = useMemo(() => {
    return favoriteList.includes(word);
  }, [word, favoriteList]);

  const speak = async () => {
    setIsSpeaking(true);
    setTimeout(() => {
      setIsSpeaking(false);
    }, 500);

    Speech.speak(word);
  };

  const findIndexWord = () => {
    if (!wordList) {
      return 0;
    }

    return wordList.indexOf(word);
  };

  const moveToNextWord = () => {
    if (!wordList) {
      return;
    }

    const currentIndex = findIndexWord();
    if (currentIndex !== -1 && currentIndex < wordList.length - 1) {
      setWord(wordList[currentIndex + 1]);
    }
  };

  const moveToPreviousWord = () => {
    if (!wordList) {
      return;
    }

    const currentIndex = findIndexWord();
    if (currentIndex > 0) {
      setWord(wordList[currentIndex - 1]);
    }
  };

  const addToHistory = async () => {
    try {
      if (historyList.length === historyDraft.length) {
        return;
      }

      setIsLoading(true);

      await AsyncStorage.setItem(keys.history, JSON.stringify(historyDraft));

      loadHistory();
    } finally {
      setIsLoading(false);
    }
  };

  const addToFavorites = async () => {
    try {
      setIsLoading(true);

      const favorites = await loadFavorites();

      if (favorites.includes(word)) {
        return;
      }

      favorites.push(word);
      await AsyncStorage.setItem(keys.favorites, JSON.stringify(favorites));

      loadFavorites();
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromFavorites = async () => {
    try {
      setIsLoading(true);
      const favorites = await loadFavorites();
      const updatedFavorites = favorites.filter((item) => item !== word);
      await AsyncStorage.setItem(
        keys.favorites,
        JSON.stringify(updatedFavorites)
      );

      loadFavorites();
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    addToHistory();
    goBack();
  };

  useEffect(() => {
    const onBackPress = () => {
      addToHistory();

      return false;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    if (!historyList.includes(word) && !historyDraft.includes(word)) {
      setHistoryDraft((wl) => [...wl, word]);
    }
  }, [word]);

  return (
    <Box flex={1} justifyContent="flex-end" bgColor="rgba(0, 0, 0, 0.23)">
      <View
        shadow="4"
        justifyContent="center"
        alignItems="center"
        borderTopRadius={16}
        bgColor="#242424"
        width="100%"
        height={modalSize}
        pr="14px"
        pl="14px"
      >
        <IconButton
          onPress={handleGoBack}
          position="absolute"
          top="16px"
          left="16px"
          backgroundColor="transparent"
        >
          <ChevronDownIcon color="white" size="20px" />
        </IconButton>
        <View
          width="100%"
          borderWidth="1px"
          borderColor="white"
          height={modalSize * 0.4}
          alignItems="center"
          justifyContent="center"
        >
          <Text
            fontSize="2xl"
            color={isSpeaking ? "emerald.500" : "white"}
            fontWeight="bold"
          >
            {word}
          </Text>
        </View>

        <View width={fullWidth}>
          <TouchableOpacity
            onPress={speak}
            style={{
              alignSelf: "center",
            }}
          >
            <PlayIcon color="white" size="60px" mt="24px" />
          </TouchableOpacity>

          <View
            position="absolute"
            alignItems="center"
            right="16px"
            justifyContent="center"
            top="24px"
          >
            {isLoading ? (
              <View mr="12px" mt="12px">
                <ActivityIndicator />
              </View>
            ) : (
              <TouchableOpacity
                onPress={isFavorite ? removeFromFavorites : addToFavorites}
              >
                <CheckCircleIcon
                  color={isFavorite ? "emerald.500" : "white"}
                  size="24px"
                  alignSelf="center"
                />
                <Text color={isFavorite ? "emerald.500" : "white"}>
                  Favorite!
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View
          flexDirection="row"
          justifyContent="space-between"
          width="100%"
          position="absolute"
          bottom="24px"
        >
          <Button
            _text={{
              color: "emerald.500",
              fontWeight: "bold",
            }}
            w="40%"
            onPress={moveToPreviousWord}
            variant="outline"
            backgroundColor="transparent"
          >
            Previous
          </Button>
          <Button
            _text={{
              color: "emerald.500",
              fontWeight: "bold",
            }}
            w="40%"
            onPress={moveToNextWord}
            variant="outline"
            backgroundColor="transparent"
          >
            Next
          </Button>
        </View>
      </View>
    </Box>
  );
}

export default Modal;
