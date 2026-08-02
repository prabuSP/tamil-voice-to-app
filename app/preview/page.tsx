'use client';

import { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Customer {
id: number;
name: string;
mobile: string;
address: string;
}

export default function PreviewPage() {
const [customers, setCustomers] = useState<Customer[]>([]);
const [showModal, setShowModal] = useState(false);
const [form, setForm] = useState({
name: '',
mobile: '',
address: '',
});

useEffect(() => {
if (typeof window !== 'undefined') {
const saved = window.localStorage.getItem('customers');
if (saved) {
setCustomers(JSON.parse(saved));
}
}
}, []);

useEffect(() => {
if (typeof window !== 'undefined') {
window.localStorage.setItem(
'customers',
JSON.stringify(customers)
);
}
}, [customers]);

const addCustomer = () => {
if (!form.name.trim()) return;


setCustomers([
  ...customers,
  {
    id: Date.now(),
    name: form.name,
    mobile: form.mobile,
    address: form.address,
  },
]);

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
doc.text('Customer Management Report', 14, 20);

autoTable(doc, {
  startY: 30,
  head: [['Name', 'Mobile', 'Address']],
  body: customers.map((c) => [
    c.name,
    c.mobile,
    c.address,
  ]),
});

doc.save('customer-report.pdf');


};

const cardStyle: React.CSSProperties = {
background: '#11162A',
border: '1px solid #20263A',
borderRadius: 20,
padding: 24,
boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
};

return (
<main
style={{
minHeight: '100vh',
background:
'linear-gradient(135deg,#0B1020,#11162A)',
color: 'white',
padding: 40,
}}
>
<div
style={{
maxWidth: 1200,
margin: '0 auto',
}}
>
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
margin: 0,
}}
>
Customer Management </h1>
<p
style={{
color: '#94A3B8',
marginTop: 8,
}}
>
AI-generated application preview </p> </div>


      <div
        style={{
          display: 'flex',
          gap: 12,
        }}
      >
        <button
          onClick={exportReport}
          style={{
            padding: '12px 18px',
            borderRadius: 14,
            border: '1px solid #2A3350',
            background: '#151B2E',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Export PDF
        </button>

        <button
          onClick={() => setShowModal(true)}
          style={{
            padding: '12px 18px',
            borderRadius: 14,
            border: 'none',
            background:
              'linear-gradient(90deg,#2563EB,#7C3AED)',
            color: 'white',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Add Customer
        </button>
      </div>
    </div>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns:
          'repeat(4,minmax(0,1fr))',
        gap: 18,
        marginBottom: 28,
      }}
    >
      <div style={cardStyle}>
        <div
          style={{
            color: '#94A3B8',
          }}
        >
          Customers
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 800,
            marginTop: 10,
          }}
        >
          {customers.length}
        </div>
      </div>

      <div style={cardStyle}>
        <div
          style={{
            color: '#94A3B8',
          }}
        >
          Dashboard
        </div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            marginTop: 10,
          }}
        >
          Active
        </div>
      </div>

      <div style={cardStyle}>
        <div
          style={{
            color: '#94A3B8',
          }}
        >
          CRUD
        </div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            marginTop: 10,
          }}
        >
          Ready
        </div>
      </div>

      <div style={cardStyle}>
        <div
          style={{
            color: '#94A3B8',
          }}
        >
          Reports
        </div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            marginTop: 10,
          }}
        >
          Export
        </div>
      </div>
    </div>

    <div style={cardStyle}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                textAlign: 'left',
                padding: 14,
                color: '#94A3B8',
              }}
            >
              Name
            </th>
            <th
              style={{
                textAlign: 'left',
                padding: 14,
                color: '#94A3B8',
              }}
            >
              Mobile
            </th>
            <th
              style={{
                textAlign: 'left',
                padding: 14,
                color: '#94A3B8',
              }}
            >
              Address
            </th>
            <th
              style={{
                textAlign: 'left',
                padding: 14,
                color: '#94A3B8',
              }}
            >
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td
                style={{
                  padding: 14,
                }}
              >
                {c.name}
              </td>
              <td
                style={{
                  padding: 14,
                }}
              >
                {c.mobile}
              </td>
              <td
                style={{
                  padding: 14,
                }}
              >
                {c.address}
              </td>
              <td
                style={{
                  padding: 14,
                }}
              >
                <button
                  onClick={() =>
                    deleteCustomer(c.id)
                  }
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#F87171',
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
          background:
            'rgba(0,0,0,0.6)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 420,
            background: '#11162A',
            border:
              '1px solid #20263A',
            borderRadius: 20,
            padding: 24,
          }}
        >
          <h3
            style={{
              marginTop: 0,
            }}
          >
            Add Customer
          </h3>

          <div
            style={{
              display: 'grid',
              gap: 12,
            }}
          >
            <input
              placeholder='Name'
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              style={{
                padding: 14,
                borderRadius: 12,
                border:
                  '1px solid #2A3350',
                background: '#0F1425',
                color: 'white',
              }}
            />

            <input
              placeholder='Mobile'
              value={form.mobile}
              onChange={(e) =>
                setForm({
                  ...form,
                  mobile: e.target.value,
                })
              }
              style={{
                padding: 14,
                borderRadius: 12,
                border:
                  '1px solid #2A3350',
                background: '#0F1425',
                color: 'white',
              }}
            />

            <input
              placeholder='Address'
              value={form.address}
              onChange={(e) =>
                setForm({
                  ...form,
                  address: e.target.value,
                })
              }
              style={{
                padding: 14,
                borderRadius: 12,
                border:
                  '1px solid #2A3350',
                background: '#0F1425',
                color: 'white',
              }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 12,
              marginTop: 20,
            }}
          >
            <button
              onClick={() =>
                setShowModal(false)
              }
              style={{
                padding: '10px 16px',
                borderRadius: 12,
                border:
                  '1px solid #2A3350',
                background: '#151B2E',
                color: 'white',
              }}
            >
              Cancel
            </button>

            <button
              onClick={addCustomer}
              style={{
                padding: '10px 16px',
                borderRadius: 12,
                border: 'none',
                background:
                  'linear-gradient(90deg,#2563EB,#7C3AED)',
                color: 'white',
                fontWeight: 700,
              }}
            >
              Save Customer
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
</main>


);
}
