import { Box, Container, Flex } from "@chakra-ui/react";

import TerrorOnline from "./TerrorOnline/TerrorOnline";

const TerrorForum = () => {
  return (
    <>
      <Container maxW={"100vw"} 
          w="full"
          minH="100vh">
        <Flex
          gap={10}
          flexDirection={"row"}
          py={10}
        >
          <Box justify={"center"} w={"100%"}>
            <TerrorOnline />
          </Box>
        </Flex>
      </Container>
    </>
  );
};

export default TerrorForum;
