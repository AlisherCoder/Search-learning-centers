import Reception from "../models/reseption.model.js";
import User from "../models/user.model.js";
import {
   ReceptionPOST,
   ReceptionPATCH,
} from "../validations/reception.validation.js";

export async function create(req, res) {
   try {
      let { error, value } = ReceptionPOST.validate(req.body);
      if (error) {
         return res.status(401).json({ message: error.message });
      }

      let user = await User.findByPk(value.userId);
      if (!user) {
         return res.status(404).json({ message: "Not found user." });
      }

      if (user.id != req.user.id && req.user.role != "admin") {
         return res.status(401).json({ message: "Not allowed." });
      }

      let data = await Reception.create(value);
      res.status(201).json({ data });
   } catch (e) {
      console.log(e);
      res.status(500).json({ message: e.message });
   }
}

export async function update(req, res) {
   try {
      let { id } = req.params;
      let { error, value } = ReceptionPATCH.validate(req.body);
      if (error) {
         return res.status(401).json({ message: error.message });
      }
      let data = await Reception.findByPk(id);
      if (!data) {
         return res.status(404).json({ message: "Not Fount By id" });
      }

      await data.update(value);
      res.status(200).json({ message: "Update", data });
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

      if (data.userId != req.user.id && req.user.role != "admin") {
         return res.status(401).json({ message: "Not allowed." });
      }

      await data.destroy();
      res.status(200).json({ message: "delete" });
   } catch (e) {
      res.status(500).json({ message: e.message });
   }
}
