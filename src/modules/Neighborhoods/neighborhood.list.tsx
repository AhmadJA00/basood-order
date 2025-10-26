import { useLoaderData, useNavigation, useRevalidator } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DataGrid from "../../components/DataGrid";
import Actions, { DeleteButton } from "../../components/Actions";
import { deleteNeighborhood } from "./neighborhood.api";
import type { ColumnsType } from "../../gloabal.type";
import type {
  NeighborhoodResDataType,
  NeighborhoodResType,
} from "./neighborhood.type";
import helpers from "../../helpers";
import useNotification from "../../hooks/useNotification";

export default function List() {
  const data = useLoaderData() as NeighborhoodResType;
  const revalidator = useRevalidator();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { openNotification } = useNotification();

  const deleteFunction = async (id: string) => {
    try {
      if (id) {
        await deleteNeighborhood(id);
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
      render: (row: NeighborhoodResDataType) => row.name,
    },
    {
      title: t("city"),
      key: "city",
      sorter: true,
      render: (row: NeighborhoodResDataType) => row?.city?.name,
    },
    {
      title: t("description"),
      key: "description",
      sorter: true,
      render: (row: NeighborhoodResDataType) => row?.description || "-",
    },
    {
      title: t("action"),
      key: "action",
      render: (row: NeighborhoodResDataType) => {
        return (
          <div className="flex gap-2">
            <Actions id={row.id} hasShow={false} hasEdit />
            <DeleteButton deleteFunction={() => deleteFunction(row?.id)} />
          </div>
        );
      },
    },
  ] as ColumnsType<NeighborhoodResDataType>[];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 text-primary font-semibold">
      <DataGrid<NeighborhoodResDataType>
        title={t("neighborhoods")}
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
