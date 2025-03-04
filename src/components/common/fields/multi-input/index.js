import {
  Box,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import { useRef } from "react";

const MultiInputField = ({
  name,
  control,
  label,
  maxInputs = 6,
  maxLength = 2,
  isDisabled = false,
  errors,
  setValue,
  defaultValues = ["", "", "", "", "", ""],
  inputSize = "",
}) => {
  const inputRefs = useRef([]);

  const sizeStyles = {
    sm: { width: "40px", height: "40px", fontSize: "10px", lineHeight: "38px" },
    md: { width: "50px", height: "50px", fontSize: "13px", lineHeight: "48px" },
    lg: { width: "60px", height: "60px", fontSize: "20px", lineHeight: "58px" },
  };

  const { width, height, fontSize, lineHeight } = sizeStyles[inputSize] || {
    width: "60px",
    height: "50px",
    fontSize: "18px",
    lineHeight: "48px",
  };

  return (
    <FormControl isInvalid={errors?.[name]} mt={4}>
      <FormLabel>{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Box display="flex" gap={2}>
            {(field.value || defaultValues).map((num, index) => (
              <Input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                value={num}
                onChange={(e) => {
                  let newValue = e.target.value.replace(/\D/g, ""); // Only allow digits
                  if (newValue.length > maxLength)
                    newValue = newValue.slice(0, maxLength);

                  const newValues = [...(field.value || defaultValues)];
                  newValues[index] = newValue;
                  setValue(name, newValues);

                  // Auto-focus on next input when max length is reached
                  if (newValue.length === maxLength && index < maxInputs - 1) {
                    inputRefs.current[index + 1]?.focus();
                  }
                }}
                maxLength={maxLength}
                textAlign="center"
                width={width}
                minWidth={width}
                height={height}
                fontSize={fontSize}
                lineHeight={lineHeight}
                borderRadius="6px"
                border="1px solid #ccc"
                fontWeight="bold"
                isDisabled={isDisabled}
                sx={{ fontFeatureSettings: "'tnum'" }}
              />
            ))}
          </Box>
        )}
      />
      <FormErrorMessage>{errors?.[name]?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default MultiInputField;
