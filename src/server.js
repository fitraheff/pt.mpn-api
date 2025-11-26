import { web } from "./application/web.js";
import { config } from "./utils/config.js";

const PORT = config.port;

web.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});