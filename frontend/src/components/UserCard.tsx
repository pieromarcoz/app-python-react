import {User} from "../dummy/dummy.ts";
import {Box, Card, Flex, Heading, IconButton, Text} from "@chakra-ui/react";
import {Avatar} from "./ui/avatar.tsx";
import {BiTrash} from "react-icons/bi";
import EditModal from "./EditModal.tsx";
import {toaster} from "./ui/toaster.tsx";

interface UserCardProps {
    user: User;
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}
export default function UserCard({user, setUsers}: UserCardProps) {
    const handleDeleteUser = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/api/friends/${user.id}`, {
                method: "DELETE",
            });
            const data = await response.json();
            if(!response.ok) {
                throw new Error(data.error);
            }
            toaster.create({
                description: "Contact deleted successfully!",
                type: "success",
                duration: 2000,
                title: "Yay!",
            })
            setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
        } catch (error) {
            const errorMessage = error instanceof Error
                ? error.message
                : 'An unknown error occurred';
            toaster.create({
                description: errorMessage,
                type: "error",
                duration: 2000,
                title: "Oh no!",
            })
        }
    }
    return (
        <Card.Root>
            <Card.Header>
                <Flex gap={4}>
                    <Flex flex={1} gap={4} alignItems={'center'}>
                        <Avatar src={user.imgUrl} />
                        <Box>
                            <Heading size={'sm'}>{user.name}</Heading>
                            <Text>{user.role}</Text>
                        </Box>
                    </Flex>
                    <Flex>
                        <EditModal user={user} setUsers={setUsers}/>
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