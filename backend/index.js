import express from "express";
import { PORT ,MONGODB_URI} from "./config.js";
import mongoose from "mongoose";
import cors from "cors"
import { bookController, deleteBook, getBookById, getBookController, updateBook } from "./controller/bookController.js";

const app = express();

const corsOption = {
    origin : "http://localhost:5173",
    methods : "GET,PUT,HEAD,DELETE,POST,PATCH",
    credentials : true,
}

app.use(cors(corsOption));

app.use(express.json());

app.get('/',(request , response)=>{
    return response.status(234).send('Welcome to my book store')
});

//Book Routes
app.post('/books',bookController);
app.get('/get-books',getBookController);
app.get('/get-books/:id',getBookById);
app.put('/update-book/:id',updateBook);
app.delete('/delete-book/:id',deleteBook);


mongoose.connect(MONGODB_URI)
        .then(()=>{
            console.log('Connected to MongoDb')
            app.listen(PORT,()=>{
                console.log(`App is Listening on ${PORT}`); 
            });
        })
        .catch((error)=>{
            console.log(error);
        })