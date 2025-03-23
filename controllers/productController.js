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

