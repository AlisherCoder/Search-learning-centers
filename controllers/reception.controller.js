import {Op} from "sequelize"
import Filial from "../models/filial.model.js";
import Major from "../models/major.model.js";
import Reception from "../models/reseption.model.js";
import User from "../models/user.model.js";
import {ReceptionPOST, ReceptionPATCH} from "../validations/reception.validation.js";

export async function findAll (req,res) {
    try{
        let data = await Reception.findAll({include: [Filial,User, Major]})
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
        let data = await Reception.findByPk(id, {include: [Filial, User, Major]})
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
        let { limit = 10, offset = 1, sort, column = "status", search } = req.query;

        limit = parseInt(limit);
        offset = Math.max(0, (parseInt(offset) - 1) * limit);

        let query = {limit, offset};
        if (sort === "asc" || sort === "desc") {
            query.order = [[column, sort.toUpperCase()]];
        }
        let where = {};
        if (search) {
            where[column] = { [Op.like]: `${search}%` };
        }
        let data = await Reception.findAll({ ...query, where });

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
        let {error, value} = ReceptionPOST.validate(req.body);
        if(error){
            return res.status(401).json({message: error.message});
        }
        let data = await Reception.create(value);
        res.status(201).json({data})
    }catch(e){
        console.log(e);
        res.status(500).json({message: e.message});
    }
};
export async function update (req,res) {
    try{
        let {id} = req.params;
        let {error, value} = ReceptionPATCH.validate(req.body);
        if(error){
            return res.status(401).json({message: error.message})
        }
        let data = await Reception.findByPk(id);
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
