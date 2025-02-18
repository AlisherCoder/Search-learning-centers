import { Op } from "sequelize";
import Field from "../models/field.model.js";
import Major from "../models/major.model.js";
import Subject from "../models/subject.model.js";
import {MojorPATCH, MojorPOST} from "../validations/mojor.validation.js";

export async function findAll (req,res) {
    try{
        let data = await Major.findAll({include: [{
            model: Field,
            required: false,
        },
        {
            model: Subject,
            required: false
        },
    ],
    })
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
        let data = await Major.findByPk(id, {include: [{
            model: Field,
            required: false,
        },
        {
            model: Subject,
            required: false
        },
        ],
        })
        if(!data){
            return res.status(404).json({message: "Not Fount"});
        }
        res.status(200).json(data);
    }catch(e){
        res.status(500).json({message: e.message})
    }
};
export async function findBySorted (req,res) {
    try{
        let {limit, offset, asc, desc, ...ress} = req.query;
        
        let query = {}

        query.limit = limit ? parseInt(limit) : 10;
        query.offset = offset ? parseInt((offset) - 1) * query.limit : 0;
        if(asc){
            let val = Object.values(asc);
            if([val]){
                query.order = [[`${val}`, "ASC"]];
            }
        }
        else if(desc){
            let val = Object.values(desc);
            if([val]){
                query.order = [[`${val}`, "DESC"]];
            }
        }
        if(ress.sort){
            let val = Object.values(ress.sort);
            if([val]){
                query.sort = {[Op.like]: `%${val}%`}
            }
        }
        let data = await Major.findAll(query);
        if(data.length == 0){
            return res.status(404).json({message: "Limit yetarliy emas"})
        }
        res.status(200).json({data});

    }catch(e){
        res.status(500).json({message: e.message});
    }
}
export async function create (req,res) {
    try{
        let {error, value} = MojorPOST.validate(req.body);
        if(error){
            return res.status(400).json({message: error.message});
        }
        let data = await Major.create(value);
        res.status(201).json({data})
    }catch(e){
        res.status(500).json({message: e.message});
    }
};
export async function update (req,res) {
    try{
        let {id} = req.params;
        let {error, value} = MojorPATCH.validate(req.body);
        if(error){
            return res.status(400).json({message: error.message})
        }
        let data = await Major.findByPk(id);
        if(!data){
            return res.status(404).json({message: "Not Fount By id"})
        }
        await Major.update(value, {where: {id}});
        res.status(200).json({message: "Update"})
    }catch(e){
        res.status(500).json({message:e.message});
    }
};
export async function remove (req,res) {
    try{
        let {id} = req.params;
        let data = await Major.findByPk(id);
        if(!data){
            return res.status(404).json({message: "Not Found filed"})
        }
        await Major.destroy({where: { id }});
        res.status(200).json({message: "delete"})
    }catch(e){
        res.status(500).json({message: e.message});
    }
};
