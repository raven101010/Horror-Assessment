import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import Masonry from "react-masonry-css";
import "./HorrorTakes.css"; // Custom CSS for masonry layout

const HorrorTakes = () => {
  const [takes, setTakes] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newTake, setNewTake] = useState("");
  const toast = useToast();
  const WORD_LIMIT = 50;
  const API_URL = import.meta.env.VITE_API_URL;

  const [selectedTake, setSelectedTake] = useState(null);
  const {
    isOpen: isCardOpen,
    onOpen: onCardOpen,
    onClose: onCardClose,
  } = useDisclosure();

  const fetchTakes = async () => {
    try {
      const response = await fetch(`${API_URL}/api/horrortakes`);
      const data = await response.json();
      setTakes(data);
    } catch (err) {
      console.error("Failed to fetch horror takes:", err);
    }
  };

  useEffect(() => {
    fetchTakes();
  }, []);

  const handleAddTake = async () => {
    const wordCount = newTake.trim().split(/\s+/).length;
    if (wordCount > WORD_LIMIT) {
      toast({
        title: "Word limit reached",
        description: `Please keep your take under ${WORD_LIMIT} words.`,
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    if (newTake.trim() === "") return;

    try {
      const response = await fetch(`${API_URL}/api/horrortakes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newTake.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit horror take");
      }

      const savedTake = await response.json();
      setTakes([savedTake, ...takes]);
      setNewTake("");
      onClose();
    } catch (err) {
      console.error("Failed to add horror take:", err.message);
    }
  };

  return (
    <Box>
      <Container maxW="8xl" minH="100vh">
        <Box
          fontSize="4xl"
          color="#ffffff"
          fontWeight={500}
          fontFamily="Playfair Display, serif"
          pt={{ base: 0, md: 14 }}
          pb={4}
          borderBottom="3px solid #fff"
        >
          Add your horror hot takes to the board
        </Box>

        <Button
          onClick={onOpen}
          bg="red.600"
          color="white"
          bgColor="#A11C2E"
          _hover={{ bg: "#fff", color: "#A11C2E" }}
          mt={6}
          mb={8}
          borderRadius={2}
        >
          + Add a Hot Take
        </Button>

        {/* Masonry Layout */}
        <Masonry
          breakpointCols={{ default: 3, 1100: 2, 700: 1 }}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {takes.map((take, index) => (
            <Box
              key={index}
              bg="#1a1a1a"
              borderRadius="md"
              py={10}
              px={8}
              color="white"
              fontSize="xl"
              textAlign="center"
              fontFamily="Poppins"
              boxShadow="lg"
              transition="transform 0.3s, box-shadow 0.3s"
              _hover={{
                transform: "scale(1.05)",
                boxShadow: "xl",
                cursor: "pointer",
              }}
              onClick={() => {
                setSelectedTake(take);
                onCardOpen();
              }}
            >
              “{take.text}”
            </Box>
          ))}
        </Masonry>
      </Container>

      {/* Add Horror Take Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="#1a1a1a" color="white">
          <ModalHeader>Add Your Horror Take</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              placeholder="Type your hot horror take..."
              value={newTake}
              onChange={(e) => setNewTake(e.target.value)}
              bg="#2a2a2a"
              borderColor="#444"
              _focus={{ borderColor: "red.500" }}
              color="white"
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button bg="red.600" color="white" onClick={handleAddTake}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Enlarged Card View Modal */}
      <Modal isOpen={isCardOpen} onClose={onCardClose} isCentered size="xl">
        <ModalOverlay />
        <ModalContent bg="#1a1a1a" color="white">
          <ModalCloseButton />
          <ModalBody>
            <Box fontSize="2xl" fontWeight="semibold" textAlign="center" p={10}>
              “{selectedTake?.text}”
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default HorrorTakes;
