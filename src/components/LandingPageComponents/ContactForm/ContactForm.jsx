import { useState } from 'react';
import {
  Box,
  Input,
  Textarea,
  Button,
  useToast,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Icon
} from '@chakra-ui/react';
import { MdLocationOn, MdEmail, MdPhone } from 'react-icons/md';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const toast = useToast();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/contact", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      toast({ title: 'Message sent!', status: 'success', duration: 3000, isClosable: true });
      setFormData({ name: '', email: '', message: '' });
    } else {
      toast({ title: 'Failed to send.', status: 'error', duration: 3000, isClosable: true });
    }
  };

  return (
    <Box bg="#000" color="white" pt={16} pb={40} px={20} fontFamily='Poppins' id='contact'>
      <Box maxW="1200px" mx="auto">
        <Box mb={5}>
          <Heading
            fontSize={{ base: "3xl", md: "4xl", lg: "4rem" }}
            fontFamily="Playfair Display"
            mb={4}
            textAlign="left"
          >
            CONTACT US, BOO
          </Heading>
          <Text fontSize={{ base: "sm", md: "md", lg: "lg" }} textAlign="left"  maxW={{ base: "90%", md: "100%", lg: "100%" }}>
            We welcome your feedback! Contact us if you have any suggestions
            for improving our website
          </Text>
        </Box>

        <Flex
          direction={{base:'column', md:'row'}}
          justify="center"
          gap={10}
          align="flex-start"
        >
          {/* Left Side - Form */}
          <Box flex="3" w={'100%'} maxW="4xl">
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <Input
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  bg="white"
                  color="black"
                  borderRadius={2}
                  _placeholder={{ color: 'gray.500' }}
                  isRequired
                  w= {'100%'}
                />
                <Input
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  bg="white"
                  color="black"
                  borderRadius={2}
                  _placeholder={{ color: 'gray.500' }}
                  isRequired
                  w= {'100%'}
                />
                <Textarea
                  placeholder="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  bg="white"
                  color="black"
                  borderRadius={2}
                  _placeholder={{ color: 'gray.500' }}
                  rows={10}
                  isRequired
                  w= {'100%'}
                />
                <Box w="100%" textAlign="right">
                  <Button
                    type="submit"
                    bg="#A11C2E"
                    color="white"
                    px={6}
                    _hover={{ bg: '#881023' }}
                    borderRadius={2}
                  >
                    Submit
                  </Button>
                </Box>
              </VStack>
            </form>
          </Box>

          {/* Right Side - Contact Info */}
          <Box flex="1">
            <VStack align="start" spacing={8}>
              <HStack align="start" spacing={4}>
                <Icon as={MdLocationOn} color="#A11C2E" boxSize={8} mt={1} />
                <Box>
                  <Text fontWeight="bold">Location</Text>
                  <Text>Fear street avenue</Text>
                </Box>
              </HStack>
              <HStack align="start" spacing={4}>
                <Icon as={MdEmail} color="#A11C2E" boxSize={7} mt={1} />
                <Box>
                  <Text fontWeight="bold">Email</Text>
                  <Text>horror.hub112@gmail.com</Text>
                </Box>
              </HStack>
              <HStack align="start" spacing={4}>
                <Icon as={MdPhone} color="#A11C2E" boxSize={8} mt={1} />
                <Box>
                  <Text fontWeight="bold">Phone</Text>
                  <Text>+971 55 555 5555</Text>
                </Box>
              </HStack>
            </VStack>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default ContactForm;
