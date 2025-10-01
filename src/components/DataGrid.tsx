import { Table, type TableProps } from "antd";
import Loading from "./Loading";
import { useSearchParams } from "react-router";
import HeaderTable from "./HeaderTable";
import type { DataGridProps } from "../gloabal.type";

const DataGrid = <T,>({
  columns,
  title,
  hasCreate = true,
  data,
  loading,
  className,
}: DataGridProps<T>) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("currentPage")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;

  const onSortChange = (
    sortField: string,
    sortOrder: "ascend" | "descend" | null
  ) => {
    if (sortOrder) {
      searchParams.set("currentOrderBy", sortField);
      searchParams.set(
        "isAscending",
        sortOrder === "ascend" ? "true" : "false"
      );
    } else {
      searchParams.delete("currentOrderBy");
      searchParams.delete("isAscending");
    }
    setSearchParams(searchParams);
  };

  const onPageChange = (page: number, newPageSize: number) => {
    searchParams.set("currentPage", String(page));
    searchParams.set("pageSize", String(newPageSize));
    setSearchParams(searchParams);
  };

  const handleTableChange: TableProps<T>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    // Handle pagination
    if (
      pagination.current !== currentPage ||
      pagination.pageSize !== pageSize
    ) {
      onPageChange(pagination.current || 1, pagination.pageSize || 10);
    }

    if (sorter && !Array.isArray(sorter)) {
      const { columnKey, order } = sorter;
      onSortChange(columnKey as string, order);
    }
  };

  const pagination = {
    current: currentPage,
    pageSize: pageSize,
    total: data.total,
    showSizeChanger: true,
    showTotal: (total: number) => `Total ${total} items`,
  };

  return (
    <div className={`relative ${className}`}>
      <p className="text-3xl py-2 text-center">{title}</p>
      <div className="relative">
        <Loading isLoading={loading} />
        <HeaderTable hasCreate={hasCreate} />
        <Table
          dataSource={data.items}
          columns={[
            {
              title: "id",
              key: "id",
              dataIndex: "id",
              sorter: true,
            },
            ...columns,
          ]}
          pagination={pagination}
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
};

export default DataGrid;
