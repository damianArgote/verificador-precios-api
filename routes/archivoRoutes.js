import {Router} from 'express'
import {uploads} from '../middleware/multer.js';
import {crearArchivo,buscarPrompt} from '../controllers/archivoController.js'

const router = Router();

router.post('/',uploads.single('file'),crearArchivo)
router.get('/',buscarPrompt)



export default router;