<script setup lang="ts">
const transactions = ref([
  {
    transactionDate: "2023-10-01",
    effectiveDate: "2023-10-02",
    name: "Nguyen Van A",
    accountNumber: "1234567890",
    bankName: "Vietcombank",
    transactionId: "TXN001",
    description: "Chuyen tien",
    amount: "1,000,000 VND",
    balance: "10,000,000 VND",
  },
  // ... thêm 49 dòng dữ liệu tương tự
]);

// Tạo thêm 49 dòng dữ liệu mẫu
for (let i = 2; i <= 50; i++) {
  transactions.value.push({
    transactionDate: `2023-10-${i < 10 ? "0" + i : i}`,
    effectiveDate: `2023-10-${i < 10 ? "0" + (i + 1) : i + 1}`,
    name: `Nguyen Van ${String.fromCharCode(64 + i)}`,
    accountNumber: `12345678${i < 10 ? "0" + i : i}`,
    bankName: "Vietcombank",
    transactionId: `TXN${i < 10 ? "00" + i : "0" + i}`,
    description: "Chuyen tien",
    amount: `${i * 100000} VND`,
    balance: `${10000000 - i * 100000} VND`,
  });
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Basic">
        <VTable fixed-header height="500px">
          <thead>
            <tr class="font-weight-bold">
              <th class="text-uppercase">Ngày giao dịch <br />Ngày hiệu lực</th>
              <th>
                Tên <br />
                Số tài khoản
              </th>
              <th>Tên ngân hàng</th>
              <th>Mã giao dịch<br />Diễn giải</th>
              <th>Số tiền</th>
              <th>Số dư cuối</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(transaction, index) in transactions" :key="index">
              <td>
                {{ transaction.transactionDate }} <br />
                {{ transaction.effectiveDate }}
              </td>
              <td>
                {{ transaction.name }} <br />
                {{ transaction.accountNumber }}
              </td>
              <td>{{ transaction.bankName }}</td>
              <td>
                {{ transaction.transactionId }} <br />
                {{ transaction.description }}
              </td>
              <td>{{ transaction.amount }}</td>
              <td>{{ transaction.balance }}</td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
  </VRow>
</template>
