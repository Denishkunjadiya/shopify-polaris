import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    media: {
      type: String,
    },
    category: {
      type: String,
    },
    // Pricing
    price: {
      type: String,
    },
    compareAtPrice: {
      type: String,
    },
    costPerItem: {
      type: String,
    },
    profit: {
      type: String,
    },
    margin: {
      type: String,
    },
    // Inventory
    trackQuantity: {
      type: Boolean,
      default: false,
    },
    // Quantity
    myCustomLocation: {
      type: Number,
    },
    shopLocation: {
      type: Number,
    },
    continueSellingWhenOutOfStock: {
      type: Boolean,
    },
    sku: {
      type: String,
    },
    barcode: {
      type: String,
    },
    // Shipping
    thisIsAPhysicalProduct: {
      type: Boolean,
    },
    weight: {
      type: String,
    },
    status: {
      type: String,
    },
    publishing: {
      type: Array,
    },
    // Product organization
    productOrganization: {
      type: String,
    },
    vendor: {
      type: String,
    },
    collections: {
      type: Array,
    },
    Tags: {
      type: Array,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Products", productSchema, "Products");
