import prisma from '../config/prisma.js'

export const insertInventory = async (req, res) => {
    try {
        const { productId, warehouseId, quantity } = req.body;

        if (!productId || !warehouseId || !quantity) {
            return res.status(400).json({ message: 'productId, warehouseId, and quantity are required' });
        }

        // Check if the product exists
        const productExists = await prisma.products.findUnique({
            where: { product_id: productId },
        });

        if (!productExists) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if the warehouse exists (optional validation)
        const warehouseExists = await prisma.warehouses.findUnique({
            where: { warehouse_id: warehouseId },
        });

        if (!warehouseExists) {
            return res.status(404).json({ message: 'Warehouse not found' });
        }

        const inventory = await prisma.inventory.create({
            data: {
                product_id: productId,
                warehouse_id: warehouseId,
                quantity,
                updated_at: new Date(),
            },
        });

        res.status(201).json({ message: 'Inventory added successfully', inventory });
    } catch (error) {
        console.error('Error inserting inventory:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
