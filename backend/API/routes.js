import express from 'express'
import * as controller from './controller.js'

const router = express.Router();

router.get("/promociones", controller.getPromociones);
router.get("/promociones/:id", controller.getPromocionById);

router.get("/tarjetas", controller.getTarjetas);
router.get("/tarjetas/:id", controller.getTarjetaById);

router.get("/productos", controller.getProductos);
router.get("/productos/:id", controller.getProductoById);

//loopita helpers

router.get("/productos/prestamos", controller.getPrestamos);
router.get("/productos/hipoteca", controller.getHipoteca);
router.get("/productos/credito-auto", controller.getCreditoAuto);
router.get("/productos/inversion", controller.getInversion);

router.get("/promociones/empresa/:nombre", controller.getPromocionesByEmpresa);

router.post("/chat", controller.chat);


export { router }