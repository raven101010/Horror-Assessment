import { Avatar, Box, Flex, Input, useDisclosure } from "@chakra-ui/react";
import TerrorPosts from "./TerrorPosts/TerrorPosts";
import AddTerrorPost from "./AddTerrorPost/AddTerrorPost";
import { useEffect, useState } from "react";

const TerrorOnline = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [posts, setPosts] = useState([]);

  const categoryOptions = [
    "Paranormal",
    "Cursed",
    "Unreliable Reality",
    "Urban Legends",
    "Occult",
    "Body Horror",
    "Monsters",
    "Revenge from the Grave",
    "Psychological",
    "Possession",
    "Forbidden Knowledge",
    "Slasher",
  ];
  useEffect(() => {
  const baseUrl = import.meta.env.VITE_API_URL || "https://horror-assessment.onrender.com";
  const fetchPosts = async () => {
    const res = await fetch(`${baseUrl}/api/posts`);
    const data = await res.json();
    setPosts(data);
  };
  fetchPosts();
  }, []);
  const filteredPosts = selectedCategory
  ? posts.filter((post) => post.category === selectedCategory)
  : posts;


  return (
    <>
      <Flex flexDirection={"column"} gap={5} justify={"center"}>
        <Flex
          w="100%"
          justify="space-between"
          align="center"
          wrap="wrap"
          gap={4}
        >
          <Box
            fontSize="4xl"
            color="#ffffff"
            fontWeight={500}
            fontFamily="Playfair Display, serif"
            py={4}
            borderBottom="3px solid #fff"
          >
            Share your scariest story
          </Box>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: "0.5rem",
              borderRadius: "5px",
              backgroundColor: "#E5DBE9",
              color: "#161616",
              fontWeight: "bold",
              fontFamily: "Poppins, sans-serif",
              border: "none",
            }}
          >
            <option value="">All Categories</option>
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </Flex>

        <Flex flexDirection="column" gap={10}>
          <Flex
            justify="center"
            align="center"
            gap={2}
            w="100%"
            p={3}
            borderRadius={5}
            boxShadow="0 4px 7px rgba(0, 0, 0, 0.3)"
            backgroundColor={"#161616"}
            cursor="pointer"
            
            onClick={onOpen}
          >
            <Avatar size="md" />
            <Input
              border="0px"
              borderRadius={10}
              placeholder="Share your scriest horror story..."
              backgroundColor={"#FFFFFF"}
              pointerEvents="none"
              _placeholder={{ color: "gray.600" }}
            />
          </Flex>
          <TerrorPosts posts={filteredPosts} />
        </Flex>
        <AddTerrorPost isOpen={isOpen} onClose={onClose} />
      </Flex>
    </>
  );
};

export default TerrorOnline;

