import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const toast = useToast();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      toast({
        title: "Signup successful",
        status: "success",
        isClosable: true,
      });
      navigate("/");
    } else {
      toast({
        title: "Signup failed",
        description: data.message,
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="md" mt={10}>
      <Box
        bg={useColorModeValue("white", "gray.800")}
        p={8}
        rounded="lg"
        shadow="md"
      >
        <Heading mb={6} textAlign="center">
          Sign Up
        </Heading>
        <form onSubmit={handleSignup}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="********"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </FormControl>
            <Button type="submit" colorScheme="teal" width="full">
              Sign Up
            </Button>
          </VStack>
        </form>
      </Box>
    </Container>
  );
}
