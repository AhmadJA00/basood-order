import { Form, Radio } from "antd";
import type { Rule } from "antd/es/form";
import type { InputName } from "../gloabal.type";

interface RadioProps<T extends object> {
  rules?: Rule[];
  name: InputName<T>;
  value?: string | number;
  defaultValue?: string | number;
  label: string;
  disabled?: boolean;
  className?: string;
  options: { label: string; value: string | number | boolean }[];
}

const CRadio = <T extends object>({
  name,
  label,
  rules,
  disabled,
  className,
  options,
}: RadioProps<T>) => {
  return (
    <Form.Item<T>
      name={name}
      rules={rules}
      label={<span className="text-primary font-medium">{label}</span>}
      className={className}
    >
      <Radio.Group
        options={options}
        disabled={disabled}
        className={`!rounded-lg !py-1 hover:!border-primary focus:!border-color-primary`}
      />
    </Form.Item>
  );
};

export default CRadio;
