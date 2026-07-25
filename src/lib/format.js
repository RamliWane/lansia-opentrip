export const formatNumber = (value) => {
  if (value === null || value === undefined || isNaN(Number(value))) return "0";
  return Number(value).toLocaleString("id-ID");
};

export const formatRupiah = (value) => {
  if (value === null || value === undefined || isNaN(Number(value))) return "Rp 0";
  return `Rp ${Number(value).toLocaleString("id-ID")}`;
};

export const formatDate = (dateStr) => {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
};