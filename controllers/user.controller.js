import { userPatchValid, SearchValid } from "../validations/user.valid.js";
import Center from "../models/center.model.js";
import User from "../models/user.model.js";
import { Op } from "sequelize";
import path from "path";
import fs from "fs";
import Reception from "../models/reseption.model.js";
import Resource from "../models/resource.model.js";
import Like from "../models/like.model.js";
import Comment from "../models/comment.model.js";
import Filial from "../models/filial.model.js";
import Major from "../models/major.model.js";

export async function findAll(req, res) {
   try {
      let { take = 5, page, sortBy, sortOrder } = req.query;
      let sort = sortBy || "firstName";
      let order = sortOrder || "ASC";

      let skip = 0;
      if (page) {
         skip = (page - 1) * take;
      }

      skip = JSON.parse(skip);
      take = JSON.parse(take);

      let users = await User.findAll({
         limit: take,
         offset: skip,
         order: [[sort, order]],
         include: [
            Center,
            { model: Reception, include: Filial },
            Comment,
            Resource,
            Like,
         ],
         attributes: { exclude: ["password"] },
      });

      if (!users.length) {
         return res.status(200).json({ message: "Not found users." });
      }

      res.status(200).json({ data: users });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

export async function findOne(req, res) {
   try {
      let { id } = req.params;

      let user = await User.findByPk(id, {
         include: [
            Center,
            Resource,
            Like,
            Comment,
            { model: Reception, include: Filial },
         ],
         attributes: { exclude: ["password"] },
      });
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

      let user = await User.findByPk(id, {
         attributes: { exclude: ["password"] },
      });

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
      let user = await User.findByPk(id, {
         attributes: { exclude: ["password"] },
      });

      if (!user) {
         return res.status(404).json({ message: "Not found user." });
      }

      if (value.role) {
         return res
            .status(403)
            .json({ message: "Not allowed to updated role." });
      }

      if (value.isActive != undefined && req.user.role != "ADMIN") {
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

      let { error, value } = SearchValid.validate(query);
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

      let users = await User.findAll({
         where: query,
         limit: take,
         offset: skip,
         order: [[sort, order]],
         include: [
            Center,
            Resource,
            Like,
            Comment,
            { model: Reception, include: Filial },
         ],
         attributes: { exclude: ["password"] },
      });

      if (!users.length) {
         return res.status(404).json({ message: "Not found users." });
      }

      res.status(200).json({ data: users });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

export async function getAllSeos(req, res) {
   try {
      let query = {};
      for (let [key, value] of Object.entries(req.query)) {
         if (value) {
            query[key] = value;
         }
      }

      let { error, value } = SearchValid.validate(query);
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

      query.role = "CEO";
      let users = await User.findAll({
         where: query,
         limit: take,
         offset: skip,
         order: [[sort, order]],
         include: Center,
         attributes: { exclude: ["password"] },
      });

      if (!users.length) {
         return res.status(404).json({ message: "Not found ceos." });
      }

      res.status(200).json({ data: users });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

export async function getOneSeo(req, res) {
   try {
      let { id } = req.params;

      let user = await User.findOne({
         where: { [Op.and]: [{ id }, { role: "CEO" }] },
         attributes: { exclude: ["password"] },
      });

      if (!user) {
         return res.status(404).json({ message: "Not found ceo." });
      }

      res.status(200).json({ data: user });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

export async function getMyData(req, res) {
   try {
      let { id } = req.user;

      let user = await User.findOne({
         where: { id },
         include: [
            Comment,
            Like,
            Resource,
            { model: Reception, include: [Center, Filial, Major] },
         ],
      }); 

      if (!user) {
         return res.status(404).json({ message: "Not found user." });
      }
      
      res.status(200).json({ data: user });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

export async function getMyCenters(req, res) {
   try {
      let { id } = req.user;

      let centers = await Center.findAll({ where: { seoId: id } });

      if (!centers.length) {
         return res.status(404).json({ message: "Not found centers." });
      }

      res.status(200).json({ data: centers });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

export async function getStudents(req, res) {
   try {
      let { centerId } = req.params;

      let center = await Center.findByPk(centerId);
      if (!center) {
         return res.status(404).json({ message: "Not found data." });
      }

      if (center.seoId != req.user.id && req.user.role != "ADMIN") {
         return res.status(401).json({ message: "Not allowed." });
      }

      let receptions = await Reception.findAll({
         where: { centerId },
         include: [
            { model: User, attributes: { exclude: ["password"] } },
            Filial,
            Major,
         ],
      });

      if (!receptions) {
         return res.status(404).json({ message: "Not found receptions." });
      }

      res.status(200).json({ data: receptions });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}
