import { Op } from "sequelize";
import queryValid from "../validations/query.valid.js";
import Center from "../models/center.model.js";
import Region from "../models/region.model.js";
import regionValid from "../validations/region.valid.js";

async function findAll(req, res) {
   try {
      let { error, value } = queryValid.validate(req.query);

      if (error) {
         return res.status(422).json({ message: error.details[0].message });
      }
      let totalCount = await Region.count();

      const page = value.page || 1;
      const limit = value.limit || 10;
      const offset = (page - 1) * limit;
      const sortOrder = value.sortOrder || "ASC";
      let allItems = await Region.findAll({
         limit: limit,
         offset: offset,
         include: [Center],
         order: [["name", sortOrder]],
      });
      if (allItems) {
         res.status(200).json({ date: allItems, total: totalCount });
      } else {
         res.status(404).json({ message: "Region not found!" });
      }
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

async function findOne(req, res) {
   try {
      const { id } = req.params;
      let currentItem = await Region.findByPk(id, { include: [Center] });
      if (currentItem) {
         res.status(200).json({ data: currentItem });
      } else {
         res.status(404).json({ message: "Region not found!" });
      }
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

async function findBySearch(req, res) {
   try {
      let { error, value } = queryValid.validate(req.query);

      if (error) {
         return res.status(422).json({ message: error.details[0].message });
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

      const totalCount = await Region.count({
         where: filters,
      });

      let currentItems = await Region.findAll({
         where: filters,
         limit: limit,
         offset: offset,
         include: [Center],
         order: [["name", sortOrder]],
      });
      if (currentItems) {
         res.status(200).json({ data: currentItems, total: totalCount });
      } else {
         res.status(404).json({ message: "Region not found by search!" });
      }
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

async function create(req, res) {
   try {
      let { error, value } = regionValid.validate(req.body);
      if (error) {
         return res.status(422).json({ message: error.details[0].message });
      }

      let isExists = await Region.findOne({ where: { name: value.name } });
      if (isExists) {
         return res.status(400).json({ message: "This name already exists." });
      }

      let currentItem = await Region.create(value);
      res.status(201).json({ data: currentItem });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

async function update(req, res) {
   try {
      let { id } = req.params;
      let { error, value } = regionValid.validate(req.body);
      if (error) {
         return res.status(422).json({ message: error.details[0].message });
      }

      if (value.name) {
         let isExists = await Region.findOne({ where: { name: value.name } });
         if (isExists) {
            return res
               .status(400)
               .json({ message: "This name already exists." });
         }
      }

      let currentItem = await Region.findByPk(id);

      if (currentItem) {
         await currentItem.update(value);
         res.status(200).json({ data: currentItem });
      } else {
         res.status(404).json({ message: "Region not found which has the ID" });
      }
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

async function remove(req, res) {
   try {
      let { id } = req.params;

      let currentItem = await Region.findByPk(id);

      if (currentItem) {
         await currentItem.destroy();
         res.status(200).json({
            message: "The region was deleted successfully!",
         });
      } else {
         res.status(404).json({ message: "Region not found which has the ID" });
      }
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

export { findOne, findBySearch, create, update, remove };
