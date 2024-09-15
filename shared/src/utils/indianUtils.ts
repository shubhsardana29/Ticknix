export const INDIAN_CITIES = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat'
  ];
  
  export const formatIndianCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };
  
  export const calculateGST = (amount: number, rate: number = 18): number => {
    return amount * (rate / 100);
  };