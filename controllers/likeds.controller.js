import {Op} from "sequelize"
import Center from "../models/center.model.js";
import Like from "../models/like.model.js";
import User from "../models/user.model.js";
import {LikedsPOST, LikedsPATCH} from "../validations/likeds.validation.js"

export async function findAll (req,res) {
    try{
        let data = await Like.findAll({include: [User, Center]})
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
        let data = await Like.findByPk(id, {include: [User, Center]})
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
        let { limit = 10, offset = 1, sort, column = "createdAt", search, dey} = req.query;

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
        dey = parseInt(dey);
        if(dey > 0){
            let formData = new Date();
            formData.setDate(formData.getDate() - dey);
            where.createdAt  = {[Op.gte]: formData};

        }
        let data = await Like.findAll({ ...query, where });

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
        let {error, value} = LikedsPOST.validate(req.body);
        if(error){
            return res.status(401).json({message: error.message});
        }
        let data = await Like.create(value);
        res.status(201).json({data})
    }catch(e){
        res.status(500).json({message: e.message});
    }
};
export async function update (req,res) {
    try{
        let {id} = req.params;
        let {error, value} = LikedsPATCH.validate(req.body);
        if(error){
            return res.status(400).json({message: error.message})
        }
        let data = await Like.findByPk(id);
        if(!data){
            return res.status(404).json({message: "Not Fount By id"})
        }
        await Like.update(value, {where: {id}});
        res.status(200).json({message: "Update"})
    }catch(e){
        res.status(500).json({message:e.message});
    }
};
export async function remove (req,res) {
    try{
        let {id} = req.params;
        let data = await Like.findByPk(id);
        if(!data){
            return res.status(404).json({message: "Not Found filed"})
        }
        await Like.destroy({where: { id }});
        res.status(200).json({message: "delete"})
    }catch(e){
        res.status(500).json({message: e.message});
    }
};
