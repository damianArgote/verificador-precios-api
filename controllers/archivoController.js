import {guardarFile} from '../helpers/guardarFile.js'
import XlsxPopulate from 'xlsx-populate';


const crearArchivo = (req,res) =>{

    //verificar que exista un archivo
    if(!req.file){
        return res.json({
            ok:false,
            msg:'No existe un archivo en la request'
        })
    }
    //recibir el archivo del req,
    //leer el archivo y crear una copia en el servidor
    guardarFile(req.file)
    //retornar respuesta
    return res.json({
        ok:true,
        msg:'Archivo copiado correctamente'
    })
}


const buscarPrompt = async (req,res) =>{

    const{prompt} = req.query;
    const codigo = Number(prompt)
    //acceder al archivo
    const workbook = await XlsxPopulate.fromFileAsync('./uploads/verificador-precios.xlsx');
    const sheet = workbook.sheet(0);
    // Buscar en la columna 'C' (indice 2) el código
    const rows = sheet.usedRange().value();
    let foundRow;
    let msg;
    rows.forEach(row =>{
        if(row.includes(codigo)){
            if(!foundRow){
                foundRow = {
                    nombre:row[0],
                    descripcion:row[1],
                    precio:row[2],
                    codigo:row[3]
                }
            }else{
                msg ='Hay un problema con el código' 
            }
        }
    })

    if(!foundRow){
        return res.status(404).json({
            ok:false,
            msg:'Producto no encontrado'
        })
    }
    if(msg){
        return res.status(400).json({
            ok:false,
            msg
        })
    }else{
        return res.json({
            ok:true,
            producto:foundRow
        })
    }
    
}



export{
    crearArchivo,
    buscarPrompt
}