import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/index.js";
import { app } from "./app.js";




// dotenv.config({ path: path.resolve(__dirname, '../.env') });

const PORT = process.env.PORT || 8080;
console.log(PORT);
(() => {
	connectDB()
		.then(() => {
			app.listen(PORT, () => {
				console.log(`Server is running at port : ${PORT}`);
			});
		})
		.catch((err) => {
			console.log("MongoDB connection failed !! ", err);
		});
})();
