import { fullHeight } from "@constants/metrics";
import {
  Box,
  Button,
  Text,
  View,
  IconButton,
  ChevronDownIcon,
  PlayIcon,
} from "native-base";
import React, { useState } from "react";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Screens, StackParams } from "@routes/types";
import { TouchableOpacity } from "react-native";
import * as Speech from "expo-speech";
import { useAppData } from "@context/AppContext";

const modalSize = fullHeight * 0.8;

type ModalRoute = RouteProp<StackParams, Screens.Modal>;

function Modal() {
  const { data } = useAppData();
  const route = useRoute<ModalRoute>();

  const [word, setWord] = useState(route.params.word);

  const { goBack } = useNavigation();

  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = async () => {
    setIsSpeaking(true);
    setTimeout(() => {
      setIsSpeaking(false);
    }, 500);

    Speech.speak(word);
  };

  const findIndexWord = () => {
    if (!data) {
      return 0;
    }

    return data.indexOf(word);
  };

  const moveToNextWord = () => {
    if (!data) {
      return;
    }

    const currentIndex = findIndexWord();
    if (currentIndex !== -1 && currentIndex < data.length - 1) {
      setWord(data[currentIndex + 1]);
    }
  };

  const moveToPreviousWord = () => {
    if (!data) {
      return;
    }

    const currentIndex = findIndexWord();
    if (currentIndex > 0) {
      setWord(data[currentIndex - 1]);
    }
  };

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
          onPress={goBack}
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
        <TouchableOpacity onPress={speak}>
          <PlayIcon color="white" size="60px" mt="24px" />
        </TouchableOpacity>

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
