import Product from "../../model/schema/product.js";

const index = async (req, res) => {
  try {
    const query = req.query;
    query.deleted = false;
    let result = await Product.find(query);
    return res.send(result);
  } catch (err) {
    console.error("Error :", err);
    return res.status(400).json({
      success: false,
      message: "Something wents wrong",
      error: err.toString(),
    });
  }
};

const add = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    return res
      .status(200)
      .json({ message: "Product added successfully", result: product });
  } catch (err) {
    console.error("Failed to add product:", err);
    return res.status(400).json({
      success: false,
      message: "Failed to add product",
      error: err.toString(),
    });
  }
};

const view = async (req, res) => {
  try {
    const productDoc = await Product.findOne({
      _id: req.params.id,
      deleted: false,
    });

    if (!productDoc)
      return res
        .status(404)
        .json({ success: false, message: "No Data Found." });

    return res.send(productDoc);
  } catch (err) {
    console.error("Failed to display:", err);
    return res.status(400).json({
      success: false,
      message: "Failed to display",
      error: err.toString(),
    });
  }
};

const editProduct = async (req, res) => {
  try {
    let result = await Product.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );

    if (result?.modifiedCount > 0) {
      return res
        .status(200)
        .json({ message: "Product updated successfully", result });
    } else {
      return res
        .status(404)
        .json({ message: "Failed to update product", result });
    }
  } catch (err) {
    console.error("Failed to Update product:", err);
    return res.status(400).json({
      success: false,
      message: "Failed to Update product",
      error: err.toString(),
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Product.updateOne(
      { _id: id },
      {
        $set: { deleted: true },
      }
    );

    if (result?.modifiedCount > 0) {
      return res
        .status(200)
        .json({ message: "Product removed successfully", result });
    } else {
      return res
        .status(404)
        .json({ message: "Failed to remove product", result });
    }
  } catch (err) {
    console.error("Failed to delete field ", err);
    return res.status(404).json({
      success: false,
      message: "Failed to remove product",
      error: err.toString(),
    });
  }
};

const deleteManyProduct = async (req, res) => {
  try {
    const validationIds = req.body;
    console.log("validationIds ", validationIds);
    const result = await Product.updateMany(
      { _id: { $in: validationIds } },
      {
        $set: { deleted: true },
      }
    );

    if (result?.modifiedCount > 0) {
      return res
        .status(200)
        .json({ message: "Validations removed successfully", result });
    } else {
      return res
        .status(404)
        .json({ message: "Failed to remove validations", result });
    }
  } catch (err) {
    console.error("Failed to remove validations ", err);
    return res.status(404).json({
      success: false,
      message: "Failed to remove validations",
      error: err.toString(),
    });
  }
};

export default {
  index,
  add,
  view,
  editProduct,
  deleteProduct,
  deleteManyProduct,
};
