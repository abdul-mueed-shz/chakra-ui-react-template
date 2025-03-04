import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sales: [
    {
      title: "Sales Module",
      modules: [
        { label: "Sales Entry", path: "/sales/entry" },
        { label: "Sales Record", path: "/sales/record" },
        { label: "Invoice Search / Print", path: "/sales/invoice-search" },
        { label: "Customer Entry", path: "/sales/customer-entry" },
        { label: "Customer List", path: "/sales/customer-list" },
        { label: "Raffle Ticket Record", path: "/tickets" },
        {
          label: "Raffle Draw",
          path: "/draws",
        },
        { label: "Find Winner", path: "/sales/find-winner" },
        { label: "Draw History", path: "/draws/history" },
        { label: "Raffle Winners", path: "/sales/raffle-winners" },
      ],
    },
  ],
  accounts: [
    {
      title: "Merchant Management",
      modules: [
        {
          label: "Create Merchant",
          path: "/merchants/details",
          query: { action: "create" },
        },
        { label: "Merchant List", path: "/merchants" },
      ],
    },
    {
      title: "Cash Management",
      modules: [
        { label: "Payment Collection Entry", path: "/accounts/payment-entry" },
        { label: "Cash Information", path: "/accounts/cash-info" },
        { label: "Cash Collection Entry", path: "/accounts/cash-collection" },
        { label: "Expenses Entry", path: "/accounts/expenses-entry" },
      ],
    },
    {
      title: "Customer Transactions",
      modules: [
        { label: "Customer Payment", path: "/accounts/customer-payment" },
        { label: "Business Monitor Page", path: "/accounts/business-monitor" },
        { label: "Cash Transaction Report", path: "/accounts/cash-report" },
      ],
    },
    {
      title: "Agent Payments",
      modules: [
        { label: "Agent Payment", path: "/accounts/agent-payment" },
        {
          label: "Agent Payment Record",
          path: "/accounts/agent-payment-record",
        },
      ],
    },
    {
      title: "Balance Management",
      modules: [
        { label: "Balance Entry", path: "/accounts/balance-entry" },
        { label: "Incentive Entry", path: "/accounts/incentive-entry" },
        { label: "Balance Transfer", path: "/accounts/balance-transfer" },
        { label: "Transfer Record", path: "/accounts/transfer-record" },
        { label: "Balance List", path: "/accounts/balance-list" },
        { label: "Balance Ledger", path: "/accounts/balance-ledger" },
        { label: "Balance Statement", path: "/accounts/balance-statement" },
      ],
    },
  ],
  finance: [
    {
      title: "Banking Operations",
      modules: [
        { label: "Bank Information Entry", path: "/finance/bank-entry" },
        { label: "Bank List", path: "/finance/bank-list" },
        { label: "Bank Transaction List", path: "/finance/bank-transactions" },
      ],
    },
    {
      title: "Account Management",
      modules: [
        { label: "Bank Balance Page", path: "/finance/bank-balance" },
        { label: "Bank Account Update", path: "/finance/bank-update" },
        { label: "Bank Statement", path: "/finance/bank-statement" },
      ],
    },
    {
      title: "Cheque Handling",
      modules: [
        { label: "Cheque Entry", path: "/finance/cheque-entry" },
        { label: "Cheque Reminder", path: "/finance/cheque-reminder" },
        { label: "Cheque List", path: "/finance/cheque-list" },
      ],
    },
  ],
  hr: [
    {
      title: "Employee Management",
      modules: [
        { label: "Employee Information Entry", path: "/hr/employee-entry" },
        { label: "Employee List", path: "/hr/employee-list" },
      ],
    },
  ],
};
const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, action) => {
      state.modules = action.payload.modules;
    },
  },
});

export const { setModules } = modulesSlice.actions;
export default modulesSlice.reducer;
