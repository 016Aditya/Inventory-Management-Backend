import prisma from '../config/prisma.js'
export const insertProduct = async (req, res) => {
    try {   
        const { name, description, categoryId, price, sku } = req.body;

        if (!name || !categoryId || !price || !sku) {
            return res.status(400).json({ message: 'Name, categoryId, price, and SKU are required' });
        }

        const categoryExists = await prisma.categories.findUnique({
            where: { category_id: categoryId },
        });

        if (!categoryExists) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const product = await prisma.products.create({
            data: {
                name,
                description,
                categoryId,
                price,
                sku,
            },
        });

        res.status(201).json({ message: 'Product added successfully', product });
    } catch (error) {
        console.error('Error inserting product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        const product = await prisma.products.findUnique({
            where: { product_id: id },
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await prisma.products.delete({
            where: { product_id: id },
        });

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const editProduct = async (req, res) => {
  const { product_id } = req.params;
  const { name, description, category_id, price, sku } = req.body;

  // Create a data object and only add fields that are provided
  const updateData = {};
  if (name !== undefined) updateData.name = name;
  if (description !== undefined) updateData.description = description;
  if (category_id !== undefined) updateData.category_id = category_id;
  if (price !== undefined) updateData.price = price;
  if (sku !== undefined) updateData.sku = sku;
  updateData.updated_at = new Date();

  if (Object.keys(updateData).length === 1) { // only updated_at present
    return res.status(400).json({ error: 'No fields provided to update' });
  }

  try {
    const updatedProduct = await prisma.products.update({
      where: { product_id: product_id },
      data: updateData,
    });

    res.json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
};


export const getProductById = async (req, res) => {

  try {
    const { product_id } = req.body;
    const product = await prisma.products.findUnique({
      where: { product_id: product_id },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ product });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to retrieve product' });
  }
};

export const getProducts = async (req, res) => {

  try {
    const product = await prisma.products.findMany()
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ product });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to retrieve product' });
  }
};