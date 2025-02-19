import { userPatchValid, userSearchValid } from "../validations/user.valid.js";
import User from "../models/user.model.js";
import { Op } from "sequelize";
import path from "path";
import fs from "fs";
import Center from "../models/center.model.js";

export async function findAll(req, res) {
   try {
      let { page, take = 10 } = req.query;
      let skip = 0;
      if (page) {
         skip = (page - 1) * take;
      }

      take = JSON.parse(take);
      skip = JSON.parse(skip);

      let users = await User.findAll({
         limit: take,
         offset: skip,
         include: Center,
      });
      if (!users.length) {
         return res.status(200).json({ message: "Not users yet." });
      }

      res.status(200).json({ data: users });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

export async function findOne(req, res) {
   try {
      let { id } = req.params;

      let user = await User.findByPk(id, { include: Center });
      if (!user) {
         return res.status(404).json({ message: "Not found user." });
      }

      res.status(200).json({ data: user });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

export async function remove(req, res) {
   try {
      let { id } = req.params;

      let user = await User.findByPk(id);
      if (!user) {
         return res.status(404).json({ message: "Not found user." });
      }

      await user.destroy();
      try {
         let filepath = path.join("uploads", user.image);
         fs.unlinkSync(filepath);
      } catch (error) {}

      res.status(200).json({ data: user });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

export async function update(req, res) {
   try {
      let { error, value } = userPatchValid.validate(req.body);
      if (error) {
         return res.status(422).json({ message: error.details[0].message });
      }

      let { id } = req.params;
      let user = await User.findByPk(id);

      if (!user) {
         return res.status(404).json({ message: "Not found user." });
      }

      if (value.role) {
         return res
            .status(403)
            .json({ message: "Not allowed to updated role." });
      }

      if (value.isActive != undefined && req.user.role != "admin") {
         return res
            .status(403)
            .json({ message: "Not allowed to updated isActive." });
      }

      if (value.image) {
         try {
            let filepath = path.join("uploads", user.image);
            fs.unlinkSync(filepath);
         } catch (error) {}
      }

      await user.update(value);

      res.status(200).json({ data: user });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

export async function getBySearch(req, res) {
   try {
      let query = {};
      for (let [key, value] of Object.entries(req.query)) {
         if (value) {
            query[key] = value;
         }
      }

      let { error, value } = userSearchValid.validate(query);
      if (error) {
         return res.status(422).json({ message: error.details[0].message });
      }

      let { take = 5, page, sortBy, sortOrder, ...queries } = value;
      let sort = sortBy || "firstName";
      let order = sortOrder || "ASC";

      let skip = 0;
      if (page) {
         skip = (page - 1) * take;
      }

      query = {};
      for (let [key, val] of Object.entries(queries)) {
         if (typeof val != "boolean") {
            query[key] = { [Op.substring]: `%${val}%` };
         } else {
            query[key] = val;
         }
      }

      if (req.user.role == "user" || req.user.role == "seo") {
         query.role = "seo";
      }

      let users = await User.findAll({
         where: query,
         limit: take,
         offset: skip,
         order: [[sort, order]],
         include: Center,
      });

      if (!users.length) {
         return res.status(404).json({ message: "Not found users." });
      }

      res.status(200).json({ data: users });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}
