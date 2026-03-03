import express from 'express'
import * as controller from './controller.js'

const router = express.Router();

router.get("/users", controller.getUsers);
router.get("/users/:id", controller.getUserById);

router.get("/promociones", controller.getPromociones);
router.get("/promociones/:id", controller.getPromocionById);

router.get("/tarjetas", controller.getTarjetas);
router.get("/tarjetas/:id", controller.getTarjetaById);

router.get("/productos", controller.getProductos);
router.get("/productos/:id", controller.getProductoById);


export { router }
