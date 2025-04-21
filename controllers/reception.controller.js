import Center from "../models/center.model.js";
import Filial from "../models/filial.model.js";
import Major from "../models/major.model.js";
import Reception from "../models/reseption.model.js";
import User from "../models/user.model.js";
import { Paging } from "../validations/center.valid.js";
import { ReceptionPOST, ReceptionPATCH } from "../validations/reception.validation.js";
import { Op } from "sequelize";

export async function findAll(req, res) {
   try {
      let { error, value } = Paging.validate(req.query);
      if (error) {
         return res.status(422).json({ message: error.details[0].message });
      }

      let { take = 20, page } = value;

      let skip = 0;
      if (page) {
         skip = (page - 1) * take;
      }

      let receptions = await Reception.findAll({
         limit: take,
         offset: skip,
         include: [User],
      });

      res.status(200).json({ data: receptions });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

export async function findOne(req, res) {
   try {
      let { id } = req.params;

      let reception = await Reception.findByPk(id, {
         include: [
            Center,
            Filial,
            Major,
            {
               model: User,
               attributes: { exclude: ["password"] },
            },
         ],
      });

      if (!reception) {
         return res.status(404).json({ message: "Not found reception." });
      }

      if (reception.userId != req.user.id && (req.user.role != "ADMIN" || req.user.role != "SUPERADMIN")) {
         return res.status(401).json({ message: "Not allowed." });
      }

      res.status(200).json({ data: reception });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

export async function create(req, res) {
   try {
      let { error, value } = ReceptionPOST.validate(req.body);
      if (error) {
         return res.status(422).json({ message: error.details[0].message });
      }

      let { centerId, filialId, majorId } = value;

      let center = await Center.findByPk(centerId, {
         include: [Filial, Major],
      });

      if (!center) {
         return res.status(404).json({ message: "Not found learning center." });
      }

      let filials = center.filials.map((filial) => filial.id);
      let majors = center.majors.map((major) => major.id);

      let isExists = null;

      if (!majors.includes(majorId)) {
         return res.status(404).json({ message: "Not found major." });
      }

      if (filialId) {
         if (!filials.includes(filialId)) {
            return res.status(404).json({ message: "Not found filial." });
         }

         isExists = await Reception.findOne({
            where: {
               [Op.and]: [{ majorId }, { filialId }, { centerId }, { userId: req.user.id }],
            },
         });

         if (isExists) {
            return res.status(400).json({
               message: "You have already written in this direction.",
            });
         }
      } else {
         isExists = await Reception.findOne({
            where: {
               [Op.and]: [{ majorId }, { centerId }, { userId: req.user.id }],
            },
         });
      }

      if (isExists) {
         return res.status(400).json({ message: "You have already written in this direction." });
      }

      let data = await Reception.create({ ...value, userId: req.user.id });
      res.status(201).json(data);
   } catch (e) {
      res.status(500).json({ message: e.message });
   }
}

export async function update(req, res) {
   try {
      let { id } = req.params;
      let { error, value } = ReceptionPATCH.validate(req.body);
      if (error) {
         return res.status(422).json({ message: error.details[0].message });
      }

      let data = await Reception.findByPk(id);
      if (!data) {
         return res.status(404).json({ message: "Not Fount reception." });
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
      let data = await Reception.findByPk(id);
      if (!data) {
         return res.status(404).json({ message: "Not Found reception" });
      }

      if (data.userId != req.user.id && (req.user.role != "ADMIN" || req.user.role != "SUPERADMIN")) {
         return res.status(401).json({ message: "Not allowed deleted other reception." });
      }

      await data.destroy();
      res.status(200).json({ data });
   } catch (e) {
      res.status(500).json({ message: e.message });
   }
}
