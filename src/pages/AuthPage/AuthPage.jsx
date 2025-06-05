import React from "react";
import "../../index.css";
import {
  Container,
  Flex,
  Image,
  Link,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import CredForm from "../../components/CredForm/CredForm..jsx";

const AuthPage = () => {
  const containerWidth = useBreakpointValue({
    base: "90vw",
    sm: "85vw",
    md: "70vw", 
    lg: "50vw",
    xl: "40vw",
  });

  return (
    <Flex
      direction="row"
      justify="center"
      align="center"
      minH="100vh"
      backgroundImage={"url('/images/credBg.png')"}
      backgroundSize="cover"
      backgroundPosition="center"
      px={4}
    >
      <Container
        maxW={containerWidth}
        w="100%"
        p="1rem"
        pt="3rem"
        borderRadius="sm"
        backgroundColor="#F5F5F5"
        boxShadow="2xl"
      >
        <Flex direction="column" justify="center" align="center" gap={9} p="1rem">
          <VStack w="100%" spacing={4}>
            <Link to="/landing" as={RouterLink}>
              <Image
                src="/images/horrorLogoBlk.png"
                alt="HorrorHubLogo.png"
                h={{ base: "35px", sm: "40px", md: "45px" }}
              />
            </Link>

            <CredForm />
          </VStack>
        </Flex>
      </Container>
    </Flex>
  );
};

export default AuthPage;
