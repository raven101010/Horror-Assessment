import React from "react";
import {
  Flex,
  Image,
  Link,
  Text,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  Button,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from 'react-scroll';


const LandingNavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const NavLinks = (
    <>
      <ScrollLink to="home" smooth={true} duration={500} offset={-80}>
        <Text fontWeight={400} color="#FFF" mb={{ base: 4, md: 0 }} mr={{ md: 5 }}>
          Home
        </Text>
      </ScrollLink>
      <ScrollLink to="about" smooth={true} duration={500} offset={-80}>
        <Text fontWeight={400} color="#FFF" mb={{ base: 4, md: 0 }} mr={{ md: 5 }}>
          About
        </Text>
      </ScrollLink>
      <ScrollLink to="contact" smooth={true} duration={500} offset={-80}>
        <Text fontWeight={400} color="#FFF" mb={{ base: 4, md: 0 }}>
          Contact
        </Text>
      </ScrollLink>
    </>
  );

  const AuthLinks = (
    <Flex
      flexDirection="row"
      gap={3}
      fontWeight={500}
      color="#FFF"
      bgColor="#A11C2E"
      p={2}
      borderRadius="xs"
      px={6}
      display={{ base: "none", md: "flex" }}
    >
      <Link to="/auth?mode=signup" as={RouterLink} fontSize="md">
        <Text>Sign Up</Text>
      </Link>
      <Text>|</Text>
      <Link to="/auth?mode=login" as={RouterLink} fontSize="md">
        <Text>Log In</Text>
      </Link>
    </Flex>
  );

  const SidebarAuthLinks = (
    <VStack spacing={4} align="stretch" w="100%">
      <Button
        as={RouterLink}
        to="/auth?mode=signup"
        borderRadius={2}
        bg="#A11C2E"
        border="2px solid #A11C2E"
        color="white"
        _hover={{ bg: "white", color: "#A11C2E" }}
        fontWeight="500"
        fontSize="md"
        w="100%"
      >
        Sign Up
      </Button>
      <Button
        as={RouterLink}
        to="/auth?mode=login"
        borderRadius={2}
        bg="#A11C2E"
        border="2px solid #A11C2E"
        color="white"
        _hover={{ bg: "white", color: "#A11C2E" }}
        fontWeight="500"
        fontSize="md"
        w="100%"
      >
        Log In
      </Button>
    </VStack>
  );

  return (
    <>
      <Flex
        w="100%"
        justify="space-between"
        align="center"
        px={{ base: 6, lg: "7rem" }}
        py="2rem"
        fontFamily="'Poppins', sans-serif"
        bg="#000000"
        id="home"
      >
        {/* Logo shown only on md and above */}
        <Image
          src="/images/horrorLogo.png"
          alt="HorrorHub.png"
          h="7vh"
          display={{ base: "none", md: "block" }}
        />

        {/* Desktop & md Nav */}
        <Flex
          display={{ base: "none", md: "flex" }}
          fontSize={{ md: "sm", lg: "lg" }}
          align="center"
        >
          <Flex mr={10}>{NavLinks}</Flex>
          {AuthLinks}
        </Flex>

        {/* Mobile Menu Button */}
        <IconButton
          display={{ base: "flex", md: "none" }}
          icon={<HamburgerIcon boxSize={6} />}
          aria-label="Open Menu"
          variant="ghost"
          color="white"
          onClick={onOpen}
        />
      </Flex>

      {/* Mobile Sidebar Drawer */}
      <Drawer
        placement="left"
        onClose={onClose}
        isOpen={isOpen}
        trapFocus={false}
      >
        <DrawerOverlay />
        <DrawerContent bg="#000000" color="#FFF" fontFamily="Poppins">
          <DrawerCloseButton />
          <DrawerBody mt={10}>
            <VStack spacing={6} align="flex-start" fontSize="lg">
              <Image src="/images/horrorLogo.png" alt="Sidebar Logo" h="6vh" mb={6} />
              {NavLinks}
              {SidebarAuthLinks}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default LandingNavBar;
