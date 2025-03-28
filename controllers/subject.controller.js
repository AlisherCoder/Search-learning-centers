import Subject from "../models/subject.model.js";
import { Op } from "sequelize";
import {
   ValidationPOST,
   ValidationPATCH,
} from "../validations/subjectANDfield.validation.js";
import Major from "../models/major.model.js";
import fs from "fs";
import path from "path";

export async function findAll(req, res) {
   try {
      let data = await Subject.findAll({ include: Major });
      if (data.length == 0) {
         return res.status(404).json({ message: "Not Fount" });
      }
      res.status(200).json({ data });
   } catch (e) {
      res.status(500).json({ message: e.message });
   }
}

export async function findOne(req, res) {
   try {
      let { id } = req.params;
      let data = await Subject.findByPk(id, { include: Major });
      if (!data) {
         return res.status(404).json({ message: "Not Fount" });
      }
      res.status(200).json(data);
   } catch (e) {
      res.status(500).json({ message: e.message });
   }
}

export async function findBySorted(req, res) {
   try {
      let { limit = 20, offset = 1, sort, column = "name", search } = req.query;

      limit = parseInt(limit);
      offset = Math.max(0, (parseInt(offset) - 1) * limit);

      let query = { limit, offset };
      if (sort === "asc" || sort === "desc") {
         query.order = [[column, sort.toUpperCase()]];
      }
      let where = {};
      if (search) {
         where[column] = { [Op.like]: `%${search}%` };
      }

      let data = await Subject.findAll({ ...query, where, include: Major });

      if (!data.length) {
         return res.status(404).json({ message: "Not Found" });
      }
      res.status(200).json({ data });
   } catch (e) {
      res.status(500).json({ message: e.message });
   }
}

export async function create(req, res) {
   try {
      let { error, value } = ValidationPOST.validate(req.body);
      if (error) {
         return res.status(422).json({ message: error.details[0].message });
      }

      let isExists = await Subject.findOne({ where: { name: value.name } });
      if (isExists) {
         return res.status(400).json({ message: "This name already exists." });
      }

      let data = await Subject.create(value);
      res.status(201).json({ data });
   } catch (e) {
      res.status(500).json({ message: e.message });
   }
}

export async function update(req, res) {
   try {
      let { id } = req.params;
      let { error, value } = ValidationPATCH.validate(req.body);
      if (error) {
         return res.status(422).json({ message: error.details[0].message });
      }
      let data = await Subject.findByPk(id);
      if (!data) {
         return res.status(404).json({ message: "Not Fount data" });
      }

      if (value.name) {
         let isExists = await Subject.findOne({ where: { name: value.name } });
         if (isExists) {
            return res
               .status(400)
               .json({ message: "This name already exists." });
         }
      }

      if (value.image) {
         try {
            let filepath = path.join("uploads", data.image);
            fs.unlinkSync(filepath);
         } catch (error) {}
      }

      await data.update(value);
      res.status(200).json({ data });
   } catch (e) {
      res.status(500).json({ message: e.message });
   }
}

export async function remove(req, res) {
   try {
      let { id } = req.params;
      let data = await Subject.findByPk(id);
      if (!data) {
         return res.status(404).json({ message: "Not Found subject" });
      }

      await data.destroy();

      try {
         let filepath = path.join("uploads", data.image);
         fs.unlinkSync(filepath);
      } catch (error) {}

      res.status(200).json({ data });
   } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message });
   }
}
