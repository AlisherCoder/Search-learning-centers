import {
  centerPatchValid,
  centerPostValid,
  Searchvalid,
} from "../validations/center.valid.js";
import MajorItem from "../models/majorItem.model.js";
import Center from "../models/center.model.js";
import Major from "../models/major.model.js";
import Comment from "../models/comment.model.js";
import path from "path";
import fs from "fs";
import { Op } from "sequelize";
import Region from "../models/region.model.js";
import User from "../models/user.model.js";
import Filial from "../models/filial.model.js";
import Like from "../models/like.model.js";
import Reception from "../models/reseption.model.js";
import likeValid from "../validations/like.valid.js";
import starValid from "../validations/star.valid.js";
import { Sequelize } from "sequelize";

export async function findAll(req, res) {
  try {
    let { error, value } = Searchvalid.validate(req.query);
    if (error) {
      return res.status(422).json({ message: error.details[0].message });
    }

    let { take = 5, page, sortBy, sortOrder, ...queries } = value;
    let sort = sortBy || "name";
    let order = sortOrder || "ASC";

    let skip = 0;
    if (page) {
      skip = (page - 1) * take;
    }

    let query = {};
    for (let [key, val] of Object.entries(queries)) {
      if (typeof val == "string") {
        query[key] = { [Op.substring]: `%${val}%` };
      } else {
        query[key] = val;
      }
    }

    let centers = await Center.findAll({
      where: query,
      limit: take,
      offset: skip,
      order: [[sort, order]],
      include: [
        { model: Major },
        { model: Region },
        {
          model: Filial,
          include: [{ model: Reception, include: [{ model: User }] }],
        },
        { model: User },
        { model: Comment, include: [{ model: User }] },
        { model: Like, include: [{ model: User }] },
      ],
    });

    if (!centers.length) {
      return res.status(200).json({ message: "Not found learning centers." });
    }

    res.status(200).json({ data: centers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function findOne(req, res) {
  try {
    let { id } = req.params;

      let center = await Center.findByPk(id, {
         include: [
            Major,
            Region,
            User,
            Filial,
            { model: Comment, include: [{ model: User }] },
            { model: Like, include: [{ model: User }] },
         ],
      });

    if (!center) {
      return res.status(404).json({ message: "Not found learning center." });
    }

    res.status(200).json({ data: center });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function create(req, res) {
  try {
    let { error, value } = centerPostValid.validate(req.body);
    if (error) {
      return res.status(422).json({ message: error.details[0].message });
    }

    if (req.body.seoId != req.user.id && req.user.role != "admin") {
      return res.status(401).json({ message: "Not allowed." });
    }

    let { majorsId } = value;
    if (!majorsId.length) {
      return res.status(400).json({ message: "Majors id cannot be empty." });
    }

    let created = await Center.create(value);
    let majoritem = await MajorItem.bulkCreate(
      majorsId.map((id) => ({ majorId: id, centerId: created.id }))
    );

    res.status(200).json({ data: created });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function remove(req, res) {
  try {
    let { id } = req.params;

    let center = await Center.findByPk(id);
    if (!center) {
      return res.status(404).json({ message: "Not found learning center." });
    }

    if (center.seoId != req.user.id && req.user.role != "admin") {
      return res.status(401).json({ message: "Not allowed." });
    }

    await center.destroy();
    try {
      let filepath = path.join("uploads", center.image);
      fs.unlinkSync(filepath);
    } catch (error) {}

    res.status(200).json({ data: center });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function update(req, res) {
  try {
    let { error, value } = centerPatchValid.validate(req.body);
    if (error) {
      return res.status(422).json({ message: error.details[0].message });
    }

    let { id } = req.params;
    let center = await Center.findByPk(id);

    if (!center) {
      return res.status(404).json({ message: "Not found learning center." });
    }

    if (center.seoId != req.user.id && req.user.role != "admin") {
      return res.status(401).json({ message: "Not allowed." });
    }

    if (value.image) {
      try {
        let filepath = path.join("uploads", center.image);
        fs.unlinkSync(filepath);
      } catch (error) {}
    }

    await center.update(value);

    res.status(200).json({ data: center });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}



export async function findByLike(req, res) {
  try {
    let { error, value } = likeValid.validate(req.query);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const pageLike = parseInt(value.pageLike) || 1;
    const limitLike = parseInt(value.limitLike) || 10;
    const sortOrder = value.sortOrder?.toUpperCase() === "ASC" ? "ASC" : "DESC";

    const offset = (pageLike - 1) * limitLike;

    let centers = await Center.findAll({
      attributes: [
        "id",
        [Sequelize.fn("COUNT", Sequelize.col("likes.id")), "likeCount"],
        "name", 
        "phone",
        "address",
        "image",
      ],
      include: [
        Region,
        {
          model: Like,
          attributes: [], 
        },
      ],
      group: ["centers.id"], 
      order: [[Sequelize.literal("likeCount"), sortOrder]], 
      limit: limitLike,
      offset: offset,
      subQuery: false,
    });

    res.status(200).json(centers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}


export async function findByStar(req, res) {
  try {
    let { error, value } = starValid.validate(req.query);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const maxStar = value.maxStar || 5;
    const minStar = value.minStar || 0;

    let centers = await Center.findAll({
      include: [
        Comment,
        {
          model: Comment,
          attributes: [],
        },
      ],
      attributes: {
        include: [
          [Sequelize.fn("AVG", Sequelize.col("comments.star")), "averageStar"],
        ],
      },
      group: ["centers.id"], 
      having: Sequelize.where(
        Sequelize.fn("AVG", Sequelize.col("comments.star")),
        {
          [Op.between]: [minStar, maxStar],
        }
      ),
      order: [[Sequelize.literal("AVG(comments.star)"), "DESC"]], 
    });

    res.status(200).json({ centers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
