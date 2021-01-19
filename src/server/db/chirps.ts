import { Query } from "./index";

const all = async () => Query("select chirps.id, name, content, location, chirps._created from chirps inner join users on chirps.userid = users.id order by chirps.id");
const single = async (id: number) => Query("SELECT * FROM chirps WHERE ID = ?", [id]);
const newPost = async (userid: number, content: string, location: string) => Query(`insert into chirps (userid, content, location) values (${userid}, "${content}", "${location}")`);
const users = async () => Query("Select id, name from users");

export default {
    all,
    single,
    newPost,
    users
};