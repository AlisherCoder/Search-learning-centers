import { Op } from "sequelize";
import Category from "../models/category.model.js";
import Resource from "../models/resource.model.js";
import User from "../models/user.model.js";
import queryValid from "../validations/query.valid.js";
import resourceValid from "../validations/resource.valid.js";

async function findAll(req, res) {
  try {
    let { error, value } = queryValid.validate(req.query);

    if (error) {
      return res.status(400).json({ data: error.details[0].message });
    }

    let page = value.page || 1;
    let limit = value.limit || 10;
    let offset = (page - 1) * limit;

    let allItems = await Resource.findAll({
      limit: limit,
      offset: offset,
      include: [User, Category],
    });

    let allItemsCount = await Resource.findAll();

    if (allItems) {
      res.status(200).json({ data: allItems, total: allItemsCount.length });
    } else {
      res.status(404).json({ message: "Resource not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
}

async function findOne(req, res) {
  try {
    let { id } = req.params;
    let currentItem = await Resource.findByPk(id, {
      include: [User, Category],
    });

    if (currentItem) {
      res.status(200).json({ data: currentItem });
    } else {
      res.status(404).json({ message: "Resource not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function findBySearch(req, res) {
  try {
    let {name} = req.query;
    let { error, value } = queryValid.validate(req.query);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const page = value.page || 1;
    const limit = value.limit || 10;
    const offset = (page - 1) * limit;

    let filters = {};

    if (name) {
      filters.name = {
        [Op.like]: `%${name}%`,
      };
    }

    let itemsBySearch = await Resource.findAll({
      where: filters,
      limit: limit,
      offset: offset,
      include: [User, Category],
    });

    const totalCount = await Resource.findAll({where: filters});

    if (itemsBySearch) {
      res.status(200).json({ data: itemsBySearch, total: totalCount.length });
    } else {
      res.status(404).json({ message: "Resource not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
}

async function create(req, res) {
  try {
    let { error, value } = resourceValid.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    let currentItem = await Resource.create(value);
    res.status(201).json({ data: currentItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    let { error, value } = resourceValid.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    let currentItem = await Resource.findByPk(id);

    if (!currentItem) {
      return res.status(404).json({ message: "Category not found!" });
    }

    await currentItem.update(value);
    res.status(200).json({ data: currentItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    let currentItem = await Resource.findByPk(id);

    if (!currentItem) {
      return res.status(404).json({ message: "Resource not found!" });
    }

    await currentItem.destroy();
    res.status(200).json({ message: "Recource was deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export {findAll, findOne, findBySearch, create, update, remove};