import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const profileSchema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
});

const ProfileForm = ({ onSubmit }) => {
  const userProfile = useSelector((state) => state.user.user);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(profileSchema) });

  useEffect(() => {
    if (userProfile) {
      reset(userProfile);
    }
  }, [userProfile, reset]);

  return (
    <VStack
      as="form"
      spacing={4}
      align="stretch"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* First Name */}
      <FormControl isInvalid={!!errors.first_name}>
        <FormLabel>First Name</FormLabel>
        <Input {...register("first_name")} />
      </FormControl>

      {/* Last Name */}
      <FormControl isInvalid={!!errors.last_name}>
        <FormLabel>Last Name</FormLabel>
        <Input {...register("last_name")} />
      </FormControl>

      {/* Email (Disabled) */}
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input value={userProfile?.email || ""} isDisabled />
      </FormControl>

      {/* Phone Number (Disabled) */}
      <FormControl>
        <FormLabel>Phone Number</FormLabel>
        <Input value={userProfile?.phone_number || ""} isDisabled />
      </FormControl>

      {/* Submit Button */}
      <Button colorScheme="blue" type="submit">
        Save Changes
      </Button>
    </VStack>
  );
};

export default ProfileForm;
