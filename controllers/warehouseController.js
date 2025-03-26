import prisma from '../config/prisma.js';

export const insertWarehouse = async (req, res) => {
    try {
        const { name, location } = req.body;

        if (!name || !location) {
            return res.status(400).json({ message: 'Name and location are required' });
        }

        const warehouse = await prisma.warehouses.create({
            data: {
                name,
                location,
                created_at: new Date().toISOString(), // storing current timestamp as string
            },
        });

        res.status(201).json({ message: 'Warehouse added successfully', warehouse });
    } catch (error) {
        console.error('Error inserting warehouse:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteWarehouse = async (req, res) => {
    try {
        const { warehouse_id } = req.body;

        if (!warehouse_id) {
            return res.status(400).json({ message: 'Warehouse ID is required' });
        }

        const warehouse = await prisma.warehouses.findUnique({
            where: { warehouse_id: parseInt(warehouse_id) },
        });

        if (!warehouse) {
            return res.status(404).json({ message: 'Warehouse not found' });
        }

        await prisma.warehouses.delete({
            where: { warehouse_id: parseInt(warehouse_id) },
        });

        res.status(200).json({ message: 'Warehouse deleted successfully' });
    } catch (error) {
        console.error('Error deleting warehouse:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getWarehouseById = async (req, res) => {
    try {
      const { warehouse_id } = req.body;
      const warehouse = await prisma.warehouses.findUnique({
        where: { warehouse_id: warehouse_id },
      });
  
      if (!warehouse) {
        return res.status(404).json({ error: 'Warehouse not found' });
      }
  
      res.json({ warehouse });
    } catch (error) {
      console.error('Error fetching warehouse:', error);
      res.status(500).json({ error: 'Failed to retrieve warehouse' });
    }
  };
  