import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";

export default function PasswordInput({ register, field = "password" }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <InputGroup>
      <Input
        type={showPassword ? "text" : "password"}
        placeholder="********"
        {...register(field)}
      />
      <InputRightElement>
        <IconButton
          aria-label="Toggle password visibility"
          icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
          variant="ghost"
          size="sm"
          onClick={() => setShowPassword((prev) => !prev)}
        />
      </InputRightElement>
    </InputGroup>
  );
}
