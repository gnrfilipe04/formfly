import { useController, useFormContext } from "react-hook-form";
import { TextInput, TextInputProps } from "react-native";

type ControlledInputProps = {
    name: string;
} & TextInputProps

export function ControlledInput({ name, defaultValue, ...props }: ControlledInputProps){
    const { control } = useFormContext();

    const { field } = useController({
        control,
        defaultValue,
        name,
    });

    return (
        <TextInput 
            {...props}
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
        />
    )
}