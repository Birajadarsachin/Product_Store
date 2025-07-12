import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const toast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token); // 🔐 Save token
      toast({
        title: "Login successful!",
        status: "success",
        isClosable: true,
      });
      window.location.href = "/"; // redirect after login
    } else {
      toast({
        title: "Login failed",
        description: data.message || "Something went wrong",
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.sm" pt={20}>
      <Box p={6} shadow="md" borderWidth="1px" borderRadius="md">
        <Heading mb={6} textAlign="center">
          Log In
        </Heading>
        <form onSubmit={handleLogin}>
          <VStack spacing={4}>
            <Input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <Button type="submit" colorScheme="blue" width="full">
              Log In
            </Button>
          </VStack>
        </form>
      </Box>
    </Container>
  );
}
