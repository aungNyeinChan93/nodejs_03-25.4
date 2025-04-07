const { ObjectId } = require('mongodb');

const db = require('../utils/db_01').getConnection();

const index = async (req, res) => {
    res.send('welcome Home')
}

const allUsers = async (req, res) => {
    const users = await db.collection('users').find().toArray();
    res.status(200).json({
        message: 'success',
        result: users
    })
}

const create = async (req, res) => {
    try {
        const result = await db.collection("users").insertOne(req.body);
        result.acknowledged
            ? res.status(201).json({
                message: 'user create success',
                result: result
            })
            : res.status(404).json({ message: 'fail' })
    } catch (error) {
        console.error('server error!')
        res.status(500).json({ message: 'server error' })
    }
}

const filterByAge = async (req, res) => {
    const age = Number(req.params.age);
    const result = await db.collection('users').aggregate([
        { $match: { age: { $lte: age } } }
    ]).toArray();
    res.status(202).json({
        message: 'success',
        result: result
    })
}

const skillUp = async (req, res) => {
    const id = ObjectId.createFromHexString(req.params.id);
    const result = await db.collection('users').updateOne({ _id: id }, { $addToSet: { skills: req.body.skills } })
    result.acknowledged
        ? res.json(result)
        : res.json({ message: 'fail' })
}

module.exports = {
    index, allUsers, create, filterByAge, skillUp
}