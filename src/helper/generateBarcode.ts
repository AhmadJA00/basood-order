import JsBarcode from "jsbarcode";

export const generateBarcode = (text: string , bgColor : string) => {
  const canvas = document.createElement("canvas");
  JsBarcode(canvas, text, {
    format: "CODE128",       
    displayValue: true,      
    fontSize: 14,            
    textMargin: 2,          
    height: 30,              
    width: 2, 
    background : bgColor              
  });
  return canvas.toDataURL("image/png");
};