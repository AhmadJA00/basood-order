import React from "react";
import { Form, Select } from "antd";
import type { Rule } from "antd/es/form";
import type { SelectProps as AntSelectProps } from "antd";
import type { InputName } from "../gloabal.type";
import { useLocation } from "react-router";

interface SelectProps<T extends object> {
  rules?: Rule[];
  name: InputName<T>;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  onSelect?: AntSelectProps["onSelect"];
  label: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  size?: "large" | "middle" | "small";
  showSearch?: boolean;
  optionFilterProp?: string;
  options: { label: string; value: string | number }[];
  allowClear?: boolean;
  multiple?: boolean;
}

const CSelect = <T extends object>({
  name,
  onChange,
  onBlur,
  onSelect,
  label,
  placeholder,
  rules,
  disabled,
  className,
  size = "middle",
  showSearch = true,
  optionFilterProp = "label",
  options,
  allowClear = true,
  multiple = false,
}: SelectProps<T>) => {
  const { pathname } = useLocation();
  const isShow = pathname.includes("show");
  return (
    <Form.Item<T>
      name={name as any}
      rules={rules}
      label={
        <span className="text-primary font-medium !text-xs md:text-base">
          {label}
        </span>
      }
      className={className}
    >
      <Select
        showSearch={showSearch}
        mode={multiple ? "multiple" : undefined}
        optionFilterProp={optionFilterProp}
        options={options}
        placeholder={placeholder || label}
        disabled={isShow || disabled}
        onChange={onChange}
        allowClear={allowClear}
        onBlur={onBlur}
        onSelect={onSelect}
        size={size}
        optionRender={(option) => (
          <div className="text-primary hover:bg-background-nav p-2 !text-xs md:text-base">
            {option.label}
          </div>
        )}
        dropdownClassName="custom-select-dropdown bg-white"
        className="custom-select bg-white !text-xs md:text-base"
      />
    </Form.Item>
  );
};

export default CSelect;
