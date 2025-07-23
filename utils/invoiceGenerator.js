// utils/invoiceGenerator.js
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const generateInvoice = (order) => {
  const invoiceDir = path.join(__dirname, '../invoices');
  if (!fs.existsSync(invoiceDir)) {
    fs.mkdirSync(invoiceDir);
  }

  const filePath = path.join(invoiceDir, `invoice-${order._id}.pdf`);
  const doc = new PDFDocument();

  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(20).text('KEZIAH E-FARMS - INVOICE', { align: 'center' });
  doc.moveDown();

  doc.fontSize(12).text(`Invoice ID: ${order._id}`);
  doc.text(`Customer: ${order.customerName}`);
  doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`);
  doc.moveDown();

  doc.text('Items:', { underline: true });
  order.items.forEach((item, index) => {
    doc.text(`${index + 1}. ${item.name} x${item.quantity} @ GHS ${item.price.toFixed(2)} = GHS ${(item.price * item.quantity).toFixed(2)}`);
  });
  doc.moveDown();

  doc.fontSize(14).text(`Total Amount: GHS ${order.totalAmount.toFixed(2)}`, { bold: true });
  doc.moveDown();

  doc.fontSize(12).text('Contact Information:', { underline: true });
  doc.text(`Phone: ${order.contactInfo?.phone || 'N/A'}`);
  doc.text(`Email: ${order.contactInfo?.email || 'N/A'}`);
  doc.text(`Address: ${order.contactInfo?.address || 'N/A'}`);
  doc.moveDown();

  doc.text('Thank you for your purchase!', { align: 'center' });

  doc.end();

  return filePath;
};

module.exports = generateInvoice;
