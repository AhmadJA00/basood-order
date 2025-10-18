import JsBarcode from "jsbarcode";

export const generateBarcode = (text: string) => {
  const canvas = document.createElement("canvas");
  JsBarcode(canvas, text, {
    format: "CODE128",       
    displayValue: true,      
    fontSize: 11,            
    textMargin: 2,          
    height: 40,              
    width: 2,                
  });
  return canvas.toDataURL("image/png");
};
