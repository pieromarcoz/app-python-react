import {Flex, Grid, Spinner, Text} from "@chakra-ui/react";
import UserCard from "./UserCard.tsx";
import {useEffect, useState} from "react";
import {User} from "../dummy/dummy.ts";

interface UserGridProps {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}
export default function UserGrid({users, setUsers} : UserGridProps) {
    const [isLoading, setIsLoading] = useState(false);
    const $apiUrl = import.meta.env.VITE_API_URL;
    useEffect(() => {
        const getUsers = async () => {
            try {
                setIsLoading(true);
                const response = await fetch($apiUrl + "/friends");
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        getUsers();
    }, [setUsers]);
    return (
        <>
            <Grid
                templateColumns={{
                    base: "1fr",
                    md: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)",
                }}
                gap={4}
            >
                {users.map((user) => (
                    <UserCard key={user.id} user={user} setUsers={setUsers}/>
                ))}
            </Grid>

            {isLoading && (
                <Flex justifyContent={"center"} alignItems={"center"} h={"100%"}>
                    <Spinner size={"xl"} />
                </Flex>
            )}
            {!isLoading && users.length === 0 && (
                <Flex justifyContent={"center"}>
                    <Text fontSize={"xl"}>
                        <Text as={"span"} fontSize={"2xl"} fontWeight={"bold"} mr={2}>
                            Poor you! 🥺
                        </Text>
                        No friends found.
                    </Text>
                </Flex>
            )}
        </>
    )
}