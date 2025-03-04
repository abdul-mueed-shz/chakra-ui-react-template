import React from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import MultiInputField from "@components/common/fields/multi-input";
import { useDispatch } from "react-redux";
import {
  initEmailVerification,
  initResendVerificationCode,
} from "@redux/slices/user";
import { showToast } from "@components/common/toast";
import { AUTH_ROUTES } from "@utils/routes";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address"),
  code: yup
    .array()
    .of(yup.string().matches(/^\d$/, "Each digit must be a number")) // Ensures each input is a single digit
    .length(6, "Code must be exactly 6 digits") // Requires exactly 6 inputs
    .required("Verification code is required"),
});

export default function EmailVerification() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const parsedQuery = queryString.parse(search);

  const {
    control,
    handleSubmit,
    setValue,
    register,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: parsedQuery?.email ?? "",
      code: ["", "", "", "", "", ""],
    },
  });

  const onSubmit = (data) => {
    const { code, email } = data;
    dispatch(initEmailVerification({ email, code: code.join("") }))
      .unwrap()
      .then(() => {
        navigate(AUTH_ROUTES.AUTH.PATH);
      })
      .catch(() => {});
  };

  const handleResendCode = () => {
    const email = getValues("email");
    if (!email) {
      showToast("Email is required to resend code");
      return;
    }
    dispatch(initResendVerificationCode(email));
  };

  return (
    <VStack
      height="100vh"
      align="center"
      justify="center"
      spacing={6}
      p={4}
      bg="gray.50"
    >
      <Box
        bg="white"
        p={8}
        borderRadius="lg"
        boxShadow="lg"
        maxWidth="400px"
        width="full"
        textAlign="center"
      >
        <Heading size="lg" mb={2}>
          Verify Your Email
        </Heading>
        <Text fontSize="sm" color="gray.600" mb={6}>
          Enter your email and the 6-digit code sent to your inbox.
        </Text>

        {/* Email Input */}
        <FormControl isInvalid={errors.email} mb={4}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        {/* Verification Code Input - Using MultiInputField */}
        {/* Verification Code Input - Using MultiInputField */}
        <Controller
          name="code"
          control={control}
          render={({ field }) => (
            <MultiInputField
              name="code" // ✅ Explicitly pass name
              control={control} // ✅ Pass control explicitly
              label="Verification Code"
              maxInputs={6}
              maxLength={1} // Ensures single digit input per box
              errors={errors}
              setValue={setValue}
              defaultValues={field.value} // ✅ Ensure default values are used
              inputSize="md"
            />
          )}
        />

        {/* Buttons */}
        <Button
          mt={6}
          colorScheme="green"
          width="full"
          onClick={handleSubmit(onSubmit)}
        >
          Verify
        </Button>

        {/* Resend verification code Button */}
        <Button
          mt={4}
          colorScheme="blue"
          width="full"
          onClick={handleResendCode}
        >
          Resend Code
        </Button>

        {/* Back to Login Button */}
        <Button
          mt={4}
          colorScheme="gray"
          width="full"
          variant="outline"
          onClick={() => navigate("/")}
        >
          Back to Login
        </Button>
      </Box>
    </VStack>
  );
}
