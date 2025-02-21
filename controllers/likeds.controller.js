import { Op } from "sequelize";
import Center from "../models/center.model.js";
import Like from "../models/like.model.js";
import User from "../models/user.model.js";
import { LikedsPOST } from "../validations/likeds.validation.js";
import Region from "../models/region.model.js";

export async function findAll(req, res) {
   try {
      let data = await Like.findAll({ include: [
         {model: User,  attributes: {exclude: ["password","isActive","createdAt","updatedAt"]}},
         {model: Center,attributes: {exclude: ["createdAt","updatedAt"]}, include:[{model:Region}]}
      ] });
      if (data.length == 0) {
         return res.status(404).json({ message: "Not Fount" });
      }
      res.status(200).json({ data, total: data.length });
   } catch (e) {
      res.status(500).json({ message: e.message });
   }
}

export async function findBySorted(req, res) {
   try {
      let {
         limit = 10,
         offset = 1,
         sort,
         column = "createdAt",
         dey,
      } = req.query;

      limit = parseInt(limit);
      offset = Math.max(0, (parseInt(offset) - 1) * limit);

      let query = { limit, offset };
      if (sort === "asc" || sort === "desc") {
         query.order = [[column, sort.toUpperCase()]];
      }
      let where ={}
      dey = parseInt(dey);
      if (dey > 0) {
         let formData = new Date();
         formData.setDate(formData.getDate() - dey);
         where.createdAt = { [Op.gte]: formData };
      }
      let data = await Like.findAll({ ...query, where ,include:[
         {model: User,attributes: {exclude:["password","updatedAt","createdAt"]}},
         {model: Center,attributes: {exclude: ["updatedAt","createdAt"]}, include: [{model: Region}]}
   ]});

      if (!data.length) {
         return res.status(404).json({ message: "Not Found" });
      }
      res.status(200).json({ data ,total: data.length});
   } catch (e) {
      res.status(500).json({ message: e.message });
   }
}

export async function create(req, res) {
   try {
      let { error, value } = LikedsPOST.validate(req.body);
      if (error) {
         return res.status(401).json({ message: error.message });
      }
      value.userId = req.user.id
      
      let data = await Like.create(value);
      res.status(201).json({ data });
   } catch (e) {
      res.status(500).json({ message: e.message });
   }
}

export async function remove(req, res) {
   try {
      let { id } = req.params;
      let data = await Like.findByPk(id);

      if (!data) {
         return res.status(404).json({ message: "Not Found like" });
      }

      if (data.userId != req.user.id) {
         return res.status(401).json({ message: "Not allowed." });
      }
      
      await data.destroy();
      res.status(200).json({ message: "delete" });
   } catch (e) {
      res.status(500).json({ message: e.message });
   }
}
