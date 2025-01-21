import { PaginatedResponse, Product } from "@/interfaces/auth.interface";
import axiosInstance from "@/plugins/customer-plugins/axios";

class ProductService {
  async getProducts(limit: number, skip: number): Promise<Product[]> {
    const response = await axiosInstance.get<PaginatedResponse<Product>>(
      `products?limit=${limit}&${skip}=10&select=id,thumbnail,images,title,description,category,sku,price,stock,availabilityStatus`
    );
    console.log("Response data: ", response.data);
    console.log("Product data: ", response.data.products);
    return response.data.products;
  }
}

export default new ProductService();
