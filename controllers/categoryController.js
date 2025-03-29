import prisma from '../config/prisma.js';

export const insertCategory = async (req, res) => { 
    try {

        const { category_name } = req.body;

        if (!category_name) {
            return res.status(400).json({ message: 'Category name is required' });
        }

        const category = await prisma.categories.create({
            data: { category_name },
        });

        res.status(201).json({ message: 'Category added successfully', category });
        
    } catch (error) {
        console.error('Error inserting category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { category_id } = req.params;

        if (!category_id) {
            return res.status(400).json({ message: 'Category ID is required' });
        }

        const category = await prisma.categories.findUnique({
            where: { category_id: parseInt(category_id) },
        });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        await prisma.categories.delete({
            where: { category_id: parseInt(category_id) },
        });

        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const { category_id } = req.body;
        const { category_name } = req.body;

        if (!category_name) {
            return res.status(400).json({ message: 'Category name is required' });
        }

        const updatedCategory = await prisma.categories.update({
            where: { category_id: parseInt(category_id) },
            data: { category_name },
        });

        res.status(200).json({
            message: 'Category updated successfully',
            updatedCategory,
        });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const getCategoryById = async (req, res) => {
  try {
    const { category_id } = req.params;  // ✅ Use params instead of body

    if (!category_id) {
      return res.status(400).json({ error: 'Category ID is required' });
    }

    const category = await prisma.categories.findUnique({
      where: { category_id: parseInt(category_id) },
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json({ category });
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ error: 'Failed to retrieve category' });
  }
};
