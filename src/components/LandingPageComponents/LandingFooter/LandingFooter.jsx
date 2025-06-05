import React from 'react';
import {
  Box,
  Text,
  VStack,
  Link,
  Image,
  Grid,
  Flex,
} from '@chakra-ui/react';

const LandingFooter = () => {
  return (
    <Box
      backgroundColor="#000"
      backgroundImage={"url('/images/credBg.png')"}
      bgSize="cover"
      bgPosition="center"
      py={10}
      px={{ base: 4, md: 6 }}
      id="footer"
      color="white"
    >
      <Flex
        direction={{ base: "column", lg: "row" }}
        align={{ base: "center", lg: "flex-start" }}
        justify="center"
        gap={{ base: 10, lg: 16 }}
        maxW="1200px"
        mx="auto"
        w="100%"
        textAlign={{ base: 'center', lg: 'left' }}
      >
        {/* Logo */}
        <Image
          src="/images/horrorLogo.png"
          alt="HorrorHub"
          h={{ base: "12vh", md: "15vh" }}
          objectFit="contain"
        />

        <Box w="100%" maxW="800px">
          <Grid
            templateColumns={{
              base: '1fr',
              md: '1fr 1fr',
              lg: '1fr 1.4fr 1fr',
            }}
            gap={6}
            fontFamily="Poppins"
            justifyItems={{ base: 'center', lg: 'start' }} 
          >
            {/* Quick Links */}
            <VStack align={{ base: 'center', lg: 'flex-start' }} spacing={2} fontSize="lg">
              <Text color="red.500" fontWeight="bold" fontSize="xl">
                Quick Links
              </Text>
              <Link href="#home">Home</Link>
              <Link href="#about">About</Link>
              <Link href="#contact">Contact</Link>
            </VStack>

            {/* Contact */}
            <VStack align={{ base: 'center', lg: 'flex-start' }} spacing={2} fontSize="lg">
              <Text color="red.500" fontWeight="bold" fontSize="xl">
                Contact
              </Text>
              <Text>+971 55 555 5555</Text>
              <Text>horror.hub112@gmail.com</Text>
            </VStack>

            {/* Follow Us */}
            <VStack align={{ base: 'center', lg: 'flex-start' }} spacing={2} fontSize="lg">
              <Text color="red.500" fontWeight="bold" fontSize="xl">
                Follow Us
              </Text>
              <Link href="#">Instagram</Link>
              <Link href="#">Facebook</Link>
              <Link href="#">Twitter</Link>
            </VStack>
          </Grid>
        </Box>
      </Flex>
    </Box>
  );
};

export default LandingFooter;
