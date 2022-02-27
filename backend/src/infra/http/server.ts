import { app } from "./app";

const port = process.env.PORT || 3030;

app.listen(port, () => console.log(`Server started on port ${port} 🚀`));
