import {
  filialPatchValid,
  filialPostValid,
  SearchValid,
} from '../validations/filial.valid.js';
import { Op } from 'sequelize';
import path from 'path';
import fs from 'fs';
import Region from '../models/region.model.js';
import Filial from '../models/filial.model.js';
import Center from '../models/center.model.js';
import Reception from '../models/reseption.model.js';
import User from '../models/user.model.js';

export async function findAll(req, res) {
  try {
    let { error, value } = SearchValid.validate(req.query);
    if (error) {
      return res.status(422).json({ message: error.details[0].message });
    }

    let { take = 20, page, sortBy, sortOrder, ...queries } = value;
    let sort = sortBy || 'name';
    let order = sortOrder || 'ASC';

    let skip = 0;
    if (page) {
      skip = (page - 1) * take;
    }

    let query = {};
    for (let [key, val] of Object.entries(queries)) {
      if (typeof val == 'string') {
        query[key] = { [Op.substring]: `%${val}%` };
      } else {
        query[key] = val;
      }
    }

    let filials = await Filial.findAll({
      where: query,
      limit: take,
      offset: skip,
      order: [[sort, order]],
      include: [
        Center,
        Region,
        {
          model: Reception,
          include: { model: User, attributes: { exclude: ['password'] } },
        },
      ],
    });

    res.status(200).json({ data: filials, total: filials.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function findOne(req, res) {
  try {
    let { id } = req.params;

    let filial = await Filial.findByPk(id, {
      include: [
        Center,
        Region,
        {
          model: Reception,
          include: { model: User, attributes: { exclude: ['password'] } },
        },
      ],
    });

    if (!filial) {
      return res.status(404).json({ message: 'Not found filial.' });
    }

    res.status(200).json({ data: filial });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function create(req, res) {
  try {
    let { error, value } = filialPostValid.validate(req.body);
    if (error) {
      return res.status(422).json({ message: error.details[0].message });
    }

    let region = await Region.findByPk(value.regionId);
    if (!region) {
      return res.status(404).json({ message: 'Not found region.' });
    }

    let isExists = await Filial.findOne({ where: { name: value.name } });
    if (isExists) {
      return res.status(400).json({ message: 'This name already exists.' });
    }

    let { centerId } = req.body;
    let center = await Center.findByPk(centerId);
    if (!center) {
      return res.status(404).json({ message: 'Not found learning center.' });
    }

    if (
      center.seoId != req.user.id &&
      (req.user.role != 'ADMIN' || req.user.role != 'SUPERADMIN')
    ) {
      return res.status(401).json({
        message:
          "You have no right to create a branch of someone else's training center.",
      });
    }

    let filial = await Filial.create(value);

    res.status(200).json({ data: filial });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function remove(req, res) {
  try {
    let { id } = req.params;

    let filial = await Filial.findByPk(id);
    if (!filial) {
      return res.status(404).json({ message: 'Not found filial.' });
    }

    let center = await Center.findByPk(filial.centerId);

    if (
      center.seoId != req.user.id &&
      (req.user.role != 'ADMIN' || req.user.role != 'SUPERADMIN')
    ) {
      return res.status(401).json({
        message:
          "You do not have the right to delete a branch of someone else's training center.",
      });
    }

    await filial.destroy();
    try {
      let filepath = path.join('uploads', filial.image);
      fs.unlinkSync(filepath);
    } catch (error) {}

    res.status(200).json({ data: filial });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function update(req, res) {
  try {
    let { error, value } = filialPatchValid.validate(req.body);
    if (error) {
      return res.status(422).json({ message: error.details[0].message });
    }

    let { id } = req.params;
    let filial = await Filial.findByPk(id);

    if (!filial) {
      return res.status(404).json({ message: 'Not found filial.' });
    }

    let center = await Center.findByPk(filial.centerId);

    if (center.seoId != req.user.id && req.user.role != 'ADMIN') {
      return res.status(401).json({
        message:
          "You do not have the right to update a branch of someone else's training center.",
      });
    }

    if (value.name) {
      let isExists = await Filial.findOne({ where: { name: value.name } });
      if (isExists) {
        return res.status(400).json({ message: 'This name already exists.' });
      }
    }

    if (value.image) {
      try {
        let filepath = path.join('uploads', filial.image);
        fs.unlinkSync(filepath);
      } catch (error) {}
    }

    await filial.update(value);

    res.status(200).json({ data: filial });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
