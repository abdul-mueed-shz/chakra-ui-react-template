import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@redux/slices/user";
import PasswordInput from "@components/common/fields/password";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Login({ setIsLogin }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get authentication state from Redux
  const { loading, error, accessToken } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  // Redirect user to dashboard if already logged in
  useEffect(() => {
    if (accessToken) {
      navigate("/dashboard");
    }
  }, [accessToken, navigate]);

  const onSubmit = async (data) => {
    const result = await dispatch(login(data));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/dashboard");
    } else {
      reset();
    }
  };

  return (
    <Flex width="100vw" height="100vh" align="center" justify="center">
      <Box
        p={8}
        maxWidth="500px"
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        width="100%"
      >
        <Box textAlign="center">
          <Heading size="lg">Login</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.email} mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="*******@gmail.com"
                {...register("email")}
              />
              <Text color="red.500">{errors.email?.message}</Text>
            </FormControl>

            <FormControl isInvalid={errors.password} mt={4}>
              <FormLabel>Password</FormLabel>
              <PasswordInput
                field="password"
                register={register}
              ></PasswordInput>
              <Text color="red.500">{errors.password?.message}</Text>
            </FormControl>

            {error && (
              <Text color="red.500" mt={2}>
                {error}
              </Text>
            )}

            <Button
              colorScheme="teal"
              width="full"
              mt={6}
              type="submit"
              isLoading={loading || isSubmitting}
            >
              {loading || isSubmitting ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Box>
        <Button
          mt={4}
          colorScheme="gray"
          variant="link"
          onClick={() => setIsLogin(false)}
        >
          Don't have an account? Sign Up
        </Button>
      </Box>
    </Flex>
  );
}
