import {Box, Container, Flex} from "@chakra-ui/react";
import {ColorModeButton, useColorModeValue} from "./ui/color-mode.tsx";
import CreateUserModal from "./CreateUserModal.tsx";
import {User} from "../dummy/dummy.ts";
interface NavbarProps {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}
export default function Navbar({ setUsers}: NavbarProps) {
    return (
        <Container maxW={"900px"}>
            <Box
                bg={useColorModeValue("gray.200", "gray.700")}
                px={4}
                my={4}
                borderRadius={5}
            >
                <Flex
                    h={16}
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Flex
                        alignItems="center"
                        justifyContent="center"
                        gap={3}
                        display={{base: "none", sm: "flex"}}
                    >
                        <img src={"/react.png"} alt={"React logo"} width={50} />
                        <img src={"/python.png"} alt={"Python logo"} width={50} />
                    </Flex>
                    <Flex
                        alignItems="center"
                        justifyContent="center"
                        gap={3}
                    >
                        <ColorModeButton/>
                        <CreateUserModal setUsers={setUsers}/>
                    </Flex>
                </Flex>
            </Box>
        </Container>
    )
}