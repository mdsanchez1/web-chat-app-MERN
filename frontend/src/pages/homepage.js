import React from "react";
import { Container, Box, Text } from "@chakra-ui/react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Image,
} from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Register from "../components/Authentication/Register";

const homepage = () => {
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
        <Tabs isFitted variant="soft-rounded">
          <TabList>
            <Tab _selected={{ color: "white", bg: "blue.500" }}>Login</Tab>
            <Tab _selected={{ color: "white", bg: "red.500" }}>Register</Tab>
          </TabList>
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

export default homepage;
