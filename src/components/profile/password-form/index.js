import { Button, FormControl, FormLabel, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PasswordInput from "@components/common/fields/password";
import { useDispatch } from "react-redux";
import { changeUserPassword } from "@redux/slices/user";

const passwordSchema = yup.object().shape({
  oldPassword: yup.string().required("Old password is required"),
  newPassword: yup.string().required("New password is required"),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

const PasswordForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(passwordSchema) });

  const onSubmit = (data) => {
    dispatch(changeUserPassword(data))
      .unwrap()
      .then(() => {
        reset();
      })
      .catch(() => {});
  };

  return (
    <VStack
      as="form"
      spacing={4}
      align="stretch"
      w="full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormControl isInvalid={!!errors.oldPassword}>
        <FormLabel>Old Password</FormLabel>
        <PasswordInput field="oldPassword" register={register}></PasswordInput>
      </FormControl>
      <FormControl isInvalid={!!errors.newPassword}>
        <FormLabel>New Password</FormLabel>
        <PasswordInput field="newPassword" register={register}></PasswordInput>
      </FormControl>
      <FormControl isInvalid={!!errors.confirmNewPassword}>
        <FormLabel>Confirm New Password</FormLabel>
        <PasswordInput
          field="confirmNewPassword"
          register={register}
        ></PasswordInput>
      </FormControl>
      <Button colorScheme="red" type="submit">
        Change Password
      </Button>
    </VStack>
  );
};

export default PasswordForm;
