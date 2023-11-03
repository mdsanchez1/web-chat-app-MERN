import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";

const Login = () => {
  const [show, setShow] = useState(false);
  const [username, setUser] = useState();
  const [password, setPass] = useState();

  const showHide = () => setShow(!show);
  const loginHandler = () => {};

  return (
    <VStack spacing="5px">
      <FormControl isRequired id="usernameL">
        <FormLabel>Username</FormLabel>
        <Input placeholder="user" onChange={(e) => setUser(e.target.value)} />
      </FormControl>
      <FormControl isRequired id="passwordL">
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="password"
            type={show ? "text" : "password"}
            onChange={(e) => setPass(e.target.value)}
          />
          <InputRightElement w="4.5em">
            <Button height="1.75em" size="sm" onClick={showHide}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        color="white"
        backgroundColor={password && username ? "green" : "grey"}
        _hover={{ filter: "brightness(120%)" }}
        _active={{
          backgroundColor: password && username ? "green" : "grey",
          boxShadow:
            "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
        }}
        marginTop={4}
        width="50%"
        onClick={loginHandler}
      >
        Login
      </Button>
    </VStack>
  );
};

export default Login;
