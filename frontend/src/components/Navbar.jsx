import { Button, Container, Flex, HStack, Text, useColorMode } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const navigate = useNavigate();
	const token = localStorage.getItem("token");

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};

	return (
		<Container maxW={"1140px"} px={4}>
			<Flex
				h={16}
				alignItems={"center"}
				justifyContent={"space-between"}
				flexDir={{
					base: "column",
					sm: "row",
				}}
			>
				<Text
					fontSize={{ base: "22", sm: "28" }}
					fontWeight={"bold"}
					textTransform={"uppercase"}
					textAlign={"center"}
					bgGradient={"linear(to-r, cyan.400, blue.500)"}
					bgClip={"text"}
				>
					<Link to={"/"}>Product Store 🛒</Link>
				</Text>

				<HStack spacing={2} alignItems={"center"}>
					{token && (
						<Link to={"/create"}>
							<Button>
								<PlusSquareIcon fontSize={20} />
							</Button>
						</Link>
					)}
					<Button onClick={toggleColorMode}>
						{colorMode === "light" ? <IoMoon /> : <LuSun size='20' />}
					</Button>

					{token ? (
						<Button colorScheme='red' onClick={handleLogout}>
							Logout
						</Button>
					) : (
						<>
							<Link to="/login">
								<Button variant="outline" colorScheme="teal">
									Login
								</Button>
							</Link>
							<Link to="/signup">
								<Button colorScheme="teal">Signup</Button>
							</Link>
						</>
					)}
				</HStack>
			</Flex>
		</Container>
	);
};

export default Navbar;
