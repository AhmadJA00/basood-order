import { useLoaderData, useNavigation, useRevalidator } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DataGrid from "../../components/DataGrid";
import Actions, { DeleteButton } from "../../components/Actions";
import { deleteCity } from "./city.api";
import type { ColumnsType } from "../../gloabal.type";
import type { CityDataType, CityResType } from "./city.type";

export default function List() {
  const data = useLoaderData() as CityResType;
  const revalidator = useRevalidator();
  const { t } = useTranslation();
  const navigation = useNavigation();

  const deleteFunction = async (id: string) => {
    try {
      if (id) {
        await deleteCity(id);
        revalidator.revalidate();
      }
    } catch (error) {
      console.error("Error creating LookingForInvestor:", error);
    }
  };

  const columns = [
    {
      title: t("name"),
      key: "name",
      sorter: true,
      render: (row: CityDataType) => row.name,
    },
    {
      title: t("description"),
      key: "description",
      sorter: true,
      render: (row: CityDataType) => row?.description || "-",
    },
    {
      title: t("action"),
      key: "action",
      render: (row: CityDataType) => {
        return (
          <div className="flex gap-2">
            <Actions id={row.id} hasShow={false} hasEdit />
            <DeleteButton deleteFunction={() => deleteFunction(row?.id)} />
          </div>
        );
      },
    },
  ] as ColumnsType<CityDataType>[];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 text-primary font-semibold">
      <DataGrid<CityDataType>
        title={t("cities")}
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
