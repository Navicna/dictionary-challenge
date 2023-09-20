import Input from "@components/Input";
import { Button, Stack, Text, View, useToast } from "native-base";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FormProvider, useForm } from "react-hook-form";
import resolver from "@utils/validationResolver";
import { Visibility } from "@components/Visibility";
import { VisibilityOff } from "@components/VisibilityOff";
import { TouchableOpacity } from "react-native";
import generateRandomToken from "@utils/generateRandomToken";
import { version } from "../../../package.json";
import { useAppData } from "@context/AppContext";
import { Credentials } from "@interfaces/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import keys from "@constants/keys";
import { now } from "@utils/date";

type LoginDataForm = {
  user: string;
  password: string;
};

function Login() {
  const { top } = useSafeAreaInsets();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const { setCredentials } = useAppData();

  const methods = useForm<LoginDataForm>({
    resolver,
  });

  const handleShowPassword = () => setShowPassword((show) => !show);

  const handleSubmitForm = async (data: LoginDataForm) => {
    if (data.user === "dictionary" && data.password === "abc123") {
      setIsLoading(true);
      const credentials: Credentials = {
        user: data.user,
        token: generateRandomToken(),
        createdAt: now(),
      };
      await AsyncStorage.setItem(keys.credentials, JSON.stringify(credentials));
      setCredentials(credentials);
      setIsLoading(false);
      toast.show({
        description: "Welcome!",
        placement: "top",
      });
    } else {
      toast.show({
        description: "User or password is incorrect.",
        placement: "top",
      });
    }
  };

  return (
    <View
      alignItems="center"
      justifyContent="center"
      bgColor="black"
      flex={1}
      pt={top}
    >
      <Text color="emerald.500" fontWeight="bold" fontSize="3xl" mb="80px">
        Dictionary
      </Text>
      <FormProvider {...methods}>
        <Stack w="100%" space={3}>
          <Input
            testID="login-phone-input"
            name="user"
            placeholder="User"
            w="90%"
            alignSelf="center"
            autoCapitalize="none"
          />

          <Input
            testID="login-password-input"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            InputRightElement={
              <TouchableOpacity
                onPress={handleShowPassword}
                style={{ marginRight: 8 }}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </TouchableOpacity>
            }
            w="90%"
            alignSelf="center"
            autoCapitalize="none"
          />
        </Stack>
        <Button
          mt="60px"
          testID="login-submit-button"
          colorScheme="primary"
          w="90%"
          onPress={methods.handleSubmit(handleSubmitForm)}
          backgroundColor="purple.500"
          isLoading={isLoading}
        >
          Login
        </Button>
      </FormProvider>
      <View flex={0.5} w="100%" justifyContent="flex-end">
        <Text
          color="emerald.500"
          fontWeight="bold"
          fontSize="sm"
          alignSelf="center"
        >
          v{version}
        </Text>
      </View>
    </View>
  );
}

export default Login;
