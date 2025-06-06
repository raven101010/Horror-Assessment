import React from 'react';
import {
  Box,
  Flex,
  Text,
  VStack,
  Heading,
  Image,
} from '@chakra-ui/react';

const AboutSection = () => {
  return (
    <Box backgroundColor="#000" pt={0} pb={32}>
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        align="center"
        justify="center"
        gap={10}
        id="about"
      >
        <Box
          flex="1"
          display="flex"
          justifyContent="center"
        >
          <Image
            src="/images/candleAbout.png"
            alt="Candle"
            borderRadius="md"
            maxW={{ base: "250px", md: "350px", lg: "100%" }}
            objectFit="contain"
          />
        </Box>

        <Flex flex="1" justify="center">
          <VStack
            align="start"
            spacing={10}
            color="#F2F2F2"
            fontFamily="Poppins"
            maxW="73%"
            textAlign="left"
            px={{ base: 4, md: 8 }}
          >
            <Heading
              fontFamily="Playfair Display"
              fontSize={{ base: "3xl", md: "4xl", lg: "4rem" }}
            >
              ABOUT US
            </Heading>

            <Box>
              <Text
                fontWeight="bold"
                fontFamily="Playfair Display"
                fontSize={{ base: "xl", md: "2xl" }}
              >
                Hey there, stranger!
              </Text>
              <Text mt={4} fontSize={{ base: "sm", md: "md", lg: "lg" }}>
                We're the voices behind the veil — where horror lovers gather to share tales, reviews, and unspoken truths. No rules, no judgment, just shadows and stories waiting to be told
              </Text>
            </Box>

            <Box>
              <Text
                fontWeight="bold"
                fontSize={{ base: "xl", md: "2xl" }}
                fontFamily="Playfair Display"
              >
                Smile once you see it too late<br />once you see it too late
              </Text>
              <Text mt={4} fontSize={{ base: "sm", md: "md", lg: "lg" }}>
                What lurks here isn't just fiction — it's fear shaped by your thoughts. Post freely, speak anonymously, and beware: the real terror is how much you'll enjoy it
              </Text>
            </Box>
          </VStack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default AboutSection;
