// utils/api.ts
export const getSlots = async () => {
  const res = await fetch("http://localhost:5000/admin/slots"); // Flask running here
  return res.json(); // [{id, type, location, status, etc}]
};
