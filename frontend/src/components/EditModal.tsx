import {
    Button, DialogActionTrigger,
    DialogBackdrop,
    DialogBody,
    DialogContent, DialogFooter,
    DialogHeader, DialogRoot,
    DialogTitle,
    DialogTrigger, Flex, HStack, IconButton, Input, Textarea
} from "@chakra-ui/react";
import {BiAddToQueue, BiEditAlt} from "react-icons/bi";
import {Field} from "./ui/field.tsx";
import {Radio, RadioGroup} from "./ui/radio.tsx";
import {useForm} from "react-hook-form";

export default function EditModal() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }
    return (
        <DialogRoot >
            <DialogBackdrop />
            <DialogTrigger asChild>
                <IconButton
                    variant='ghost'
                    colorScheme='red'
                    size={"sm"}
                    aria-label='See menu'
                >
                    <BiEditAlt />
                </IconButton>
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
                        <RadioGroup defaultValue="male" {...register("gender")}>
                            <HStack gap="6">
                                <Radio value="male">Male</Radio>
                                <Radio value="female">Female</Radio>
                            </HStack>
                        </RadioGroup>
                    </DialogBody>
                    <DialogFooter>
                        <DialogActionTrigger asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogActionTrigger>
                        <Button type="submit">Save</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </DialogRoot>
    )
}