import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  Text,
  useToast,
  VStack,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import authStores from "../../stores/authStores";

const CredForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Login function from global auth store
  const login = authStores((state) => state.login);
  const toast = useToast();

  // Determine the mode (login or signup) from the query parameter
  const queryParams = new URLSearchParams(location.search);
  const mode = queryParams.get("mode");

  // Toggle between login and signup form based on the mode
  const [isLogin, setIsLogin] = useState(mode !== "signup");

  // Input fields
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State for verification code and email to verify
  const [verificationCode, setVerificationCode] = useState("");
  const [userEmailForVerification, setUserEmailForVerification] = useState("");
  // Modal control for email verification thingy
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Update form mode login or signup
  useEffect(() => {
    setIsLogin(mode !== "signup");
  }, [mode]);

  // Handles login or signup form submission
  const handleAuth = async () => {
    const { username, email, password, confirmPassword } = inputs;

    // check if the fields are filled 
    if (!email || !password || (!isLogin && (!confirmPassword || !username))) {
      toast({
        title: "Missing fields",
        description: "Please fill out all the fields.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Password confirmation thing
    if (!isLogin && password !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const baseUrl = import.meta.env.VITE_API_URL || "https://horror-assessment.onrender.com";
      const url = isLogin ? "/api/login" : "/api/register";

      // Send login or register request
      const res = await fetch(baseUrl + url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
          ...(isLogin ? {} : { username }),
        }),
      });

      let data;
      try {
        data = await res.json();
      } catch (e) {
        data = {};
      }

      if (!res.ok) {
        toast({
          title: "Authentication failed",
          description: data?.error || "Something went wrong.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      if (isLogin) {
        login(data.user);
        toast({
          title: "Login successful",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        navigate("/home?mode=forum");
      } else {
        toast({
          title: "Registration successful",
          description: "Verification code sent to your email.",
          status: "info",
          duration: 3000,
          isClosable: true,
        });
        setUserEmailForVerification(email); // Save email for verify
        onOpen(); // Open modal
      }
    } catch (err) {
      console.error("Auth error:", err);
      toast({
        title: "Network error",
        description: "Please check the console for more details.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Email verification code
  const handleVerifyCode = async () => {
    if (!verificationCode) {
      toast({
        title: "Missing code",
        description: "Please enter the verification code.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const baseUrl = import.meta.env.VITE_API_URL || "https://horror-assessment.onrender.com";
      // Send verification code to server
      const res = await fetch(`${baseUrl}/api/verify-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: userEmailForVerification, code: verificationCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast({
          title: "Verification failed",
          description: data?.error || "Invalid code.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      toast({
        title: "Email verified",
        description: "You can now log in.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
      setIsLogin(true);
    } catch (err) {
      console.error("Verification error:", err);
      toast({
        title: "Network error",
        description: "Please check the console for more details.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Responsive form width based on screen size
  const formWidth = useBreakpointValue({
    base: "100%",
    sm: "90%",
    md: "80%",
    lg: "70%",
  });

  return (
    <>
      <Box w={formWidth} padding={3}>
        <Text
          py={"1rem"}
          fontSize={{ base: "md", sm: "lg", md: "lg" }}
          fontFamily={"Playfair Display"}
          fontWeight={400}
          textAlign="center"
        >
          {isLogin ? (
            <>
              Come closer. The stories have been{" "}
              <Text as="span" fontStyle="italic" color="#c8102e" fontWeight={600}>
                Dying!
              </Text>{" "}
              to meet you.
            </>
          ) : (
            <>
              Better not wait too long. The{" "}
              <Text as="span" fontStyle="italic" color="#c8102e" fontWeight={600}>
                Horror!
              </Text>{" "}
              awaits you.
            </>
          )}
        </Text>

        <VStack gap={5}>
          {!isLogin && (
            <Container maxW="100%">
              <Text fontWeight={500} mb={"0.5rem"}>Username</Text>
              <Input
                borderTopRadius={8}
                borderBottomRadius={1}
                border={".5px solid #FFFFFF"}
                bgColor={"#FFFFFF"}
                boxShadow={"0px 15px 40px 2px rgba(0, 0, 0, 0.1)"}
                placeholder="Enter Username"
                _placeholder={{ color: "#3F3F3F" }}
                fontSize={14}
                _hover={{ borderColor: "#B3192D" }}
                type="text"
                value={inputs.username}
                onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
              />
            </Container>
          )}

          <Container maxW="100%">
            <Text fontWeight={500} mb={"0.5rem"}>Email Address</Text>
            <Input
              borderTopRadius={8}
              borderBottomRadius={1}
              border={".5px solid #FFFFFF"}
              bgColor={"#FFFFFF"}
              boxShadow={"0px 15px 40px 2px rgba(0, 0, 0, 0.1)"}
              placeholder="Enter Email"
              _placeholder={{ color: "#3F3F3F" }}
              fontSize={14}
              _hover={{ borderColor: "#B3192D" }}
              type="email"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
          </Container>

          <Container maxW="100%">
            <Text fontWeight={500} mb={"0.5rem"}>Password</Text>
            <Input
              borderTopRadius={8}
              borderBottomRadius={1}
              border={".5px solid #FFFFFF"}
              bgColor={"#FFFFFF"}
              boxShadow={"0px 15px 40px 2px rgba(0, 0, 0, 0.1)"}
              placeholder="Enter Password"
              _placeholder={{ color: "#3F3F3F" }}
              fontSize={14}
              _hover={{ borderColor: "#B3192D" }}
              type="password"
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            />
          </Container>

          {!isLogin && (
            <Container maxW="100%">
              <Text fontWeight={500} mb={"0.5rem"}>Confirm Password</Text>
              <Input
                borderTopRadius={8}
                borderBottomRadius={1}
                border={".5px solid #FFFFFF"}
                bgColor={"#FFFFFF"}
                boxShadow={"0px 15px 40px 2px rgba(0, 0, 0, 0.1)"}
                placeholder="Confirm Password"
                _placeholder={{ color: "#3F3F3F" }}
                fontSize={14}
                _hover={{ borderColor: "#B3192D" }}
                type="password"
                value={inputs.confirmPassword}
                onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
              />
            </Container>
          )}

          <Container maxW="100%">
            <Button
              w={"full"}
              bg={"#B3192D "}
              border={"none "}
              borderRadius={2}
              boxShadow={"0px 15px 40px 2px rgba(0, 0, 0, 0.1)"}
              color={"#FFFFFF"}
              _hover={{
                bg: "#F5F5F5",
                border: "2px solid #B3192D",
                color: "#0F0F0F",
              }}
              onClick={handleAuth}
            >
              {isLogin ? "Log In" : "Sign Up"}
            </Button>
          </Container>

          <Box mt={-2}>
            <Flex justify={"center"} align={"center"}>
              <Box mx={2} fontWeight={350} fontSize={14} color={"#3f3f3f"}>
                {isLogin ? "Don't have an account?" : "Already have an account?"}
              </Box>
              <Box
                fontWeight={600}
                fontSize={14}
                color={"#B3192D"}
                onClick={() =>
                  navigate(`/auth?mode=${isLogin ? "signup" : "login"}`)
                }
                cursor={"pointer"}
                _hover={{ textDecoration: "underline" }}
              >
                {isLogin ? "Sign Up" : "Log In"}
              </Box>
            </Flex>
          </Box>
        </VStack>
      </Box>

      {/* Email Verification Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Email Verification</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={2}>Enter the verification code sent to your email:</Text>
            <Input
              placeholder="Verification Code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button bgColor={'#A11C2E'} color={'#fff'}  mr={3} onClick={handleVerifyCode} _hover={{ border:'2px solid #A11C2E', color:'#A11C2E', bgColor:'#fff' }}>
              Verify
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CredForm;
