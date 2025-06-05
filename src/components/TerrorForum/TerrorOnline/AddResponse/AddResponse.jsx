import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import authStore from "../../../../stores/authStores";
import axios from "axios";

const AddResponse = ({
  isOpen,
  onClose,
  post,
  responses,
  setResponses,
  initialResponse = "",
}) => {
  const [response, setResponse] = useState(initialResponse);
  const { user } = authStore();


  useEffect(() => {
    setResponse(initialResponse);
  }, [initialResponse]);

  const handleSubmit = async () => {
    if (!response.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:5000/api/posts/${post._id}/respond`,
        {
          userId: user._id,
          response: response,
        }
      );

      setResponses([...responses, res.data.response]);
      resetForm();
      onClose();
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload response.");
    }
  };

  const resetForm = () => {
    setResponse("");
  };

  return (
    <Modal
      isCentered
      size={{ base: "xl", md: "3xl" }}
      isOpen={isOpen}
      onClose={() => {
        resetForm();
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton color={"#000"} />
        <ModalBody p={8} backgroundColor={"#FFF"} borderRadius={5}>
          {/* Post Details */}
          <Box mb={4}>
            <Text fontWeight={700} fontSize="2xl" mb={2}>
              {post.title}
            </Text>
            <Flex my={5} align="center" gap={3}>
              <Avatar size="md" src={post.author?.profilePic} />
              <Box>
                <Text fontWeight={500}>{post.author?.username}</Text>
                <Text fontSize="sm" color="gray.500">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Text>
              </Box>
            </Flex>
            <Text mt={3}>{post.content}</Text>
          </Box>

          <Divider my={4} />

          {/* Responses */}
          <Box maxH="200px" overflowY="auto" mb={5}>
            {responses && responses.length > 0 ? (
              [...responses]
                .slice()
                .reverse()
                .map((res, index) => (
                  <Flex
                    key={index}
                    mb={3}
                    p={3}
                    border="1px solid #ddd"
                    borderRadius={5}
                    backgroundColor="#f9f9f9"
                    gap={3}
                    flexDirection={"column"}
                  >
                    <Flex gap={3} align={"center"}>
                      <Avatar size="sm" src={res.profilePic} />
                      <Flex flexDirection={"column"}>
                        <Text fontWeight={600}>{res.username}</Text>
                        <Text fontSize="xs" color="gray.600">
                          {new Date(res.createdAt).toLocaleString()}
                        </Text>
                      </Flex>
                    </Flex>
                    <Box>
                      <Text>{res.response}</Text>
                    </Box>
                  </Flex>
                ))
            ) : (
              <Text color="gray.500">No responses yet.</Text>
            )}
          </Box>

          {/* Add a response */}
          <VStack align={"stretch"} spacing={4}>
            <FormControl>
              <FormLabel color="#000">Your Response</FormLabel>
              <Input
                type="text"
                as="textarea"
                p={2}
                pl={3}
                height="10vh"
                textAlign="left"
                verticalAlign="top"
                value={response}
                backgroundColor={"#E6E6E6"}
                color={"#292929"}
                borderRadius={2}
                placeholder="Say your opinion..."
                _placeholder={{ color: "#292929" }}
                onChange={(e) => setResponse(e.target.value)}
              />
            </FormControl>

            <Button
              backgroundColor="#A11C2E"
              color={"#FFF"}
              borderRadius={2}
              border={"2px solid #A11C2E"}
              fontWeight="bold"
              _hover={{ backgroundColor: "#fff", border:"2px solid #A11C2E", color: "#A11C2E" }}
              onClick={handleSubmit}
            >
              Post
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddResponse;
