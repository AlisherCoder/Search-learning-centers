import { Op } from "sequelize";
import Resource from "../models/resource.model.js";
import Category from "../models/category.model.js";
import queryValid from "../validations/query.valid.js";
import {
   categoryPatchValid,
   categoryValid,
} from "../validations/category.valid.js";
import fs from "fs";
import path from "path";

async function findAll(req, res) {
   try {
      let { error, value } = queryValid.validate(req.query);
      if (error) {
         return res.status(422).json({ message: error.details[0].message });
      }

      const { name } = req.query;
      let filter = {};
      if (name) {
         filter.name = {
            [Op.like]: `%${name}%`,
         };
      }

      const page = value.page || 1;
      const limit = value.limit || 20;
      const offset = (page - 1) * limit;
      const sortOrder = value.sortOrder || "ASC";

      let allItems = await Category.findAll({
         where: filter,
         limit: limit,
         offset: offset,
         include: [Resource],
         order: [["name", sortOrder]],
      });

      let total = await Category.count({ where: filter });
      if (allItems) {
         res.status(200).json({ data: allItems, total: total });
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
   }
}

async function create(req, res) {
   try {
      let { error, value } = categoryValid.validate(req.body);
      if (error) {
         return res.status(422).json({ message: error.details[0].message });
      }

      let { name } = req.body;

      let isExist = await Category.findOne({
         where: { name },
      });

      if (isExist) {
         return res.status(400).json({ message: "This name already exist!" });
      }

      let currentItem = await Category.create(value);
      res.status(201).json({ data: currentItem });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

async function update(req, res) {
   try {
      let { id } = req.params;
      let { error, value } = categoryPatchValid.validate(req.body);

      if (error) {
         return res.status(422).json({ message: error.details[0].message });
      }

      let { name } = req.body;
      if (name) {
         let isExist = await Category.findOne({
            where: { name },
         });
         if (isExist) {
            return res
               .status(400)
               .json({ message: "This name already exist!" });
         }
      }

      let currentItem = await Category.findByPk(id);

      if (currentItem) {
         if (value.image) {
            try {
               let filepath = path.join("uploads", currentItem.image);
               fs.unlinkSync(filepath);
            } catch (error) {}
         }
         await currentItem.update(value);
         res.status(200).json({ data: currentItem });
      } else {
         res.status(404).json({
            message: "Category not found which has the ID",
         });
      }
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

async function remove(req, res) {
   try {
      let currentItem = await Category.findByPk(req.params.id);
      if (currentItem) {
         try {
            let filepath = path.join("uploads", currentItem.image);
            fs.unlinkSync(filepath);
         } catch (error) {}

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
   }
}

export { findAll, findOne, create, update, remove };
