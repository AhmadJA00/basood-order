import { Table, TableProps } from "antd";
import Loading from "./Loading";
import React from "react";
import HeaderTable from "./HeaderTable";

type DataGridProps = {
  columns: any[];
  title: string;
  hasCreate?: boolean;
  dataSource: any[];
  loading: boolean;
  className?: string;
  // Server-side props
  total: number; // Total number of items on the server
  onPageChange: (page: number, pageSize: number) => void;
  onSortChange?: (
    sortField: string,
    sortOrder: "ascend" | "descend" | null
  ) => void;
  currentPage: number; // Receive current page from parent
  pageSize: number; // Receive page size from parent
};

const DataGrid: React.FC<DataGridProps> = ({
  columns,
  title,
  hasCreate = true,
  dataSource,
  loading,
  className,
  total,
  onPageChange,
  onSortChange,
  currentPage,
  pageSize,
}) => {
  // Configure columns for server-side sorting
  const sortedColumns = columns.map((col) => {
    if (col.sorter) {
      return {
        ...col,
        // Add sorter configuration and onChange handler
        sorter: true,
        sortOrder: col.dataIndex ? undefined : undefined, // You might want to track active sort
      };
    }
    return col;
  });

  const handleTableChange: TableProps<any>["onChange"] = (
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

    // Handle sorting
    if (onSortChange && sorter && !Array.isArray(sorter)) {
      const { field, order } = sorter;
      onSortChange(field as string, order);
    }
  };

  const pagination = {
    current: currentPage,
    pageSize: pageSize,
    total: total,
    showSizeChanger: true,
    showTotal: (total: number) => `Total ${total} items`,
  };

  return (
    <div className={className}>
      <Loading isLoading={loading} />{" "}
      <HeaderTable title={title} columns={columns} hasCreate={hasCreate} />
      <Table
        dataSource={dataSource}
        columns={sortedColumns}
        pagination={pagination}
        onChange={handleTableChange}
        loading={loading}
      />
    </div>
  );
};

export default DataGrid;
