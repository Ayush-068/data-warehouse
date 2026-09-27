import { Customer, Product, Order } from '../types';

export function downloadTextFile(filename: string, content: string, mimeType = 'text/plain') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportCustomersCsv(customers: Customer[]) {
  const headers = ['CustomerID', 'Name', 'Email', 'City', 'Country', 'SignupDate'];
  const rows = customers.map(c => [
    c.customerId,
    `"${c.name.replace(/"/g, '""')}"`,
    `"${c.email.replace(/"/g, '""')}"`,
    `"${c.city.replace(/"/g, '""')}"`,
    `"${c.country.replace(/"/g, '""')}"`,
    c.signupDate
  ]);
  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\\n');
  downloadTextFile('raw_customers.csv', csvContent, 'text/csv');
}

export function exportProductsCsv(products: Product[]) {
  const headers = ['ProductID', 'ProductName', 'Category', 'UnitPrice'];
  const rows = products.map(p => [
    p.productId,
    `"${p.productName.replace(/"/g, '""')}"`,
    `"${p.category.replace(/"/g, '""')}"`,
    p.unitPrice.toFixed(2)
  ]);
  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\\n');
  downloadTextFile('raw_products.csv', csvContent, 'text/csv');
}

export function exportOrdersCsv(orders: Order[]) {
  const headers = ['OrderID', 'CustomerID', 'ProductID', 'OrderDate', 'Quantity', 'Discount'];
  const rows = orders.map(o => [
    o.orderId,
    o.customerId,
    o.productId,
    o.orderDate,
    o.quantity,
    o.discount.toFixed(2)
  ]);
  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\\n');
  downloadTextFile('raw_orders.csv', csvContent, 'text/csv');
}
