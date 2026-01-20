
export interface SaleEntry {
  id: string;
  date: string;
  cashSales: number;
  cardSales: number;
  expenses: number;
  note: string;
}

export interface DailySummary {
  totalSales: number;
  netIncome: number;
  expenseRatio: number;
}
