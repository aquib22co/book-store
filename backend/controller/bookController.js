import { Book } from "../models/book.model.js";

export const bookController = async (req,res)=>{
    try {
        const {title,author,publishYear} = req.body;
        if(!req.body.title ||!req.body.author || !req.body.publishYear){
            return res.status(400).send({
                message  :'Send all required fields : title , author name and publish year'
            })
        }

        const newBook = {
            title : req.body.title,
            author : req.body.author,
            publishYear : req.body.publishYear
        };

        const book = await Book.create(newBook);
        return res.status(201).send(book);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message : error.message})
    }
}

export const getBookController = async (req,res)=>{
    try {
        const books = await Book.find({})
        return res.status(201).json({
            count : books.length,
            data: books
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message : error.message});
    }
}

export const getBookById = async(req,res) =>{
    try {
        const {id} =req.params;
        const books = await Book.findById(id)
        return res.status(201).json(books);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message : error.message});
    }
}

export const updateBook = async (req,res) =>{
    try {
        const { id } = req.params;
        const updateData = req.body;
    
        const book = await Book.findByIdAndUpdate(id, updateData, {new: true});
    
        if(!book){
            return res.status(404).json({error: "Book not found"});
        }
    
        res.json({success : true, book});  
    } catch (error) {
        console.log(error);
        res.status(500).json({error : "internal Server Error" })
    }
}

export const deleteBook = async (req,res) => {
    try {
        const {id} = req.params
        const book = await Book.findById(id)

        if(!book) return res.status(404).json({message :"Book Not found"});

        await Book.deleteOne();
        res.status(200).json({message : "Student Deleted successfully"});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}