import { Op } from "sequelize";
import Resource from "../models/resource.model.js";
import Category from "../models/category.model.js";
import queryValid from "../validations/query.valid.js";
import categoryValid from "../validations/category.valid.js";

async function findAll(req, res) {
  try {
    let { limit = 10, offset = 1, sort, column = "name" } = req.query;

    limit = parseInt(limit);
    offset = Math.max(0, (parseInt(offset) - 1) * limit);

    let query = {limit, offset};
    if (sort === "asc" || sort === "desc") {
        query.order = [[column, sort.toUpperCase()]];
    }
    let data = await Category.findAll({ ...query});

    if (!data.length) {
        return res.status(404).json({ message: "Not Found" });
    }
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req, res) {
  try {
    const { id } = req.params;
    let currentItem = await Category.findByPk(id, { include: [Resource] });
    if (currentItem) {
      res.status(200).json({ data: currentItem });
    } else {
      res.status(404).json({ message: "Category not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
    
  }
}

async function findBySearch(req, res) {
  try {
    let { limit = 10, offset = 1, sort, column = "name", search } = req.query;

    limit = parseInt(limit);
    offset = Math.max(0, (parseInt(offset) - 1) * limit);

    let query = {limit, offset};
    if (sort === "asc" || sort === "desc") {
        query.order = [[column, sort.toUpperCase()]];
    }
    let where = {};
    if (search) {
        where[column] = { [Op.like]: `%${search}%` };
    }

    let allItems = await Category.findAll({...query, where});

    if (allItems) {
      res.status(200).json({ data: allItems, total: allItems.length });
    } else {
      res.status(404).json({ message: "Category not found by search!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    
  }
};
async function create(req, res) {
  try {
    let { error, value } = categoryValid.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    let currentItem = await Category.create(value);
    res.status(201).json({ data: currentItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req, res) {
  try {
    let {id} = req.params;
    let { error, value } = categoryValid.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    let currentItem = await Category.findByPk(id);

    if(currentItem) {
      await currentItem.update(value)
      res.status(200).json({data: currentItem})
    } else {
      res.status(404).json({message: "Category not found which has the ID"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });    
  }
}

async function remove(req, res) {
  try {
    let {id} = req.params;
    let currentItem = await Category.findByPk(id);
    if(currentItem) {
      await currentItem.destroy()
      res.status(200).json({message: "The category was deleted successfully!"})
    } else {
      res.status(404).json({message: "Category not found which has the ID"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { findAll, findOne, findBySearch, create, update, remove };
