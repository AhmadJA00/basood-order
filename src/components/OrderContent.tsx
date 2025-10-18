import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { OrderStatus } from "../enums";

export interface OrderDetail {
  productName: string;
  productAmount: number;
  supplierId: number;
  receiverNumberPhone: string;
  address: string;
  deliveryAmount: number;
  driverAmount: number;
  invoiceNo: string;
  remark: string;
  status: number;
}

interface OrderContentProps {
  orderDetails: OrderDetail[];
}

const styles = StyleSheet.create({
  table: {
    width: "100%",

  },
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: "row",

    borderColor: "#ccc",
  },
  cellHeader: {
    flex: 1,
    padding: 4,
    fontSize: 11,
    fontWeight: "bold",
  },
  cell: {
    flex: 1,
    padding: 6,
    fontSize: 10,
  },
  total: {
    marginTop: 10,
    textAlign: "right",
    fontSize: 12,
    fontWeight: "bold",
  },
});


const OrderContent: React.FC<OrderContentProps> = ({ orderDetails }) => {
  const totalAmount = orderDetails.reduce(
    (sum, item) =>
      sum + item.productAmount + item.deliveryAmount + item.driverAmount,
    0
  );

  return (
    <View>
      <View style={styles.table}>
        <View style={styles.headerRow}>
            <View style={{width:25}}>
          <Text style={{...styles.cellHeader,width : 25}}>#</Text>
          
          </View>
          <Text style={styles.cellHeader}>Product</Text>
          <Text style={styles.cellHeader}>Amount</Text>
          <Text style={styles.cellHeader}>Delivery</Text>
          <Text style={styles.cellHeader}>Driver</Text>
          <Text style={styles.cellHeader}>Status</Text>
          <Text style={styles.cellHeader}>Invoice No</Text>
          <Text style={styles.cellHeader}>Receiver Phone</Text>
          <Text style={styles.cellHeader}>Address</Text>
          <Text style={styles.cellHeader}>Remark</Text>
        </View>

        {orderDetails.map((item, index) => (
          <View wrap={false} style={{...styles.row, backgroundColor : index %2 === 0 ? "#ffffff" : "#f0f0f0" }} key={index}>
            <View style={{width: 25}}>
            <Text style={{...styles.cell,width:25}}>{index + 1}</Text>
            </View>
            <Text style={styles.cell}>{item.productName}</Text>
            <Text style={styles.cell}>{item.productAmount.toFixed(2)}</Text>
            <Text style={styles.cell}>{item.deliveryAmount.toFixed(2)}</Text>
            <Text style={styles.cell}>{item.driverAmount.toFixed(2)}</Text>
            <Text style={styles.cell}>{OrderStatus.find(e=>e.id === item.status)?.value}</Text>
            <Text style={styles.cell}>{item.invoiceNo}</Text>
            <Text style={styles.cell}>{item.receiverNumberPhone}</Text>
            <Text style={styles.cell}>{item.address}</Text>
            <Text style={styles.cell}>{item.remark}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.total}>Total Amount: ${totalAmount.toFixed(2)}</Text>
    </View>
  );
};

export default OrderContent;
