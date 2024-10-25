import {User} from "../dummy/dummy.ts";
import {Box, Card, Flex, Heading, IconButton, Text} from "@chakra-ui/react";
import {Avatar} from "./ui/avatar.tsx";
import {BiTrash} from "react-icons/bi";
import EditModal from "./EditModal.tsx";

interface UserCardProps {
    user: User;
}
const handleDeleteUser = () => {
    console.log("Delete user");
}
export default function UserCard({user}: UserCardProps) {
    return (
        <Card.Root>
            <Card.Header>
                <Flex gap={4}>
                    <Flex flex={1} gap={4} alignItems={'center'}>
                        <Avatar src="https://avatar.iran.liara.run/public" />
                        <Box>
                            <Heading size={'sm'}>{user.name}</Heading>
                            <Text>{user.role}</Text>
                        </Box>
                    </Flex>
                    <Flex>
                        <EditModal/>
                        <IconButton
                            variant='ghost'
                            colorScheme='red'
                            size={"sm"}
                            aria-label='See menu'
                            onClick={handleDeleteUser}

                        >
                            <BiTrash />
                        </IconButton>
                    </Flex>
                </Flex>
            </Card.Header>
            <Card.Body>
                <Text>{user.description}</Text>
            </Card.Body>
        </Card.Root>
    )
}