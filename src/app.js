import express from "express";
import cors from 'cors'
import morgan from "morgan";
import path from "path";
import config from './config.js';
import profileRoutes from './routes/profile.route.js'
import projectsRoutes from './routes/projects.routes.js'

// import main from './database/start_bd.js' //para iniciar la base de datos
// main()

const app=express();

app.set("port", config.PORT);

app.use(cors())
app.use(morgan("dev"));
app.use(express.json())
// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

app.use(profileRoutes)
app.use(projectsRoutes)

// app.use((req, res) => {
//     res.render("404");
//   });
  
  
  export default app;