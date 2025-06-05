import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Input,
  Text,
  useDisclosure,
  Badge,
  IconButton,
  useBreakpointValue,
  Tooltip,
} from "@chakra-ui/react";
import { RiGhostLine, RiGhostFill } from "react-icons/ri";
import { FaCommentDots, FaEye } from "react-icons/fa";
import AddResponse from "../AddResponse/AddResponse";
import authStore from "../../../../stores/authStores";

const TerrorPost = ({ post }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = authStore();
  const [responses, setResponses] = useState(post.responses || []);
  const [quickResponse, setQuickResponse] = useState("");
  const [modalResponse, setModalResponse] = useState("");
  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
  const [likedByUser, setLikedByUser] = useState(
    post.likes?.some((id) => id === user._id) || false
  );
  const API_URL = import.meta.env.VITE_API_URL;

  const isTruncated = post.content.length > 500;
  const previewContent = isTruncated
    ? post.content.slice(0, 500) + "..."
    : post.content;

  const handleQuickPost = async () => {
    if (!quickResponse.trim()) return;
    try {
      const res = await fetch(
        `${API_URL}/api/posts/${post._id}/respond`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user._id,
            response: quickResponse,
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to post");

      setResponses((prev) => [...prev, data.response]);
      setModalResponse(quickResponse);
      setQuickResponse("");
      setModalResponse("");
      onOpen();
    } catch (error) {
      console.error("Failed to post quick response:", error);
      alert("Failed to post comment.");
    }
  };

  const toggleLike = async () => {
    try {
      const res = await fetch(
        `${API_URL}/api/posts/${post._id}/like`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user._id }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setLikesCount(data.likesCount);
        setLikedByUser(data.likedByUser);
      } else {
        console.error("Failed to toggle like", data.message);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const isWideScreen = useBreakpointValue({ base: false, md: true });

  return (
    <>
      <Flex
        w="100%"
        flexDirection="column"
        gap={5}
        mb={5}
        p={{ base: 4, md: 10 }}
        borderRadius={5}
        boxShadow="0 4px 7px rgba(0, 0, 0, 0.3)"
        backgroundColor="#161616"
        fontFamily="'Poppins', sans-serif"
        color="#E5DBE9"
      >
        <Flex w="100%" flexDirection="column" gap={2}>
          <Flex gap={3}>
            <Avatar
              size={{ base: "sm", md: "lg" }}
              src={post.author?.profilePic}
              mb={2}
            />
            <Flex flexDirection="column" justify="center">
              <Box fontWeight={500} fontSize={{ base: "xs", md: "sm" }}>
                {post.author?.username}
              </Box>
              <Box
                fontWeight={400}
                color="#E5DBE9"
                fontSize={{ base: "xs", md: "xs" }}
              >
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Box>
            </Flex>
          </Flex>

          <Flex
            flexDirection="row"
            gap={3}
            alignItems="center"
            flexWrap="wrap"
          >
            <Box fontWeight="bold" fontSize={{ base: "2xl", md: "4xl" }}>
              {post.title}
            </Box>
            {post.category && (
              <Badge
                bg="#F43C55"
                color="black"
                fontSize="xs"
                borderRadius={20}
                py={1}
                px={2}
                alignSelf="center"
              >
                {post.category}
              </Badge>
            )}
          </Flex>

          <Text
            w="100%"
            fontWeight="500"
            color="#E5DBE9"
            fontSize={{ base: "sm", md: "lg" }}
            borderLeft="3px solid #E5DBE9"
            pl={2}
          >
            {previewContent}
          </Text>
        </Flex>

        <Flex
          w="100%"
          justify="end"
          gap={2}
          alignItems="center"
          flexWrap={{ base: "wrap", xl: "nowrap" }}
        >
          <Input
            placeholder="Add a comment..."
            value={quickResponse}
            onChange={(e) => setQuickResponse(e.target.value)}
            maxW="70rem"
            backgroundColor="#E5DBE9"
            color="#4C4C4C"
            _placeholder={{ color: "#4C4C4C" }}
            p={{ base: 3, md: 5 }}
            fontSize={{ base: "sm", md: "md" }}
            borderTop="2px solid #E5DBE9"
            borderTopRadius={10}
            borderBottom="3px solid #4C4C4C"
            borderBottomRadius={2}
          />

          {isWideScreen ? (
            <Button
              backgroundColor="#A11C2E"
              color="#FFF"
              _hover={{ backgroundColor: "#fff", color: "#161616" }}
              onClick={handleQuickPost}
              w={{ base: "6rem", md: "10rem" }}
              fontSize={{ base: "sm", md: "md" }}
            >
              Post Comment
            </Button>
          ) : (
            <Tooltip label="Post">
              <IconButton
                icon={<FaCommentDots />}
                onClick={handleQuickPost}
                backgroundColor="#A11C2E"
                color="#FFF"
                _hover={{ backgroundColor: "#fff", color: "#161616" }}
                aria-label="Post comment"
                fontSize="lg"
              />
            </Tooltip>
          )}

          {isWideScreen ? (
            <Button
              backgroundColor="#A11C2E"
              color="#FFF"
              _hover={{ backgroundColor: "#fff", color: "#161616" }}
              onClick={() => {
                setModalResponse("");
                onOpen();
              }}
              fontSize={{ base: "sm", md: "md" }}
            >
              See more
            </Button>
          ) : (
            <Tooltip label="See More">
              <IconButton
                icon={<FaEye />}
                onClick={() => {
                  setModalResponse("");
                  onOpen();
                }}
                backgroundColor="#A11C2E"
                color="#FFF"
                _hover={{ backgroundColor: "#fff", color: "#161616" }}
                aria-label="See more"
                fontSize="lg"
              />
            </Tooltip>
          )}

          <Box
            display="flex"
            alignItems="center"
            gap={1}
            onClick={toggleLike}
            cursor="pointer"
            _hover={{ color: "#A11C2E" }}
          >
            <IconButton
              icon={likedByUser ? <RiGhostFill /> : <RiGhostLine />}
              variant="ghost"
              aria-label="Like"
              fontSize={{ base: "2xl", md: "4xl" }}
              color={likedByUser ? "#A11C2E" : "#fff"}
              _hover={{ color: "#A11C2E", bg: "transparent" }}
            />
            <Text color="#fff" fontSize={{ base: "sm", md: "md" }}>
              {likesCount}
            </Text>
          </Box>
        </Flex>

        <AddResponse
          isOpen={isOpen}
          onClose={onClose}
          post={post}
          responses={responses}
          setResponses={setResponses}
          initialResponse={modalResponse}
        />
      </Flex>
    </>
  );
};

export default TerrorPost;
