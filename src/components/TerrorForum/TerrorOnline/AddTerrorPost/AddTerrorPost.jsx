import { useState } from "react";
import {
  Button,
  Flex,
  Input,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  FormControl,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";

import authStore from "../../../../stores/authStores";

import axios from "axios";

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


const AddTerrorPost = ({ isOpen, onClose }) => {
  const [postTitle, setPostTitle] = useState("");
  const [userPost, setUserPost] = useState("");
  const { user } = authStore();
  const [category, setCategory] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;


  const handleSubmit = async () => {
    if (!user) {
      alert("Please log in to post.");
      return;
    }

    try {
      if (!category) {
        alert("Please select a category.");
        return;
      }

      const postPayload = {
        title: postTitle,
        content: userPost,
        userId: user._id,
        category: category,
      };


      const res = await axios.post(
        `${API_URL}/api/posts`,
        postPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Uploaded post:", res.data);
      resetForm();
      onClose();
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload post.");
    }
  };

  const resetForm = () => {
    setPostTitle("");
    setUserPost("");
    setCategory("");
  };

  return (
    <Modal
      isCentered
      size="2xl"
      isOpen={isOpen}
      onClose={() => {
        resetForm();
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton color="#000" />
        <ModalBody p={5} backgroundColor="#292929" borderRadius={8}>
          <Flex
            flexDirection={"column"}
            gap={10}
            px={5}
            py={4}
          >
            <FormControl>
              <FormLabel color="#FFFFFF" fontWeight={700} fontSize={14}>Share your horror scriest story...</FormLabel>
              <Flex flexDirection={"column"} gap={4}>
                
                <Input
                  type="text"
                  value={postTitle}
                  backgroundColor="#FFFFFF"
                  fontWeight={600}
                  color="#292929"
                  placeholder="Title..."
                  _placeholder={{ color: "#292929" }}
                  fontSize={14}
                  borderRadius={2}
                  onChange={(e) => setPostTitle(e.target.value)}
                />
                
                <FormControl isRequired>
                  <FormLabel color="#FFFFFF" fontWeight={700} fontSize={14}>
                    Choose Category
                  </FormLabel>
                  <Select
                    placeholder="Select category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    backgroundColor="#FFFFFF"
                    color="#292929"
                    fontSize={14}
                    fontWeight={600}
                    borderRadius={2}
                  >
                    {categoryOptions.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <Input
                  type="text"
                  as="textarea"
                  value={userPost}
                  backgroundColor="#FFFFFF"
                  color="#292929"
                  py={2}
                  borderRadius={2}
                  height="50vh"
                  textAlign="left"
                  verticalAlign="top"
                  placeholder="Share something with the community..."
                  _placeholder={{ color: "#FFFFFF" }}
                  onChange={(e) => setUserPost(e.target.value)}
                />
              </Flex>
            </FormControl>

            <Button
              backgroundColor="#A11C2E"
              color="#FFF"
              fontWeight="semi-bold"
              borderRadius={2}
              border={"2px solid #A11C2E"}
              _hover={{ backgroundColor: "#fff", color:"#A11C2E", border:"none" }}
              onClick={handleSubmit}
            >
              Post
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddTerrorPost;
