import React, { useState } from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";

const Register = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [username, setUser] = useState();
  const [password, setPass] = useState();
  const [repeatPass, setRPass] = useState();
  const [pic, setPic] = useState();

  const showHide = () => setShow(!show);
  const registerHandler = () => {};
  const postDetails = (pic) => {};

  return (
    <VStack spacing="5px">
      <FormControl isRequired id="name">
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="john doe"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired id="username">
        <FormLabel>Username</FormLabel>
        <Input placeholder="user" onChange={(e) => setUser(e.target.value)} />
      </FormControl>
      <FormControl isRequired id="password">
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
      <FormControl isRequired id="rpass">
        <FormLabel>Repeat Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="password"
            type={show ? "text" : "password"}
            onChange={(e) => setRPass(e.target.value)}
          />
          <InputRightElement w="4.5em">
            <Button height="1.75em" size="sm" onClick={showHide}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Upload a Profile Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button
        color="white"
        backgroundColor={
          name && repeatPass && password && username ? "green" : "grey"
        }
        _hover={{ filter: "brightness(120%)" }}
        _active={{
          backgroundColor:
            name && repeatPass && password && username ? "green" : "grey",
          boxShadow:
            "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
        }}
        marginTop={4}
        width="50%"
        onClick={registerHandler}
      >
        Register
      </Button>
    </VStack>
  );
};

export default Register;
