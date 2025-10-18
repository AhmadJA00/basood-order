import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
  PDFViewer,
  PDFDownloadLink,
} from "@react-pdf/renderer";

interface PrintPreviewProps {
  title?: string;
  content: React.ReactNode | (() => React.ReactNode);
  orientation?: "portrait" | "landscape";
  fileName?: string;
}

const PrintPreview: React.FC<PrintPreviewProps> = ({
  title = "Print",
  content,
  orientation = "landscape",
  fileName = "document.pdf",
}) => {
  const styles = StyleSheet.create({
    page: {
      paddingHorizontal: 10,
      marginVertical : 10,
      fontSize: 12,
      paddingLeft : 20,
      paddingRight : 20
    },
    header: {
      position: "absolute",
      top: 0,
      left: 20,
      right: 20,
      height: 40,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottomWidth: 1,
      borderBottomColor: "#aaa",
      paddingBottom: 5,
    },
    logo: {
      width: 40,
      height: 40,
    },
    headerText: {
      fontSize: 16,
      fontWeight: "bold",
    },
    footer: {
      position: "absolute",
      bottom: 20,
      left: 40,
      right: 40,
      display : "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      borderTopWidth: 1,
      paddingTop: 5,
    },
    pageNumber: {
      fontSize: 12,
      color: "grey",
    },
    content: {
      marginTop: 70,
      marginBottom: 50,
    },
    viewerWrapper: {
      width: "100%",
      height: "85vh",
      border: "1px solid #ddd",
      borderRadius: 8,
      overflow: "hidden",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    },
    controls: {
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: 10,
      gap: 10,
    },
    button: {
      backgroundColor: "#2563eb",
      color: "white",
      border: "none",
      borderRadius: 5,
      padding: "6px 12px",
      cursor: "pointer",
      fontSize: 14,
    },
      title: {
    marginBottom: 4,
  },
  });

  // Inner PDF Document component
  const MyDocument = (
    <Document
      title={title}
      author=""
      subject=""
      keywords=""
      creator="react-pdf"
      producer="react-pdf"
    >
      <Page orientation={orientation} size={"A4"} style={styles.page}>
        {/* Header */}
        <View style={styles.header} fixed>
          {false && <Image style={styles.logo} src={""} />}
          <Text style={styles.headerText}>{title}</Text>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {typeof content === "function" ? content() : content}
        </View>

        {/* Footer */}
      <View style={styles.footer} fixed>
        <View style={{width : 60 , height: 30}}>
        <Text style={{ fontSize: 11 }}
        render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} / ${totalPages}`}/>
            </View>
</View>
      </Page>
    </Document>
  );

  return (
    <div className="p-4">
      {/* Controls */}
      <div style={styles.controls}>
        <PDFDownloadLink
          document={MyDocument}
          fileName={fileName}
          style={styles.button}
        >
          {({ loading }) => (loading ? "Preparing..." : "Download PDF")}
        </PDFDownloadLink>
      </div>

      {/* PDF Preview */}
      <div style={styles.viewerWrapper}>
        <PDFViewer width="100%" height="100%" showToolbar={true}>
          {MyDocument}
        </PDFViewer>
      </div>
    </div>
  );
};

export default PrintPreview;
