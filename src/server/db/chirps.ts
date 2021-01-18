import { Query } from "./index";

const all = async () => Query("Select * from chirps");
const single = async (id: number) => Query("Select * from Chirps where id = ?", [id]);

export default {
    all,
    single
};