import {Container, Stack, Text} from "@chakra-ui/react";
import Navbar from "./components/Navbar.tsx";
import UserGrid from "./components/UserGrid.tsx";
import {useState} from "react";
import {Toaster} from "./components/ui/toaster.tsx";
import {User} from "./dummy/dummy.ts";
export const BASE_URL = import.meta.env.MODE === "development" ? "http://127.0.0.1:5000/api" : "/api"
function App() {
    const [users, setUsers] = useState<User[]>([]); // Tipado correcto
    return (
        <Stack minH={"100vh"}>
            <Navbar users={users} setUsers={setUsers}/>
            <Container maxW={"1200px"} my={4}>
                <Text
                    fontSize={{base: "3xl", md: "50"}}
                    fontWeight={"bold"}
                    letterSpacing={"2px"}
                    textTransform={"uppercase"}
                    textAlign={"center"}
                    mb={8}
                >
                    <Text as={"span"} bgGradient={"to-r"} gradientFrom={"cyan.400"} gradientTo={"blue.500"}
                          bgClip={"text"}>
                        My Contacts
                    </Text>
                    🚀
                </Text>
                <UserGrid users={users} setUsers={setUsers} />
            </Container>
            <Toaster />
        </Stack>
    )
}

export default App
