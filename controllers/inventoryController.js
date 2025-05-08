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

export const deleteInventory = async (req, res) => {
    try {
        const { inventory_id } = req.body;

        if (!inventory_id) {
            return res.status(400).json({ message: 'inventoryId is required in the request body' });
        }

        // Check if inventory exists
        const inventoryExists = await prisma.inventory.findUnique({
            where: { inventory_id: parseInt(inventory_id) },
        });

        if (!inventoryExists) {
            return res.status(404).json({ message: 'Inventory not found' });
        }

        // Delete inventory
        await prisma.inventory.delete({
            where: { inventory_id: parseInt(inventory_id) },
        });

        res.status(200).json({ message: 'Inventory deleted successfully' });
    } catch (error) {
        console.error('Error deleting inventory:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getInventoryById = async (req, res) => {
    try {
      const { inventory_id } = req.body;
  
      if (!inventory_id) {
        return res.status(400).json({ error: 'inventory_id is required in the request body' });
      }
  
      const inventory = await prisma.inventory.findUnique({
        where: { inventory_id: parseInt(inventory_id) },
      });
  
      if (!inventory) {
        return res.status(404).json({ error: 'Inventory not found' });
      }
  
      res.json({ inventory });
    } catch (error) {
      console.error('Error fetching inventory:', error);
      res.status(500).json({ error: 'Failed to retrieve inventory' });
    }
  };

  export const getInventories = async (req, res) => {
    try {
      const inventories = await prisma.inventory.findMany();
      res.json({ inventories });
    } catch (error) {
      console.error('Error fetching all inventories:', error);
      res.status(500).json({ error: 'Failed to retrieve inventories' });
    }
  };
  