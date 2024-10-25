import {Grid} from "@chakra-ui/react";
import {USERS} from "../dummy/dummy.ts";
import UserCard from "./UserCard.tsx";
export default function UserGrid() {
    return (
        <Grid
            templateColumns={{
                base: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
            }}
            gap={6}
        >
            {
                USERS.map((user) => {
                    return (
                        <UserCard
                            key={user.id}
                            user={user}
                       />
                    )
                })
            }
        </Grid>
    )
}