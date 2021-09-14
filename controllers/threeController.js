const { three } = require('../database').models;
const { requestError } = require('../helpers/Functions');

class ThreeController {

    static async lastPosition(req, res) {
        try {
            const { last_position } = req.body;
            const positionArray = [];
console.log(88888888, last_position)
            if (!last_position && last_position.length > 0) {
                return res.status(422).send({status: "fail", message: "last_position required field"});
            }
            await Promise.all(last_position.map(async (pos) => {
                const checkPosition = await three.findById(pos._id).lean();
                if (checkPosition) {
                    const id = pos._id;
                    delete pos._id;
                    const updatePosition = await three.findByIdAndUpdate(id, {last_position: pos},{new: true});
                    positionArray.push(updatePosition);
                } else {
                    const createPosition = await three.create({last_position: pos});
                    positionArray.push(createPosition);
                }
            }));

                return res.status(200).send({
                    status: "success",
                    message: "Last position created and updated",
                    positions: positionArray
                });

        } catch (e) {
            requestError(res, e);
        }
    }

    static async getList(req, res) {
        try {
            const {page = 1, limit = 20} = req.query;
            const offset = (+page - 1) * +limit;

            let query = {};
            let count = await three.countDocuments();

            const positionList = await three.find(query).skip(+offset).limit(+limit).lean();

            return res.status(200).send({
                status: 'success',
                positions: positionList,
                count
            });

        } catch (e) {
            requestError(res, e);
        }
    }

    static async getOne(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(404).send({
                    status: 'fail',
                    message: 'id is required',
                });
            }

            const position = await three.findById(id).lean();
            if (!position) {
                return res.status(404).send({
                    status: 'fail',
                    message: 'Not found',
                });
            }
            return res.status(200).send({
                status: "success",
                position,
            });

        } catch (e) {
            requestError(res, e);
        }
    }

}

module.exports = ThreeController;
