import {
    Button, DialogActionTrigger,
    DialogBackdrop,
    DialogBody,
    DialogContent, DialogFooter,
    DialogHeader, DialogRoot,
    DialogTitle,
    DialogTrigger, Flex, IconButton, Input, Textarea, useDisclosure
} from "@chakra-ui/react";
import { BiEditAlt} from "react-icons/bi";
import {Field} from "./ui/field.tsx";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {toaster} from "./ui/toaster.tsx";
import {User} from "../dummy/dummy.ts";

interface UserProps {
    user: User;
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}
export default function EditModal({user, setUsers}: UserProps) {
    const { register, handleSubmit, watch, setValue } = useForm();
    const {onClose, open, onOpen} = useDisclosure();

    useEffect(() => {
        setValue("name", user.name);
        setValue("role", user.role);
        setValue("description", user.description);
    }, [user]);
    const handleEditUser = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/api/friends/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(watch()),
            });
            const data = await response.json();
            setUsers((prevUsers) => prevUsers.map((u) => (u.id === data.id ? data : u)));
            toaster.create({
                title: "User updated",
                description: "User updated successfully",
                type: "success",
                duration: 2000,
            });
            onClose();
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <DialogRoot open={open}>
            <DialogBackdrop />
            <DialogTrigger asChild>
                <IconButton
                    variant='ghost'
                    colorScheme='red'
                    size={"sm"}
                    aria-label='See menu'
                    onClick={onOpen}
                >
                    <BiEditAlt />
                </IconButton>
            </DialogTrigger>
            <form onSubmit={handleSubmit(handleEditUser)}>
                <DialogContent
                    position="fixed"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                >
                    <DialogHeader>
                        <DialogTitle>Mi New Contact</DialogTitle>
                    </DialogHeader>
                    <DialogBody pb="4" spaceY="6">
                        <Flex gap="4">
                            <Field label="Full Name">
                                <Input placeholder="John Doe" {...register("name")} />
                            </Field>
                            <Field label="Role">
                                <Input placeholder="Software Engineer"  {...register("role")} />
                            </Field>
                        </Flex>
                        <Field label={'Description'}>
                            <Textarea placeholder="Tell us about yourself"  {...register("description")} />
                        </Field>
                    </DialogBody>
                    <DialogFooter>
                        <DialogActionTrigger asChild>
                            <Button variant="outline" onClick={onClose}>Cancel</Button>
                        </DialogActionTrigger>
                        <Button type="submit">Update</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </DialogRoot>
    )
}