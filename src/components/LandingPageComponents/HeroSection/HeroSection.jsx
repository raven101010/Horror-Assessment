import React from 'react';
import {
  Flex,
  Text,
  VStack,
  Divider,
  Heading,
  Link,
  Image,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const HeroSection = () => {
  return (
    <Flex
      w="100%"
      h={{ base: '80vh', md: '90vh', lg: '110vh' }}
      bg="#000"
      backgroundImage="url('/images/credBg.png')"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      flexDirection="column"
      position="relative"
      p={10}
      overflow="hidden"
    >
      {/* Background Moon Image */}
      <Image
        src="/images/moonbgdark.png"
        alt="Moon"
        position="absolute"
        top={{ base: '10%', md: '15%', lg: '5%' }}
        left={{ base: '55%', md: '50%', lg: '55%' }}
        boxSize={{ base: 'xs', sm: 'sm', lg: '3xl' }}
        zIndex={1}
        pointerEvents="none"
      />

      <Flex
        flex="1"
        px={{ base: 0, lg: 20 }}
        align="center"
        justify="space-between"
        zIndex={2}
      >
        <VStack
          align="flex-start"
          spacing={5}
          maxW="3xl"
          color="white"
          pb={10}
        >
          <Heading
            as="h1"
            fontSize={{ base: '3xl', md: '3rem', lg: '4rem' }}
            fontWeight="bold"
            lineHeight="short"
            fontFamily="Playfair Display"
          >
            Whispers Await <br />
            When You Return
          </Heading>

          <Divider borderColor="white" borderWidth={3} w="80%" />

          <Text
            fontSize={{ base: 'sm', md: 'lg' }}
            color="whiteAlpha.800"
            fontFamily="Poppins"
            w="75%"
          >
            Shadows gather where your thoughts take form. Unearth dark tales, silent opinions, and the month's most chilling horrors. Speak freely, stay hidden, and listen for what lurks beneath.
          </Text>

          <Link
            to="/auth?mode=signup"
            as={RouterLink}
            border="3px solid #C8102E"
            color="white"
            _hover={{ bg: '#C8102E' }}
            px={5}
            py={3}
            rounded="xs"
            fontSize={{ base: 'sm', md: 'lg' }}
            fontWeight={400}
            fontFamily="Poppins"
            mt={8}
          >
            Sign Up
          </Link>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default HeroSection;
