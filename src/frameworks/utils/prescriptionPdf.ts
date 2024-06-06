import PDFDocument from 'pdfkit';
import { Iprescription } from '../../entity/prescription';
import path from 'path';

export const generatePrescriptionPdf = (
    prescription: Iprescription,
    doctorName: string,
    treatmentName: string,
    subTreatmentName: string,
    consultationDate: string,
    userName: string
): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument();
            const buffers: Buffer[] = [];

            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => {
                const pdfData = Buffer.concat(buffers);
                resolve(pdfData);
            });

            // Add logo to the PDF (replace 'path/to/logo.png' with the actual path to the logo image)
            const logoPath = path.resolve(__dirname, '../../public/logo.png');
            doc.image(logoPath, 50, 50, { width: 100 }); // Adjust the position and size as needed

            // Add date to the top-right corner
            doc.fontSize(12).text(`Date: ${new Date(consultationDate).toLocaleDateString()}`, 50, 50, { align: 'right' });

            // Add patient information and doctor details below the logo and date
            // doc.moveDown()
            doc.fontSize(14).text(`Patient: ${userName}`, 50, 70, { align: 'right' });
            doc.moveDown();
            doc.fontSize(14).text(`Doctor: ${doctorName}`, 50, 90, { align: 'right' });
            doc.moveDown();
            doc.fontSize(14).text(`Treatment: ${treatmentName}`, 50, 110, { align: 'right' });
            doc.moveDown();
            doc.fontSize(14).text(`Sub-Treatment: ${subTreatmentName}`, 50, 130, { align: 'right' });
            // Add an underline
            doc.moveTo(50, 150).lineTo(550, 150).stroke();

            // Add notes centered below the underline
            doc.moveDown().moveDown()
            doc.fontSize(12).text(`Notes:`, { align: 'center' });
            doc.moveDown();
            doc.fontSize(12).text(prescription.notes as string, {
                align: 'center',
                width: 550,
                height: 150
            });

            // Add a bottom underline
            doc.moveTo(50, 600).lineTo(550, 600).stroke();
            doc.moveDown();
            // Add contact information at the bottom
            doc.fontSize(10).text('mob: +91 1234567890', 50, 610, );
            doc.moveDown().moveDown();
            doc.fontSize(10).text('address: Kannur, Kerala', 50, 620, );

            doc.end();
        } catch (error) {
            reject(error);
        }
    });
};
