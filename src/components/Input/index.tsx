import React, { useCallback } from "react";
import { Controller, useFormContext } from "react-hook-form";

import {
  Input as NBInput,
  FormControl,
  WarningOutlineIcon,
  IInputProps,
} from "native-base";
import { isIos } from "@constants/metrics";

type Props = IInputProps & {
  name: string;
  label?: string;
  maxLength?: number;
};

const Input = (props: Props) => {
  const { name, label, maxLength, ...others } = props;
  const { control, setValue } = useFormContext();

  const handleChange = useCallback(
    (text: string) => {
      return setValue(name, text);
    },
    [name, setValue]
  );

  const getValue = useCallback((value: string) => {
    if (!value) return "";
    return value;
  }, []);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onBlur, value }, fieldState: { error } }) => (
        <FormControl isInvalid={!!error}>
          {label && (
            <FormControl.Label
              _text={{
                color: "emerald.500",
              }}
            >
              {label}
            </FormControl.Label>
          )}
          <NBInput
            onChangeText={handleChange}
            value={value}
            onBlur={onBlur}
            maxLength={maxLength}
            pt={isIos ? "20px" : undefined}
            pb={isIos ? "20px" : undefined}
            color="emerald.400"
            fontWeight="bold"
            cursorColor="#34d399"
            _focus={{
              borderColor: "purple.400",
              backgroundColor: "transparent",
            }}
            {...others}
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {error?.message}
          </FormControl.ErrorMessage>
        </FormControl>
      )}
    />
  );
};

export default Input;
