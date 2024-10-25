import {
    Button,
    DialogActionTrigger,
    DialogBody,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger, Flex, HStack, Input, Textarea, DialogBackdrop, useDisclosure
} from "@chakra-ui/react";
import {BiAddToQueue} from "react-icons/bi";
import {Field} from "./ui/field.tsx";
import {Radio, RadioGroup} from "./ui/radio.tsx";
import {Controller, useForm} from "react-hook-form";
import {toaster} from "./ui/toaster.tsx";
import {User} from "../dummy/dummy.ts";
interface UserCardProps {
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}
interface FormData {
    name: string;
    role: string;
    description: string;
    gender: 'male' | 'female';
}
export default function CreateUserModal({setUsers}: UserCardProps) {
    const { register, control, handleSubmit, reset } = useForm<FormData>({
    });
    const {onClose, open, onOpen} = useDisclosure();
    const genderOptions = [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
    ]

    const onSubmit = async (data: FormData) => {
        try {
            const response = await fetch("http://127.0.0.1:5000/api/friends", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const responseData  = await response.json();
            if(!response.ok) {
                throw new Error(responseData.error);
            }
            toaster.create({
                description: "Contact created successfully!",
                type: "success",
                duration: 2000,
                title: "Yay!",
            })
            reset();
            onClose();
            const newUser = {
                ...data,
                id: responseData.id || Date.now(),
            };
            setUsers((prevUsers) => [...prevUsers, newUser]);
        } catch (error) {
            const errorMessage = error instanceof Error
                ? error.message
                : 'An unknown error occurred'
            toaster.create({
                description: errorMessage,
                type: "error",
                duration: 2000,
                title: "Oh no!",
            })
        }
    }

    return (
        <DialogRoot open={open}>
            <DialogBackdrop />
            <DialogTrigger asChild >
                <Button variant="outline" onClick={onOpen}>
                    <BiAddToQueue/>
                </Button>
            </DialogTrigger>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                        <Controller
                            name="gender"
                            control={control}
                            defaultValue="male"
                            render={({ field }) => (
                                <RadioGroup {...field}>
                                    <HStack gap="6">
                                        {genderOptions.map((option) => (
                                            <Radio key={option.value} value={option.value}>
                                                {option.label}
                                            </Radio>
                                        ))}
                                    </HStack>
                                </RadioGroup>
                            )}
                        />
                    </DialogBody>
                    <DialogFooter>
                        <DialogActionTrigger asChild >
                            <Button variant="outline" onClick={onClose}>Cancel</Button>
                        </DialogActionTrigger>
                        <Button type="submit">Save</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </DialogRoot>
    )
}