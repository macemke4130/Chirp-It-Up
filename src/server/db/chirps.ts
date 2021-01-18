import { Query } from "./index";

const all = async () => Query("select chirps.id, name, content, location, chirps._created from chirps inner join users on chirps.userid = users.id order by chirps.id");
const single = async (id: number) => Query("SELECT * FROM chirps WHERE ID = ?", [id]);

export default {
    all,
    single
};