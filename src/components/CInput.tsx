import React from "react";
import { Form, Input, InputNumber } from "antd";
import type { Rule } from "antd/es/form";
import type { InputName } from "../gloabal.type";
import { useLocation } from "react-router";

interface InputProps<T extends object> {
  rules?: Rule[];
  validateFirst?: boolean;
  validateTrigger?: string[];
  name: InputName<T>;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | string
      | number
      | null
  ) => void;
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  type?: string;
  label: string;
  disabled?: boolean;
  className?: string;
  isTextArea?: boolean;
  addonBefore?: string | React.ReactNode;
  hasFeedback?: boolean;
  size?: "large" | "middle" | "small";
  rows?: number;
  textColor?: string;
  placeholder?: string;
  min?: number;
  max?: number;
}

const CInput = <T extends object>({
  name,
  value,
  defaultValue,
  onChange,
  onBlur,
  onKeyDown,
  type = "text",
  label,
  rules,
  validateFirst,
  validateTrigger,
  disabled,
  className,
  isTextArea = false,
  addonBefore,
  hasFeedback = false,
  size = "middle",
  rows = 1,
  placeholder,
  textColor = "var(--color-primary)",
  min,
  max,
}: InputProps<T>) => {
  const InputComponent = isTextArea
    ? Input.TextArea
    : type === "password"
    ? Input.Password
    : type === "number"
    ? InputNumber
    : Input;

  const { pathname } = useLocation();
  const isShow = pathname.includes("show");
  // Handle onChange for different input types
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | string
      | number
      | null
  ) => {
    if (onChange) {
      onChange(e);
    }
  };

  // Handle onChange for InputNumber specifically
  const handleNumberChange = (value: string | number | null) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Form.Item<T>
      name={name as any}
      rules={rules}
      validateFirst={validateFirst}
      validateTrigger={validateTrigger}
      label={
        <span
          className="font-medium !text-xs md:text-base "
          style={{ color: textColor }}
        >
          {label}
        </span>
      }
      className={` ${className}`}
      hasFeedback={hasFeedback}
    >
      {type === "number" ? (
        <InputNumber
          name={String(name)}
          value={value as number}
          disabled={isShow || disabled}
          onChange={handleNumberChange}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          defaultValue={defaultValue as number}
          placeholder={placeholder || label}
          addonBefore={addonBefore}
          size={size}
          min={min}
          max={max}
          className="!bg-blue-sky  !border  !border-solid focus:!border-primary !w-full !text-xs md:text-base"
        />
      ) : (
        <InputComponent
          rows={rows}
          name={String(name)}
          value={value}
          disabled={disabled}
          onChange={handleChange}
          onBlur={onBlur}
          type={type}
          defaultValue={defaultValue}
          placeholder={placeholder || label}
          addonBefore={addonBefore}
          size={size}
          className={`${
            !isTextArea &&
            "!bg-blue-sky  !border  !border-solid focus:!border-primary !w-full !text-xs md:text-base"
          }`}
        />
      )}
    </Form.Item>
  );
};

export default CInput;
