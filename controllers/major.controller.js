import { Op } from "sequelize";
import Field from "../models/field.model.js";
import Major from "../models/major.model.js";
import Subject from "../models/subject.model.js";
import { MojorPATCH, MojorPOST } from "../validations/mojor.validation.js";
import Center from "../models/center.model.js";
import Region from "../models/region.model.js";
import User from "../models/user.model.js";

export async function findAll(req, res) {
   try {
      let data = await Major.findAll({
         include: [
            {
               model: Field,
               required: false,
            },
            {
               model: Subject,
               required: false,
            },
            {
               model: Center,include: [{model: Region},{model: User, attributes: {exclude: ["password", "isActive","updatedAt","createdAt"]}}]
            },
         ],
      });
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
      let data = await Major.findByPk(id, {
         include: [
            {
               model: Field,
               required: false,
            },
            {
               model: Subject,
               required: false,
            },
            {
                model: Center,include: [{model: Region},{model: User, attributes: {exclude: ["password", "isActive","updatedAt","createdAt"]}}]
             },
         ],
      });
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
       let { limit = 10, offset = 1, sort, column = "name", search } = req.query;
 
       limit = parseInt(limit);
       offset = Math.max(0, (parseInt(offset) - 1) * limit);
 
       let query = { limit, offset };
       if (sort === "asc" || sort === "desc") {
          query.order = [[column, sort.toUpperCase()]];
       }
 
       let where = {};
       let fieldWhere = {};
       let subjectWhere = {};
 
       if (search) {
          if (column === "fieldId") {
             fieldWhere.id = search; 
          } else if (column === "subjectId") {
             subjectWhere.id = search;
          } else {
             where[column] = { [Op.like]: `%${search}%` };
          }
       }
 
       let data = await Major.findAll({
          ...query,
          where,
          include: [
             {
                model: Field,
                required: Object.keys(fieldWhere).length > 0,
                where: fieldWhere,
             },
             {
                model: Subject,
                required: Object.keys(subjectWhere).length > 0,
                where: subjectWhere,
             },
             {
                model: Center,
                include: [
                   { model: Region },
                   { model: User, attributes: { exclude: ["password", "isActive", "updatedAt", "createdAt"] } }
                ],
             },
          ],
       });
 
       if (!data.length) {
          return res.status(404).json({ message: "Not Found" });
       }
       res.status(200).json({ data });
    } catch (e) {
       res.status(500).json({ message: e.message });
    }
 };

export async function create(req, res) {
   try {
      let { error, value } = MojorPOST.validate(req.body);
      if (error) {
         return res.status(400).json({ message: error.message });
      }
      let data = await Major.create(value);
      res.status(201).json({ data });
   } catch (e) {
      res.status(500).json({ message: e.message });
   }
}
export async function update(req, res) {
   try {
      let { id } = req.params;
      let { error, value } = MojorPATCH.validate(req.body);
      if (error) {
         return res.status(400).json({ message: error.message });
      }
      let data = await Major.findByPk(id);
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
      let data = await Major.findByPk(id);
      if (!data) {
         return res.status(404).json({ message: "Not Found filed" });
      }
      let img = data.image;
      if(img){
         try{
               let filepas = path.join("uploads",img)
               if(fs.existsSync(filepas)){
                  fs.unlinkSync(filepas);
               }
         }catch(e){

         }
      }
      await data.destroy();
      res.status(200).json({ message: "delete" });
   } catch (e) {
      res.status(500).json({ message: e.message });
   }
}
