"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// Validation
var celebrate_1 = require("celebrate");
var multer_1 = __importDefault(require("multer"));
var multer_2 = __importDefault(require("./config/multer"));
var PointController_1 = __importDefault(require("./controllers/PointController"));
var ItemsController_1 = __importDefault(require("./controllers/ItemsController"));
var routes = express_1.default.Router();
var upload = multer_1.default(multer_2.default);
var pointsController = new PointController_1.default();
var itemsController = new ItemsController_1.default();
// index, show, create, update, delete
// Create collects point
routes.post('/points', upload.single('image'), celebrate_1.celebrate({
    body: celebrate_1.Joi.object().keys({
        name: celebrate_1.Joi.string().required(),
        email: celebrate_1.Joi.string().required().email(),
        whatsapp: celebrate_1.Joi.number().required(),
        latitude: celebrate_1.Joi.number().required(),
        longitude: celebrate_1.Joi.number().required(),
        city: celebrate_1.Joi.string().required(),
        uf: celebrate_1.Joi.string().required().max(2),
        items: celebrate_1.Joi.string().required(),
    })
}, {
    // Returns all validation errors at once
    abortEarly: false
}), pointsController.create);
// Get Users
routes.get('/items', itemsController.index);
// Filter list by state/city/items
routes.get('/points', pointsController.index);
// List a specific collects point
routes.get('/points/:id', pointsController.show);
exports.default = routes;
