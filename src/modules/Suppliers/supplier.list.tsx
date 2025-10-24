import { useLoaderData, useNavigation, useRevalidator } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DataGrid from "../../components/DataGrid";
import Actions, { DeleteButton } from "../../components/Actions";
import { createSupplierAccount, deleteSupplier } from "./supplier.api";
import type { ColumnsType } from "../../gloabal.type";
import type { SupplierResDataType, SupplierResType } from "./supplier.type";
import { Button, Tooltip } from "antd";
import { BiSolidUserAccount } from "react-icons/bi";

export default function List() {
  const data = useLoaderData() as SupplierResType;
  const revalidator = useRevalidator();
  const { t } = useTranslation();
  const navigation = useNavigation();

  const deleteFunction = async (id: string) => {
    try {
      if (id) {
        await deleteSupplier(id);
        revalidator.revalidate();
      }
    } catch (error) {
      const errors = helpers.getErrorObjectKeyValue(error.response.data.errors);
      if (errors.length > 0) {
        errors.forEach((err) => {
          openNotification("error", err.label, err.error as string);
        });
      }
    }
  };
  const createAccount = async (id: string) => {
    try {
      if (id) {
        await createSupplierAccount(id);
        revalidator.revalidate();
      }
    } catch (error) {
      const errors = helpers.getErrorObjectKeyValue(error.response.data.errors);
      if (errors.length > 0) {
        errors.forEach((err) => {
          openNotification("error", err.label, err.error as string);
        });
      }
    }
  };

  const columns = [
    {
      title: t("name"),
      key: "name",
      sorter: true,
      render: (row: SupplierResDataType) => row.name,
    },
    {
      title: t("phoneNumber"),
      key: "phoneNumber",
      sorter: true,
      render: (row: SupplierResDataType) =>
        `${row?.primaryPhone} ${
          row?.secondaryPhone ? ` - ${row?.secondaryPhone}` : ""
        }`,
    },
    {
      title: t("address"),
      key: "address",
      sorter: true,
      render: (row: SupplierResDataType) => row.address,
    },
    {
      title: t("action"),
      key: "action",
      render: (row: SupplierResDataType) => {
        return (
          <div className="flex gap-2">
            <Actions id={row.id} hasShow={false} hasEdit />
            <DeleteButton deleteFunction={() => deleteFunction(row?.id)} />
            <Tooltip title={t(`createAccount`)} color="#003049">
              <Button
                type="primary"
                onClick={() => {
                  createAccount(row.accountId);
                }}
              >
                <BiSolidUserAccount />
              </Button>
            </Tooltip>{" "}
          </div>
        );
      },
    },
  ] as ColumnsType<SupplierResDataType>[];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 text-primary font-semibold">
      <DataGrid<SupplierResDataType>
        title={t("suppliers")}
        columns={columns}
        data={data}
        loading={
          navigation.state === "loading" || revalidator.state === "loading"
        }
        className="mt-4"
      />
    </div>
  );
}
