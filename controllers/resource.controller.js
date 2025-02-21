import { Op } from "sequelize";
import Category from "../models/category.model.js";
import Resource from "../models/resource.model.js";
import User from "../models/user.model.js";
import queryValid from "../validations/query.valid.js";
import { resourcePatchValid, resourcePostValid } from "../validations/resource.valid.js";

async function findAll(req, res) {
   try {
      let { error, value } = queryValid.validate(req.query);

      if (error) {
         return res.status(400).json({ data: error.details[0].message });
      }

      let page = value.page || 1;
      let limit = value.limit || 10;
      let offset = (page - 1) * limit;
      const sortOrder = value.sortOrder || "ASC";

      let allItems = await Resource.findAll({
         limit: limit,
         offset: offset,
         include: [User, Category],
         order: [["name", sortOrder]],
      });

      let totalCount = await Resource.count();

      if (allItems) {
         res.status(200).json({ data: allItems, total: totalCount });
      } else {
         res.status(404).json({ message: "Resource not found!" });
      }
   } catch (error) {
      res.status(500).json({ message: error.message });
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
      let { name, userId, categoryId, sort } = req.query;
      let { error, value } = queryValid.validate(req.query);

      if (error) {
         return res.status(400).json({ message: error.details[0].message });
      }

      const page = value.page || 1;
      const limit = value.limit || 10;
      const offset = (page - 1) * limit;
      const sortOrder = value.sortOrder || "ASC";

      let sortBy = "name" || sort

      let filters = {};

      if (name) {
         filters.name = {
            [Op.like]: `%${name}%`,
         };
      }

      if (userId) {
         filters.userId = +userId;
      }

      if (categoryId) {
         filters.categoryId = +categoryId;
      }

      let itemsBySearch = await Resource.findAll({
         where: filters,
         limit: limit,
         offset: offset, 
         include: [User, Category],
         order: [[sortBy, sortOrder]],
      });

      const totalCount = await Resource.count({ where: filters });

      if (itemsBySearch) {
         res.status(200).json({ data: itemsBySearch, total: totalCount });
      } else {
         res.status(404).json({ message: "Resource not found!" });
      }
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

async function create(req, res) {
   try {
      let { error, value } = resourcePostValid.validate(req.body);

      if (error) {
         return res.status(400).json({ message: error.details[0].message });
      }

      let userId = req.user.id;

      let categoryId = value.categoryId;

      let isExistCategory = await Category.findByPk(categoryId);
      if(!isExistCategory) {
         return res.status(400).json({message: "The category not found!"})
      }
      let currentItem = await Resource.create({
         userId,
         ...value
      });
      res.status(201).json({ data: currentItem });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

async function update(req, res) {
   try {
      const { id } = req.params;
      let { error, value } = resourcePatchValid.validate(req.body);

      if (error) {
         return res.status(400).json({ message: error.message });
      }

      let currentItem = await Resource.findByPk(id);

      if (!currentItem) {
         return res.status(404).json({ message: "Resource not found!" });
      }

      if (currentItem.id != req.user.id && req.user.role != "admin") {
         return res.status(401).json({ message: "Not allowed." });
      }
      if (value.image) {
         try {
           let filepath = path.join("uploads", currentItem.image);
            fs.unlinkSync(filepath);
         } catch (error) {}
      }; 

      if (value.media) {
         try {
           let filepath = path.join("uploads", currentItem.image);
            fs.unlinkSync(filepath);
         } catch (error) {}
      }; 

      let categoryId = value.categoryId;

      let isExistCategory = await Category.findByPk(categoryId);
      if(!isExistCategory) {
         return res.status(400).json({message: "The category not found!"})
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

      if (currentItem.id != req.user.id && req.user.role != "admin") {
         return res.status(401).json({ message: "Not allowed." });
      }
      try {
         let filepath = path.join("uploads", currentItem.image);
         let filepath2 = path.join("uploads", currentItem.media);
         fs.unlinkSync(filepath);
         fs.unlinkSync(filepath2);
      } catch (error) {}


      await currentItem.destroy();
      res.status(200).json({ message: "Recource was deleted successfully!" });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

export { findAll, findOne, findBySearch, create, update, remove };
