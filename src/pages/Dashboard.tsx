import type { OrderDetail } from "../components/OrderContent";
import OrderContent from "../components/OrderContent";
import PrintPreview from "../components/PrintPreview";


export default function Dashboard() {
  const orderDetails: OrderDetail[] = [
    {
      productName: "Apple",
      productAmount: 50,
      supplierId: 1,
      receiverNumberPhone: "123456789",
      address: "New Street 12",
      deliveryAmount: 5,
      driverAmount: 3,
      invoiceNo: "INV-001",
      remark: "Delivered on time",
      status: 5,
    },
    {
      productName: "Banana",
      productAmount: 40,
      supplierId: 2,
      receiverNumberPhone: "987654321",
      address: "Green Avenue 8",
      deliveryAmount: 4,
      driverAmount: 2,
      invoiceNo: "INV-002",
      remark: "Fast delivery",
      status: 1,
    },
    {
      productName: "Apple",
      productAmount: 50,
      supplierId: 1,
      receiverNumberPhone: "123456789",
      address: "New Street 12",
      deliveryAmount: 5,
      driverAmount: 3,
      invoiceNo: "INV-001",
      remark: "Delivered on time",
      status: 5,
    },
    {
      productName: "Banana",
      productAmount: 40,
      supplierId: 2,
      receiverNumberPhone: "987654321",
      address: "Green Avenue 8",
      deliveryAmount: 4,
      driverAmount: 2,
      invoiceNo: "INV-002",
      remark: "Fast delivery",
      status: 1,
    },
    {
      productName: "Apple",
      productAmount: 50,
      supplierId: 1,
      receiverNumberPhone: "123456789",
      address: "New Street 12",
      deliveryAmount: 5,
      driverAmount: 3,
      invoiceNo: "INV-001",
      remark: "Delivered on time",
      status: 5,
    },
    {
      productName: "Banana",
      productAmount: 40,
      supplierId: 2,
      receiverNumberPhone: "987654321",
      address: "Green Avenue 8",
      deliveryAmount: 4,
      driverAmount: 2,
      invoiceNo: "INV-002",
      remark: "Fast delivery",
      status: 1,
    },
    {
      productName: "Apple",
      productAmount: 50,
      supplierId: 1,
      receiverNumberPhone: "123456789",
      address: "New Street 12",
      deliveryAmount: 5,
      driverAmount: 3,
      invoiceNo: "INV-001",
      remark: "Delivered on time",
      status: 5,
    },
    {
      productName: "Banana",
      productAmount: 40,
      supplierId: 2,
      receiverNumberPhone: "987654321",
      address: "Green Avenue 8",
      deliveryAmount: 4,
      driverAmount: 2,
      invoiceNo: "INV-002",
      remark: "Fast delivery",
      status: 1,
    },
    {
      productName: "Apple",
      productAmount: 50,
      supplierId: 1,
      receiverNumberPhone: "123456789",
      address: "New Street 12",
      deliveryAmount: 5,
      driverAmount: 3,
      invoiceNo: "INV-001",
      remark: "Delivered on time",
      status: 5,
    },
    {
      productName: "Banana",
      productAmount: 40,
      supplierId: 2,
      receiverNumberPhone: "987654321",
      address: "Green Avenue 8",
      deliveryAmount: 4,
      driverAmount: 2,
      invoiceNo: "INV-002",
      remark: "Fast delivery",
      status: 1,
    },
  ];

  return (
    <div style={{ padding: "20px"  }}>
      <h1>Dashboard</h1>
      <PrintPreview
        title="Order Details Report"
        content={<OrderContent orderDetails={orderDetails} />}
        fileName="Order_Report.pdf"
      />
    </div>
  );
}
