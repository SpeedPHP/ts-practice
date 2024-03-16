import { resource, component, log, autoware, schedule, getMapping, postMapping, Redis } from "../../src/typespeed";
import UserModel from "./user-model.class";

@component
export default class TestOrm {

    @resource("user")
    private userModel: UserModel;

    @getMapping("/orm/first")
    async firstTest(req, res) {
        const results = await this.userModel.getUsers();
        res.send("first test, to " + results);
    }

    @getMapping("/orm/one")
    async findOneTest(req, res) {
        const results = await this.userModel.getUser(req.query.id || 0);
        res.send(results);
    }

    @getMapping("/orm/new")
    async newUserTest(req, res) {
        const newId = await this.userModel.newUsers();
        res.send({"newId": newId});
    }

    @getMapping("/orm/count")
    async countTest(req, res) {
        const total = await this.userModel.count();
        res.send({"count": total});
    }

    @getMapping("/orm/edit")
    async updateTest(req, res) {
        const effectRows = await this.userModel.editUser(req.query.id, req.query.name);
        res.send({"effectRows": effectRows});
    }

    @getMapping("/orm/delete")
    async deleteTest(req, res) {
        const results = await this.userModel.remove(req.query.id || 0);
        res.send("remove user, results: " + results);
    }

    @getMapping("/orm/login")
    async loginTest(req, res) {
        const results = await this.userModel.login(req.query.id || 0);
        res.send("Increased:" + results);
    }
}