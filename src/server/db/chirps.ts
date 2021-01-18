import { Query } from "./index";

const all = async () => Query("SELECT * FROM chirps");
const single = async (id: number) => Query("SELECT * FROM chirps WHERE ID = ?", [id]);

export default {
    all,
    single
};