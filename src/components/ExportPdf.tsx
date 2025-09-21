// ExportPdf.tsx
import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Props } from '../Services/Objects';
// 👇 must be imported AFTER jsPDF
import autoTable from 'jspdf-autotable';

const ExportPdf: React.FC<Props> = ({ data }) => {
const exportPDF = () => {
const doc = new jsPDF();
// Set font style (normal, bold, italic, bolditalic)
const pageWidth = doc.internal.pageSize.getWidth();
const title = 'Timetable Report';

// Style
doc.setFontSize(20);
doc.setFont('helvetica', 'bold');
doc.setTextColor(40, 40, 40);
doc.setDrawColor(150);
doc.setLineWidth(0.5);
doc.line(10, 20, pageWidth - 10, 20);
const pageHeight = doc.internal.pageSize.getHeight();
const bottomMargin = 40;
const y = pageHeight - bottomMargin;
//doc.text('Text at bottom margin', 14, y);
//Center title
doc.text(title,(pageWidth - doc.getTextWidth(title)) / 2,15);

    const tableColumn = Object.keys(data[0]); // column names from first row
    const tableRows = data.map(row => Object.values(row));
  const headerY = 15;
   doc.text('Timetable Report', 14, headerY);
   autoTable(doc, {
     startY: headerY + 10,
     head: [tableColumn],
     body: tableRows,
      // use theme or styles to change header color
    headStyles: {
      fillColor: [0,105, 195], // header background color
      textColor: [255,255,255], // header text color
    fontStyle: 'bold'
     },
     bodyStyles:{
       textColor:[40, 40, 40] // body text color
    }
    });
    doc.save('Timetable.pdf');
  };

  return (
    <button
      onClick={exportPDF}
      className='btn btn-secondary text-white bg-opacity-10'><i className='bi bi-download mx-1'></i>
    </button>
  );
};
export default ExportPdf;
