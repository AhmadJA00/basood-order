export const OrderStatus = [
  { id: 1, value: "Order Pending", kurdish: "داواکاری چاوەڕوانە", color: "#FFA500" }, // orange
  { id: 2, value: "Driver Received", kurdish: "شوفێر وەرگرت", color: "#007BFF" }, // blue
  { id: 3, value: "Office Received", kurdish: "ئۆفیس وەرگرت", color: "#0056B3" }, // dark blue
  { id: 4, value: "Driver Pending", kurdish: "شوفێر چاوەڕوانە", color: "#17A2B8" }, // teal
  { id: 5, value: "Driver Pick Up", kurdish: "شوفێر بارەکە وەرگرت", color: "#20C997" }, // greenish
  { id: 6, value: "Postpone", kurdish: "دواخراو", color: "#6C757D" }, // gray
  { id: 7, value: "Partially Delivered", kurdish: "بەشێك نێردرا", color: "#FFC107" }, // yellow
  { id: 8, value: "Delivered", kurdish: "نێردرا", color: "#28A745" }, // green
  { id: 9, value: "Cancelled", kurdish: "هەڵوەشاوە", color: "#DC3545" }, // red
  { id: 10, value: "Cancelled Office Received", kurdish: "هەڵوەشاوە - ئۆفیس وەرگرت", color: "#C82333" }, // dark red
  { id: 11, value: "Partially Cancelled Office Received", kurdish: "بەشێك هەڵوەشاوە - ئۆفیس وەرگرت", color: "#E4606D" },
  { id: 12, value: "Cancelled Driver Received", kurdish: "هەڵوەشاوە - شوفێر وەرگرت", color: "#B21F2D" },
  { id: 13, value: "Partially Cancelled Driver Received", kurdish: "بەشێك هەڵوەشاوە - شوفێر وەرگرت", color: "#E57373" },
  { id: 14, value: "Payment Processing", kurdish: "پارەدان لە پڕۆسەدایە", color: "#6610F2" }, // purple
  { id: 15, value: "Partially Payment Processing", kurdish: "بەشێك لە پارەدان لە پڕۆسەدایە", color: "#9B59B6" }, // light purple
  { id: 16, value: "Cancelled Supplier Received", kurdish: "هەڵوەشاوە - دابینکەر وەرگرت", color: "#E74C3C" },
  { id: 17, value: "Partially Cancelled Supplier Received", kurdish: "بەشێك هەڵوەشاوە - دابینکەر وەرگرت", color: "#F1948A" },
  { id: 18, value: "Completed", kurdish: "تەواو بوو", color: "#198754" }, // dark green
] as const;
