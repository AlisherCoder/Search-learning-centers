import Center from "../models/center.model.js";
import MajorItem from "../models/majorItem.model.js";
import majorItemValid from "../validations/majorItem.valid.js";
import { Op } from "sequelize";

export async function create(req, res) {
   try {
      let { error, value } = majorItemValid.validate(req.body);
      if (error) {
         return res.status(422).json({ message: error.details[0].message });
      }
      let { majorItems } = req.body;

      let center = await Center.findByPk(majorItems[0].centerId);
      if (!center) {
         return res.status(404).json({ message: "Not found centerId." });
      }

      if (center.seoId != req.user.id && req.user.role != "admin") {
         return res.status(401).json({ message: "Not allowed." });
      }

      let majorItem = await MajorItem.bulkCreate(majorItems.map((x) => x));

      res.status(201).json({ data: majorItem });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

export async function remove(req, res) {
   try {
      let { centerId, majorItems } = req.body;

      let center = await Center.findByPk(centerId);
      if (!center) {
         return res.status(404).json({ message: "Not found centerId." });
      }

      if (center.seoId != req.user.id && req.user.role != "admin") {
         return res.status(401).json({ message: "Not allowed." });
      }

      for (let majorId of majorItems) {
         let del = await MajorItem.destroy({
            where: { [Op.and]: [{ centerId }, { majorId }] },
         });
      }

      res.status(200).json({ message: "Deleted" });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}
