import { Op } from "sequelize";
import Field from "../models/field.model.js";
import {ValidationPOST, ValidationPATCH} from "../validations/subjectANDfield.validation.js";

export async function findAll (req,res) {
    try{
        let data = await Field.findAll()
        if(data.length == 0){
            return res.status(404).json({message: "Not Fount"});
        }
        res.status(200).json({data})
    }catch(e){
        res.status(500).json({message: e.message});
    }   
};

export async function findOne (req,res){
    try{
        let {id} = req.params;
        let data = await Field.findByPk(id)
        if(!data){
            return res.status(404).json({message: "Not Fount"});
        }
        res.status(200).json(data);
    }catch(e){
        res.status(500).json({message: e.message})
    }
};
export async function findBySorted(req, res) {
    try {
        let { limit = 10, offset = 1, sort, column = "name", search } = req.query;

        limit = parseInt(limit);
        offset = Math.max(0, (parseInt(offset) - 1) * limit);

        let query = {limit, offset};
        if (sort === "asc" || sort === "desc") {
            query.order = [[column, sort.toUpperCase()]];
        }
        let where = {};
        if (search) {
            where[column] = { [Op.like]: `%${search}%` };
        }
        let data = await Field.findAll({ ...query, where });

        if (!data.length) {
            return res.status(404).json({ message: "Not Found" });
        }
        res.status(200).json({ data });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};
export async function create (req,res) {
    try{
        let {error, value} = ValidationPOST.validate(req.body);
        if(error){
            return res.status(400).json({message: error.message});
        }
        let data = await Field.create(value);
        res.status(201).json({data})
    }catch(e){
        res.status(500).json({message: e.message});
    }
};
export async function update (req,res) {
    try{
        let {id} = req.params;
        let {error, value} = ValidationPATCH.validate(req.body);
        if(error){
            return res.status(400).json({message: error.message})
        }
        let data = await Field.findByPk(id);
        if(!data){
            return res.status(404).json({message: "Not Fount By id"})
        }
        await data.update(value);
        res.status(200).json({message: "Update", data})
    }catch(e){
        res.status(500).json({message:e.message});
    }
};
export async function remove (req,res) {
    try{
        let {id} = req.params;
        let data = await Field.findByPk(id);
        if(!data){
            return res.status(404).json({message: "Not Found filed"})
        }
        await data.destroy();
        res.status(200).json({message: "delete"})
    }catch(e){
        res.status(500).json({message: e.message});
    }
};
