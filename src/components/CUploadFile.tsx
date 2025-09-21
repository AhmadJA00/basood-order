import React from "react";
import { Form, Upload } from "antd";
import type { Rule } from "antd/es/form";
import { UploadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

interface SelectProps<T extends object> {
  rules?: Rule[];
  name: keyof T;
  form: any;
  accept?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  maxCount?: number;
}

const CUploadFile = <T extends object>({
  name,
  form,
  label,
  rules,
  disabled,
  className,
  accept = "image/*",
  maxCount = 1,
}: SelectProps<T>) => {
  const { t } = useTranslation();
  return (
    <Form.Item<T>
      name={name}
      rules={rules}
      label={
        <span className="text-primary font-medium">
          {t(String(label) || "")}
        </span>
      }
      className={className}
      valuePropName="fileList"
      getValueFromEvent={(e) => {
        if (Array.isArray(e)) return e;
        return e?.fileList || [];
      }}
    >
      <Upload
        listType="picture-card"
        disabled={disabled}
        maxCount={maxCount}
        multiple={maxCount > 1}
        beforeUpload={() => false}
        accept={accept}
        fileList={
          Array.isArray(form.getFieldValue(name))
            ? form.getFieldValue(name)
            : []
        }
        onChange={({ fileList }) => form.setFieldValue(name, fileList)}
        onRemove={() => {
          form.setFieldValue(name, []);
          return true;
        }}
      >
        <div>
          <UploadOutlined />
          <div style={{ marginTop: 8 }}>{t("upload")}</div>
        </div>{" "}
      </Upload>
    </Form.Item>
  );
};

export default CUploadFile;
