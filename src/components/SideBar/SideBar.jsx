import {
  Box,
  Flex,
  Image,
  Link,
  Text,
  Icon,
  VStack,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { FaBars, FaGhost, FaComment, FaFilm } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import authStore from "../../stores/authStores";

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const currentMode = new URLSearchParams(location.search).get("mode");

  const user = authStore((store) => store.user);
  const logout = authStore((store) => store.logout);

  const handleLogout = () => logout();
  if (!user) return null;

  const NavLinks = (
    <Flex direction="column" h="100%" justify="space-between">
      <VStack align="flex-start" spacing={8}>
        <Link to="/home" as={RouterLink}>
          <Image src="/images/horrorLogo.png" alt="HorrorHubLogo" h="50px" px={5} />
        </Link>

        <Link
          to={"/home?mode=forum"}
          as={RouterLink}
          w={"full"}
          p={3}
          borderRadius={"sm"}
          backgroundColor={currentMode === "forum" ? "#B3192D" : "transparent"}
          _hover={{ backgroundColor: "#B3192D" }}
        >
          <Flex direction={'row'} gap={3}>
            <Icon as={FaComment} boxSize={6} />
            <Text>Tell a Terror</Text>
          </Flex>
        </Link>

        <Link
          to={"/home?mode=horrortakes"}
          as={RouterLink}
          w={"full"}
          p={3}
          borderRadius={"sm"}
          backgroundColor={currentMode === "horrortakes" ? "#B3192D" : "transparent"}
          _hover={{ backgroundColor: "#B3192D" }}
        >
          <Flex direction={'row'} gap={3}>
            <Icon as={FaGhost} boxSize={6} />
            <Text>Horror Takes</Text>
          </Flex>
        </Link>

        <Link
          to={"/home?mode=picks"}
          as={RouterLink}
          w={"full"}
          p={3}
          borderRadius={"sm"}
          backgroundColor={currentMode === "picks" ? "#B3192D" : "transparent"}
          _hover={{ backgroundColor: "#B3192D" }}
        >
          <Flex direction={'row'} gap={3}>
            <Icon as={FaFilm} boxSize={6} />
            <Text>Horror Picks</Text>
          </Flex>
        </Link>
      </VStack>

      {/* Logout */}
      <Box mt={10} pt={4}>
        <Link to="/auth?mode=login" as={RouterLink} onClick={handleLogout}>
          <Flex
            align="center"
            gap={3}
            color="#fff"
            bg="#B3192D"
            p="3"
            borderRadius="3"
            _hover={{ color: "#B3192D", bg: "#fff", border: "2px solid #B3192D" }}
          >
            <Icon as={TbLogout2} boxSize={6} />
            <Text fontWeight="semibold" fontSize={16}>Log out</Text>
          </Flex>
        </Link>
      </Box>
    </Flex>
  );

  return (
    <>
      {/* Menu Button */}
      <Box position="fixed" top={4} left={4} zIndex={20}>
        <IconButton
          icon={<FaBars />}
          onClick={onOpen}
          variant="ghost"
          colorScheme="red"
          aria-label="Open menu"
          fontSize="24px"
        />
      </Box>

      {/* Drawer Sidebar make it go in and out */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent
          bg="#121212"
          color="white"
          fontFamily="'Poppins', sans-serif"
          px={4}
          py={6}
        >
          <DrawerCloseButton />
          <DrawerBody pt={10}>
            {NavLinks}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
