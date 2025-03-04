import React from "react";
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
  SimpleGrid,
} from "@chakra-ui/react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useDispatch } from "react-redux";
import { signup } from "@redux/slices/user";
import PasswordInput from "@components/common/fields/password";
import "yup-phone-lite";
import { AUTH_ROUTES } from "../../../utils/routes";
import queryString from "query-string";

const schema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  firstName: yup
    .string()
    .min(3, "First Name must be at least 3 characters")
    .required("First Name is required"),
  lastName: yup
    .string()
    .min(3, "Last Name must be at least 3 characters")
    .required("Last Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  phoneNumber: yup
    .string()
    .phone(null, true, "Invalid phone number")
    .required("Phone number is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function Signup({ setIsLogin }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const {
      phoneNumber,
      firstName,
      lastName,
      confirmPassword,
      email,
      ...attrs
    } = data;
    try {
      await dispatch(
        signup({
          ...attrs,
          email,
          phone_number: phoneNumber,
          first_name: firstName,
          last_name: lastName,
          confirm_password: confirmPassword,
        })
      );
      const query = queryString.stringify({ email });
      navigate(`${AUTH_ROUTES.VERIFY_EMAIL.PATH}?${query}`);
    } catch (error) {
      reset();
    }
  };

  return (
    <Flex width="100vw" height="100vh" align="center" justify="center">
      <Box
        p={8}
        maxWidth="600px"
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        width="100%"
      >
        <Box textAlign="center" mb={4}>
          <Heading size="lg">Sign Up</Heading>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <FormControl isInvalid={errors.firstName}>
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                placeholder="John"
                {...register("firstName")}
              />
              <Text color="red.500">{errors.firstName?.message}</Text>
            </FormControl>

            <FormControl isInvalid={errors.lastName}>
              <FormLabel>Last Name</FormLabel>
              <Input type="text" placeholder="Doe" {...register("lastName")} />
              <Text color="red.500">{errors.lastName?.message}</Text>
            </FormControl>

            <FormControl isInvalid={errors.username}>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                placeholder="john_doe"
                {...register("username")}
              />
              <Text color="red.500">{errors.username?.message}</Text>
            </FormControl>

            <FormControl isInvalid={errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="test@test.com"
                {...register("email")}
              />
              <Text color="red.500">{errors.email?.message}</Text>
            </FormControl>

            <FormControl isInvalid={errors.phoneNumber}>
              <FormLabel>Phone Number</FormLabel>
              <PhoneInput
                defaultCountry="AE"
                onChange={(phoneNumber) => setValue("phoneNumber", phoneNumber)}
                style={{
                  width: "100%",
                  height: "40px",
                  borderRadius: "6px",
                  border: "1px solid #E2E8F0",
                  paddingLeft: "10px",
                }}
              />
              <Text color="red.500">{errors.phoneNumber?.message}</Text>
            </FormControl>
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mt={4}>
            <FormControl isInvalid={errors.password}>
              <FormLabel>Password</FormLabel>
              <PasswordInput register={register} />
              <Text color="red.500">{errors.password?.message}</Text>
            </FormControl>

            <FormControl isInvalid={errors.confirmPassword}>
              <FormLabel>Confirm Password</FormLabel>
              <PasswordInput register={register} field="confirmPassword" />
              <Text color="red.500">{errors.confirmPassword?.message}</Text>
            </FormControl>
          </SimpleGrid>

          <Button
            colorScheme="teal"
            width="full"
            mt={6}
            type="submit"
            isLoading={isSubmitting}
          >
            {isSubmitting ? <Spinner size="sm" color="white" /> : "Sign Up"}
          </Button>
        </form>

        <Button
          mt={4}
          colorScheme="gray"
          variant="link"
          onClick={() => setIsLogin(true)}
        >
          Already have an account? Login
        </Button>
      </Box>
    </Flex>
  );
}
