import { React, useEffect } from "react";
import { Container, Box, Text } from "@chakra-ui/react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Image,
  TabIndicator,
} from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Register from "../components/Authentication/Register";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  const history = useHistory();

  // if user is logged in, direct them to chatpage
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) {
      history.push("/chats");
    }
  }, [history]);

  // home page UI
  return (
    <Container maxW="550px" centerContent>
      <Box
        flexDirection={"column"}
        display="flex"
        justifyContent="center"
        alignItems={"center"}
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px  0"
        borderRadius="0px"
        borderWidth={"0px"}
      >
        <Image boxSize="120px" objectFit="cover" src="logo.png" />
        <Text fontSize={"4xl"}> Sign in to ChatterBox </Text>
      </Box>

      <Box w="100%" p={4} borderRadius={"8px"} borderWidth={"2px"}>
        <Tabs isFitted variant="unstyled">
          <TabList>
            <Tab _selected={{ fontWeight: "bold" }}>Login</Tab>
            <Tab _selected={{ fontWeight: "bold" }}>Register</Tab>
          </TabList>
          <TabIndicator
            mt="-1.5px"
            height="2px"
            bg="blue.500"
            borderRadius="1px"
          />
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Register />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
