import React, { useState } from "react";
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
import axios from "axios";
import { useHistory } from "react-router-dom";

const Register = () => {
  // used to show/hide password fields
  const [show, setShow] = useState(false);

  //basic user registration info
  const [name, setName] = useState();
  const [username, setUser] = useState();
  const [password, setPass] = useState();
  const [repeatPass, setRPass] = useState();
  const [pic, setPic] = useState();

  // set the button to loading when processing
  const [loading, setLoading] = useState(false);

  // toast for warning popups
  const toast = useToast();

  // boolean to mark if a field is valid or not
  const [validName, setValidName] = useState(true);
  const [validUser, setValidUser] = useState(true);
  const [validPass, setValidPass] = useState(true);

  const history = useHistory();

  // switch the value of show on button click
  const showHide = () => setShow(!show);

  // handle user registration on button click
  const registerHandler = async () => {
    // set button to loading, set all fields to valid
    setLoading(true);
    setValidName(true);
    setValidUser(true);
    setValidPass(true);

    // error check the name, if its missing, invalid
    if (!name) {
      // pop up a toast
      toast({
        title: "Please enter a name.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      // return, set field to red
      setValidName(false);
      setLoading(false);
      return;
    }

    // error check the user, if its missing, invalid
    if (!username) {
      // pop up a toast
      toast({
        title: "Please enter a username.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      //return, set field to red
      setValidUser(false);
      setLoading(false);
      return;
    }

    // error check the passwords, if they are missing, invalid
    if (!password || !repeatPass) {
      // pop up a toast
      toast({
        title: "Please enter a password.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      //return, set field to red
      setValidPass(false);
      setLoading(false);
      return;
    }
    // error check the passwords, if they dont match, invalid
    if (password !== repeatPass) {
      // pop up a toast
      toast({
        title: "Passwords do not match!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      //return, set field to red
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
        "/api/user",
        { name, username, password, pic },
        config
      );

      // toast to say user was registered
      toast({
        title: "Registration successful!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      // store user info in browser storage
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);

      // push user to chatpage
      history.pushState("/chats");
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

  const postDetails = (pic) => {
    setLoading(true);

    if (
      pic.type === "image/jpeg" ||
      pic.type === "image/png" ||
      pic.type === "image/heif"
    ) {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "ChatterBox");
      data.append("cloud_name", "djbopbpu7");
      fetch("https://api.cloudinary.com/v1_1/djbopbpu7/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Submit a valid image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      setLoading(false);
      setPic(null);
      return;
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl isRequired id="name">
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="john doe"
          onChange={(e) => setName(e.target.value)}
          style={{ backgroundColor: validName ? "white" : "lightcoral" }}
        />
      </FormControl>
      <FormControl isRequired id="username">
        <FormLabel>Username</FormLabel>
        <Input
          placeholder="user"
          onChange={(e) => setUser(e.target.value)}
          style={{ backgroundColor: validUser ? "white" : "lightcoral" }}
        />
      </FormControl>
      <FormControl isRequired id="password">
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
      <FormControl isRequired id="rpass">
        <FormLabel>Repeat Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="password"
            type={show ? "text" : "password"}
            onChange={(e) => setRPass(e.target.value)}
            style={{ backgroundColor: validPass ? "white" : "lightcoral" }}
          />
          <InputRightElement w="4.5em">
            <Button height="1.75em" size="sm" onClick={showHide}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Upload a Profile Picture (Optional)</FormLabel>
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
        isLoading={loading}
      >
        Register
      </Button>
    </VStack>
  );
};

export default Register;
