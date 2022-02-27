import { Dispatch, HTMLProps, ReactNode, SetStateAction, useState } from "react";
import { InputField } from "./styles";

type InputProps = HTMLProps<HTMLInputElement> & {
  icon: ReactNode;
  onChangeFc: Dispatch<SetStateAction<any>>
}

export function Input({ icon, onChangeFc, value, ...rest }: InputProps) {
  const [focused, setFocused] = useState(false);
  
  return (
    <InputField isFocused={focused} hasValue={!!value}>
      {icon}
      <input
        type="text"
        placeholder="Email"
        {...rest}
        onChange={({ target }) => onChangeFc(target.value)}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </InputField>
  )
}