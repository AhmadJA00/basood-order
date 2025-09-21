import React from "react";
import CInput from "../../modules/Components/CInput";
import helpers from "../helpers";
import { useTranslation } from "react-i18next";
import { Select } from "antd";

interface PhoneInputProps<T extends object> {
  form: any;
  name: keyof T;
  label: string;
  rules?: any;
  countryCodeName?: string;
  required?: boolean;
}

const PhoneNumberInput = <T extends object>({
  name,
  form,
  label,
  rules,
  countryCodeName = "countryCode",
  required = false,
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
      name={name}
      label={label}
      type="number"
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
      addonBefore={
        <Select
          options={helpers.countryPhoneCodes}
          placeholder={t("selectCountryCode")}
          defaultValue={helpers.countryPhoneCodes[0].value}
          onChange={(value) =>
            form.setFieldsValue({ [countryCodeName]: value })
          }
        />
      }
    />
  );
};

export default PhoneNumberInput;
