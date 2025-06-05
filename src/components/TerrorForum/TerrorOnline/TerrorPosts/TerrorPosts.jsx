import { Flex } from "@chakra-ui/react";
import TerrorPost from "../TerrorPost/TerrorPost";

const TerrorPosts = ({ posts }) => {
  return (
    <>
      <Flex flexDirection={"column"} align={"center"}>
        {posts.map((post) => (
          <TerrorPost key={post._id} post={post} />
        ))}
      </Flex>
    </>
  );
};

export default TerrorPosts;
