import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());



//serving front website
app.use( express.static(path.resolve(__dirname, '../public/sitefiles')));
app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../public/sitefiles', 'index.html'));
});



//routes import
import adminRouter from "./routes/admin.routes.js";
import mailRouter from "./routes/mail.routes.js";
import contactRouter from "./routes/contact.routes.js";
import teamRouter from "./routes/team.routes.js";
import galleryRouter from "./routes/gallery.routes.js";
import servicesRouter from "./routes/services.routes.js";
import aboutRouter from "./routes/about.routes.js";
import homeRouter from "./routes/home.routes.js";
import footerRouter from "./routes/footer.routes.js";

//routes declaration
app.use("/api/v1/admin", adminRouter);

// All Routes
app.use("/api/v1/contacts", contactRouter);
app.use("/api/v1/team", teamRouter);
app.use("/api/v1/gallery", galleryRouter);
app.use("/api/v1/services", servicesRouter);
app.use("/api/v1/about", aboutRouter);
app.use("/api/v1/home", homeRouter);
app.use("/api/v1/footer", footerRouter);

app.use("/api/v1/mail", mailRouter);

// Get server status
app.get("/api/v1/server-status", (_, res) => {
  res.status(200).json({
    success: true,
  });
});

const BACKEND_HOST =
  process.env.BACKEND_HOST || "https://beyondpaintingservice.onrender.com";

// Code for run server anyTime
const getServerStatus = () => {
  //
  let url = `${BACKEND_HOST}/api/v1/server-status`;
  let options = { method: "GET" };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) =>
      console.log("All functions are working fine!")
    )
    .catch((err) => console.error("error:" + err));
  

  return;
};

setInterval(() => {
	getServerStatus();
}, 550000); // call after every 8min. for server up & run anytime in render

export { app };
