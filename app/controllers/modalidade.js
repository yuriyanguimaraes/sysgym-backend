const { ModalidadeModel } = require('./../models')

//const sequelize = require('./../config/config')

class Modalidade {
    get(req, res) {
        ModalidadeModel.findAll({ 
            raw: true,
            where:{isDeleted:1}
        }).then((result) => res.status(200).json(result))
        .catch((error) => res.status(500).json(error))
    }    
    getById(req, res) {
        ModalidadeModel.findByid(req.params.id_modalidade)
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(500).json(error))
    }
    getByName(req,res){
        ModalidadeModel.findAll({
            where:{
                nome: req.params.nome
            }
        }).then((result) => res.status(200).json(result))
        .catch((error) => res.status(500).json(error))
    }
    /*
    getByPreco(req,res){
        ModalidadeModel.findAll({
            where:{
                preco: req.params.preco
            }
        }).then((result) => res.status(200).json(result))
        .catch((error) => res.status(500).json(error))
    }
    */
    getModalidadePage(req, res){
        let limit= 10
        let offset = 0  
        let column = req.params.column
        let order = req.params.order
        let nome = req.query.nome || 'Is NOT NULL'
        let preco = req.query.preco || 'Is NOT NULL'

        sequelize.query(
            `SELECT
                COUNT(*) AS ITEMS
            FROM MOVIES
            WHERE PRECO ${preco} AND NOME ${nome}`
        
        )
        .then((data)=> {
            const items = data[0][0].ITEMS 
            let page = req.params.page
            let pages = Math.ceil(items / limit)
            offset = limit * (page - 1)
            sequelize.query(
                `SELECT M.id_modalidade 
                , M.nome 
                , M.preco
                FROM MODALIDADE AS M
                WHERE PRECO ${preco} AND NOME ${nome}
                ORDEM BY ${column} ${order}
                LIMIT ${limit}
                OFFSET ${offset}
                `
                ) 
                .then((modalidade) => res.json({result: modalidade[0], count : items, pages: pages}).status(200))
                .catch((error) => res.json(error).status(500))
        })
        .catch((error) => res.json(error).status(500))
    }
    post(req,res){
        modalidade.create(
        {
            nome: req.body.nome,
            preco: req.body.preco
        })      
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(500).json(error))
    }
    put(req,res){
        const id = req.params.id_modalidade;
        modalidade.updade({ nome: req.body.nome
            , preco: req.body.preco }, 
            { 
                where: {
                    id: id_modalidade
                } 
            })
            .then((result) => res.status(200).json(result))
            .catch((error) => res.status(500).json(error))
    }
    delete(req,res){
        modalidade.update({status: 0}, {
            where: {
                id_modalidade: req.params.id,
                isDeleted: 1
            }
        }).then((result) => res.status(200).json(result))
          .catch((error) => res.status(500).json(error))
    }
}