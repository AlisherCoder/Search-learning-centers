import { Op } from "sequelize";
import Resource from "../models/resource.model.js";
import Category from "../models/category.model.js";
import queryValid from "../validations/query.valid.js";
import {
   categoryValid,
   categoryPatchValid,
} from "../validations/category.valid.js";
import User from "../models/user.model.js";

async function findAll(req, res) {
   try {
      let { error, value } = queryValid.validate(req.query);

      if (error) {
         return res.status(400).json({ message: error.details[0].message });
      }
      const page = value.page || 1;
      const limit = value.limit || 10;
      const offset = (page - 1) * limit;
      const sortOrder = value.sortOrder || "ASC";

      let allItems = await Category.findAll({
         limit: limit,
         offset: offset,
         include: [Resource],
         order: [["name", sortOrder]],
      });

      let total = await Category.findAll();
      if (allItems) {
         res.status(200).json({ data: allItems, total: total.length });
      } else {
         res.status(404).json({ message: "Category not found!" });
      }
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
      let { error, value } = queryValid.validate(req.query);

      if (error) {
         return res.status(400).json({ message: error.details[0].message });
      }
      const page = value.page || 1;
      const limit = value.limit || 10;
      const offset = (page - 1) * limit;
      const sortOrder = value.sortOrder || "ASC";

      const { name } = req.query;
      let filters = {};
      if (name) {
         filters.name = {
            [Op.like]: `%${name}%`,
         };
      }

      const totalCount = await Category.count({
         where: filters,
      });

      let currentItems = await Category.findAll({
         where: filters,
         limit: limit,
         offset: offset,
         include: [Resource],
         order: [["name", sortOrder]],
      });
      if (currentItems) {
         res.status(200).json({ data: currentItems, total: totalCount });
      } else {
         res.status(404).json({ message: "Category not found by search!" });
      }
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

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
      console.log(error);
   }
}

async function update(req, res) {
   try {
      let { id } = req.params;
      let { error, value } = categoryPatchValid.validate(req.body);

      if (error) {
         return res.status(400).json({ message: error.details[0].message });
      }
      let currentItem = await Category.findByPk(id);

      if (currentItem) {
         await currentItem.update(value);
         res.status(200).json({ data: currentItem });
      } else {
         res.status(404).json({
            message: "Category not found which has the ID",
         });
      }
   } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(error);
   }
}

async function remove(req, res) {
   try {
      let { id } = req.params;
      let { error, value } = categoryValid.validate(req.body);

      if (error) {
         return res.status(400).json({ message: error.details[0].message });
      }
      let currentItem = await Category.findByPk(id);
      if (currentItem) {
         await currentItem.destroy();
         res.status(200).json({
            message: "The category was deleted successfully!",
         });
      } else {
         res.status(404).json({
            message: "Category not found which has the ID",
         });
      }
   } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(error);
   }
}

export { findAll, findOne, findBySearch, create, update, remove };
