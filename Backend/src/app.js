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

export { app };
