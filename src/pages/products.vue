<template>
  <v-data-table
    v-model:items="products"
    :headers="headers"
    item-value="name"
    items-per-page="5"
    return-object
    show-select
  >
    <template v-slot:item.product="{ item }">
      <v-row>
        <v-col cols="auto">
          <v-avatar :image="item.thumbnail" rounded="10" size="50"></v-avatar>
        </v-col>
        <v-col cols="auto">
          {{ item.title }} <br />
          {{
            item.description.length > 50
              ? item.description.substring(0, 50) + "..."
              : item.description
          }}
        </v-col>
      </v-row>
    </template>
    <!-- <template v-slot:item.stock="{ item }">
      <v-switch :value="item.stock > 0" hide-details inset></v-switch>
    </template> -->
  </v-data-table>

  <pre>{{ selected }}</pre>
</template>

<script setup lang="ts">
import { Product } from "@/interfaces/auth.interface";
import ProductService from "@/services/product.service";
import { ref } from "vue";

const selected = ref([] as any[]);
const headers: {
  title: string;
  align: "start" | "end" | "center";
  key: string;
  value?: (item: Product) => any;
}[] = [
  {
    title: "Product",
    align: "start",
    key: "product",
  },
  { title: "Category", align: "start", key: "category" },
  {
    title: "Stock",
    align: "end",
    key: "stock",
    value: (item: Product) => (item.stock ? true : false),
  },
  { title: "SKU", align: "end", key: "sku" },
  { title: "Price", align: "end", key: "price" },
  {
    title: "Qty",
    align: "end",
    key: "qty",
    value: (item: Product) => item.stock,
  },
  {
    title: "Status",
    align: "start",
    key: "status",
    value: (item: Product) => item.availabilityStatus,
  },
  { title: "Actions", align: "center", key: "actions" },
];

const products = ref([] as Product[]);
const fetchProducts = async () => {
  products.value = await ProductService.getProducts(100, 0);
};
</script>

<style>
.layout-wrapper.layout-blank {
  flex-direction: column;
}
</style>
