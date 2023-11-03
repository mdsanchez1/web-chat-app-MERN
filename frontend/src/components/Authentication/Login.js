import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [show, setShow] = useState(false);
  const [username, setUser] = useState();
  const [password, setPass] = useState();
  const [validUser, setValidUser] = useState(true);
  const [validPass, setValidPass] = useState(true);

  // set the button to loading when processing
  const [loading, setLoading] = useState(false);

  // toast for warning popups
  const toast = useToast();

  const history = useHistory();

  const showHide = () => setShow(!show);
  const loginHandler = async () => {
    setLoading(true);
    setValidUser(true);
    setValidPass(true);

    if (!username) {
      // pop up a toast
      toast({
        title: "Please enter a username.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      setValidUser(false);
      setLoading(false);
      return;
    }

    if (!password) {
      // pop up a toast
      toast({
        title: "Please enter a password.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      setValidPass(false);
      setLoading(false);
      return;
    }

    try {
      // tell the database this is json
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // post the user data using server api
      const { data } = await axios.post(
        "/api/user/login",
        { username, password },
        config
      );

      // toast to say user was registered
      toast({
        title: "Logged in successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      // store user info in browser storage
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);

      // push user to chatpage
      history.push("/chats");
    } catch (err) {
      toast({
        title: "Error!",
        description: err.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl isRequired id="usernameL">
        <FormLabel>Username</FormLabel>
        <Input
          placeholder="user"
          onChange={(e) => setUser(e.target.value)}
          style={{ backgroundColor: validUser ? "white" : "lightcoral" }}
        />
      </FormControl>
      <FormControl isRequired id="passwordL">
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="password"
            type={show ? "text" : "password"}
            onChange={(e) => setPass(e.target.value)}
            style={{ backgroundColor: validPass ? "white" : "lightcoral" }}
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
        width="100%"
        onClick={loginHandler}
        isLoading={loading}
      >
        Login
      </Button>
    </VStack>
  );
};

export default Login;
