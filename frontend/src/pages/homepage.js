import React from "react";
import { Container, Box, Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Register from "../components/Authentication/Register";

const homepage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px  0"
        borderRadius="20px"
        borderWidth={"2px"}
      >
        <Text fontSize={"4xl"}> ChatterBox </Text>
      </Box>

      <Box w="100%" p={4} borderRadius={"20px"} borderWidth={"2px"}>
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
