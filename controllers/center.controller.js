import { centerPatchValid, centerPostValid, Searchvalid } from "../validations/center.valid.js";
import MajorItem from "../models/majorItem.model.js";
import Center from "../models/center.model.js";
import Major from "../models/major.model.js";
import Comment from "../models/comment.model.js";
import path from "path";
import fs from "fs";
import { Op } from "sequelize";
import Region from "../models/region.model.js";
import User from "../models/user.model.js";
import Filial from "../models/filial.model.js";
import Like from "../models/like.model.js";
import likeValid from "../validations/like.valid.js";
import starValid from "../validations/star.valid.js";
import { Sequelize } from "sequelize";
import Reception from "../models/reseption.model.js";

export async function findAll(req, res) {
   try {
      let { error, value } = Searchvalid.validate(req.query);
      if (error) {
         return res.status(422).json({ message: error.details[0].message });
      }

      let { take = 20, page, sortBy, sortOrder, ...queries } = value;
      let sort = sortBy || "name";
      let order = sortOrder || "ASC";

      let skip = 0;
      if (page) {
         skip = (page - 1) * take;
      }

      let query = {};
      for (let [key, val] of Object.entries(queries)) {
         if (typeof val == "string") {
            query[key] = { [Op.substring]: `%${val}%` };
         } else {
            query[key] = val;
         }
      }

      let centers = await Center.findAll({
         where: query,
         limit: take,
         offset: skip,
         order: [[sort, order]],
         include: [
            { model: User, attributes: { exclude: ["password"] } },
            Major,
            Region,
            {
               model: Filial,
               include: Region,
            },
            {
               model: Comment,
               include: [{ model: User, attributes: { exclude: ["password"] } }],
            },
            Like,
            Reception,
         ],
      });

      if (!centers.length) {
         return res.status(404).json({ message: "Not found learning centers." });
      }

      res.status(200).json({ data: centers });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

export async function findOne(req, res) {
   try {
      let { id } = req.params;

      let center = await Center.findByPk(id, {
         include: [
            { model: User, attributes: { exclude: ["password"] } },
            Major,
            Region,
            {
               model: Filial,
               include: Region,
            },
            {
               model: Comment,
               include: [{ model: User, attributes: { exclude: ["password"] } }],
            },
            Like,
            Reception,
         ],
      });

      if (!center) {
         return res.status(404).json({ message: "Not found learning center." });
      }

      res.status(200).json({ data: center });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

export async function create(req, res) {
   try {
      let { error, value } = centerPostValid.validate(req.body);
      if (error) {
         return res.status(422).json({ message: error.details[0].message });
      }

      let isExists = await Center.findOne({ where: { name: value.name } });
      if (isExists) {
         return res.status(400).json({ message: "This name already exists." });
      }

      let region = await Region.findByPk(value.regionId);
      if (!region) {
         return res.status(400).json({ message: "Not found region." });
      }

      let { majorsId } = value;
      for (let id of majorsId) {
         let major = await Major.findByPk(id);
         if (!major) {
            return res.status(400).json({ message: "Not found major." });
         }
      }

      let created = await Center.create({ ...value, seoId: req.user.id });
      let majoritem = await MajorItem.bulkCreate(majorsId.map((id) => ({ majorId: id, centerId: created.id })));

      res.status(200).json({ data: created });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

export async function remove(req, res) {
   try {
      let { id } = req.params;

      let center = await Center.findByPk(id);
      if (!center) {
         return res.status(404).json({ message: "Not found learning center." });
      }

      if (center.seoId != req.user.id && !["ADMIN", "SUPERADMIN"].includes(req.user.role)) {
         return res.status(401).json({ message: "Not allowed." });
      }

      await center.destroy();
      try {
         let filepath = path.join("uploads", center.image);
         fs.unlinkSync(filepath);
      } catch (error) {}

      res.status(200).json({ data: center });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

export async function update(req, res) {
   try {
      let { error, value } = centerPatchValid.validate(req.body);
      if (error) {
         return res.status(422).json({ message: error.details[0].message });
      }

      let { id } = req.params;
      let center = await Center.findByPk(id);

      if (!center) {
         return res.status(404).json({ message: "Not found learning center." });
      }

      if (center.seoId != req.user.id && (req.user.role != "ADMIN" || req.user.role != "SUPERADMIN")) {
         return res.status(401).json({ message: "Not allowed." });
      }

      if (value.name) {
         let isExists = await Center.findOne({ where: { name: value.name } });
         if (isExists) {
            return res.status(400).json({ message: "This name already exists." });
         }
      }

      if (value.image) {
         try {
            let filepath = path.join("uploads", center.image);
            fs.unlinkSync(filepath);
         } catch (error) {}
      }

      await center.update(value);

      res.status(200).json({ data: center });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

export async function findByLike(req, res) {
   try {
      let { error, value } = likeValid.validate(req.query);

      if (error) {
         return res.status(400).json({ message: error.details[0].message });
      }

      const pageLike = parseInt(value.pageLike) || 1;
      const limitLike = parseInt(value.limitLike) || 20;
      const sortOrder = value.sortOrder?.toUpperCase() === "ASC" ? "ASC" : "DESC";

      const offset = (pageLike - 1) * limitLike;

      let centers = await Center.findAll({
         attributes: ["id", [Sequelize.fn("COUNT", Sequelize.col("likes.id")), "likeCount"], "name", "phone", "address", "image"],
         include: [
            Region,
            {
               model: Like,
               attributes: [],
            },
         ],
         group: ["centers.id"],
         order: [[Sequelize.literal("likeCount"), sortOrder]],
         limit: limitLike,
         offset: offset,
         subQuery: false,
      });

      res.status(200).json(centers);
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
   }
}

export async function findByStar(req, res) {
   try {
      let { error, value } = starValid.validate(req.query);

      if (error) {
         return res.status(400).json({ message: error.details[0].message });
      }

      const maxStar = value.maxStar || 5;
      const minStar = value.minStar || 0;

      let centers = await Center.findAll({
         include: [
            Comment,
            {
               model: Comment,
               attributes: [],
            },
         ],
         attributes: {
            include: [[Sequelize.fn("AVG", Sequelize.col("comments.star")), "averageStar"]],
         },
         group: ["centers.id"],
         having: Sequelize.where(Sequelize.fn("AVG", Sequelize.col("comments.star")), {
            [Op.between]: [minStar, maxStar],
         }),
         order: [[Sequelize.literal("AVG(comments.star)"), "DESC"]],
      });

      res.status(200).json({ centers });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}
