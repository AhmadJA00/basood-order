import React from "react";
import { useTranslation } from "react-i18next";
import CInput from "./CInput";
import type { InputName } from "../gloabal.type";

interface PhoneInputProps<T extends object> {
  name: InputName<T>;
  label: string;
  className?: string;
  rules?: any;
  required?: boolean;
  disabled?: boolean;
}

const PhoneNumberInput = <T extends object>({
  name,
  label,
  rules,
  className,
  required = false,
  disabled = false,
}: PhoneInputProps<T>) => {
  const { t } = useTranslation();
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ([8, 9, 27, 13, 46, 37, 38, 39, 40].includes(e.keyCode)) {
      return;
    }

    if (e.ctrlKey && [65, 67, 86, 88].includes(e.keyCode)) {
      return;
    }

    if (e.keyCode >= 48 && e.keyCode <= 57) {
      return;
    }

    if (e.keyCode >= 96 && e.keyCode <= 105) {
      return;
    }

    // Prevent all other keys
    e.preventDefault();
  };
  return (
    <CInput<T>
      className={className}
      name={name}
      disabled={disabled}
      label={label}
      type="phone"
      rules={[
        ...(rules || []),
        { required: required, message: t("pleaseEnterPhoneNumber") },
        () => ({
          validator(_, value) {
            if (value && !/^\d{7,12}$/.test(value)) {
              return Promise.reject(new Error(t("invalidPhoneNumber")));
            }
            return Promise.resolve();
          },
        }),
      ]}
      onKeyDown={handleKeyDown}
    />
  );
};

export default PhoneNumberInput;
