'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Customer {
id: number;
name: string;
mobile: string;
address: string;
}

export default function PreviewPage() {
const searchParams = useSearchParams();
const specParam = searchParams.get('spec');

const [spec, setSpec] = useState<any>(null);
const [customers, setCustomers] = useState<Customer[]>([]);
const [showModal, setShowModal] = useState(false);

const [form, setForm] = useState({
name: '',
mobile: '',
address: '',
});

useEffect(() => {
try {
if (specParam) {
setSpec(JSON.parse(decodeURIComponent(specParam)));
}
} catch (e) {
console.error(e);
}

const saved = localStorage.getItem('customers');
if (saved) {
  setCustomers(JSON.parse(saved));
}

}, [specParam]);

useEffect(() => {
localStorage.setItem('customers', JSON.stringify(customers));
}, [customers]);

const addCustomer = () => {
if (!form.name.trim()) {
alert('Customer name is required');
return;
}


const newCustomer: Customer = {
  id: Date.now(),
  name: form.name,
  mobile: form.mobile,
  address: form.address,
};

setCustomers([...customers, newCustomer]);

setForm({
  name: '',
  mobile: '',
  address: '',
});

setShowModal(false);

};

const deleteCustomer = (id: number) => {
setCustomers(customers.filter((c) => c.id !== id));
};

const exportReport = () => {
  if (customers.length === 0) {
    alert('No customer data available');
    return;
  }

  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text(spec?.appName || 'Customer Report', 14, 20);

  doc.setFontSize(11);
  doc.text(
    `Generated on: ${new Date().toLocaleString()}`,
    14,
    30
  );

  autoTable(doc, {
    startY: 40,
    head: [['Name', 'Mobile', 'Address']],
    body: customers.map((c) => [
      c.name,
      c.mobile,
      c.address,
    ]),
    theme: 'grid',
    headStyles: {
      fillColor: [37, 99, 235],
    },
  });

  doc.save(`${spec?.appName || 'customer'}-report.pdf`);
};

if (!spec) {
return (
<main style={{ padding: 40 }}> <h1>No generated app found</h1> </main>
);
}

return (
<main
style={{
minHeight: '100vh',
background: '#F5F7FB',
padding: 40,
}}
>
<div style={{ maxWidth: 1200, margin: '0 auto' }}>
<div
style={{
display: 'flex',
justifyContent: 'space-between',
alignItems: 'center',
marginBottom: 32,
}}
> <div>
<h1
style={{
fontSize: 36,
fontWeight: 800,
marginBottom: 8,
}}
>
{spec.appName} </h1>
<p style={{ color: '#64748B' }}>
AI-generated application preview </p> </div>

      <button
        onClick={() => setShowModal(true)}
        style={{
          padding: '12px 18px',
          background: '#2563EB',
          color: 'white',
          border: 'none',
          borderRadius: 12,
          cursor: 'pointer',
          fontWeight: 600,
        }}
      >
        Add Customer
      </button>
      <button
  onClick={exportReport}
  style={{
    padding: '12px 18px',
    background: '#059669',
    color: 'white',
    border: 'none',
    borderRadius: 12,
    cursor: 'pointer',
    fontWeight: 600,
  }}
>
  Export Report
</button>
    </div>

    <div
      style={{
        display: 'flex',
        gap: 12,
        marginBottom: 24,
      }}
    >
      {spec.features.map((f: string) => (
        <div
          key={f}
          style={{
            padding: '10px 16px',
            background: '#E0E7FF',
            borderRadius: 10,
            fontWeight: 600,
          }}
        >
          {f}
        </div>
      ))}
    </div>

    <div
      style={{
        background: 'white',
        border: '1px solid #E5E7EB',
        borderRadius: 20,
        padding: 24,
      }}
    >
      <h2
        style={{
          fontSize: 24,
          fontWeight: 700,
          marginBottom: 20,
        }}
      >
        Customers
      </h2>

      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
        }}
      >
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: 12 }}>பெயர்</th>
            <th style={{ textAlign: 'left', padding: 12 }}>மொபைல்</th>
            <th style={{ textAlign: 'left', padding: 12 }}>முகவரி</th>
            <th style={{ textAlign: 'left', padding: 12 }}>Action</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td style={{ padding: 12 }}>{customer.name}</td>
              <td style={{ padding: 12 }}>{customer.mobile}</td>
              <td style={{ padding: 12 }}>{customer.address}</td>
              <td style={{ padding: 12 }}>
                <button
                  onClick={() => deleteCustomer(customer.id)}
                  style={{
                    color: '#DC2626',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {customers.length === 0 && (
            <tr>
              <td
                colSpan={4}
                style={{
                  padding: 32,
                  textAlign: 'center',
                  color: '#64748B',
                }}
              >
                No customers added yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    {showModal && (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            background: 'white',
            padding: 24,
            borderRadius: 20,
            width: 420,
          }}
        >
          <h3
            style={{
              fontSize: 22,
              fontWeight: 700,
              marginBottom: 20,
            }}
          >
            Add Customer
          </h3>

          <div
            style={{
              display: 'grid',
              gap: 14,
            }}
          >
            <input
              placeholder='பெயர்'
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              placeholder='மொபைல்'
              value={form.mobile}
              onChange={(e) =>
                setForm({ ...form, mobile: e.target.value })
              }
            />

            <input
              placeholder='முகவரி'
              value={form.address}
              onChange={(e) =>
                setForm({ ...form, address: e.target.value })
              }
            />

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 10,
                marginTop: 12,
              }}
            >
              <button
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                onClick={addCustomer}
                style={{
                  background: '#2563EB',
                  color: 'white',
                }}
              >
                Save Customer
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
</main>

);
}
