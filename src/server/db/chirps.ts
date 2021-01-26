import { Query } from "./index";

const all = async () => Query("select chirps.id, name, chirps.userid, content, location, chirps._created from chirps inner join users on chirps.userid = users.id order by chirps.id");
const single = async (id: number) => Query("SELECT * FROM chirps WHERE ID = ?", [id]);
const permalink = async (id: number) => Query("Select name, content, location, chirps._created from chirps inner join users on chirps.userid = users.id where chirps.id = ?", [id]);
const newPost = async (userid: number, content: string, location: string) => Query(`insert into chirps (userid, content, location) values (${userid}, "${content}", "${location}")`);
const users = async () => Query("Select id, name from users");
const destroy = async (id: number) => Query(`Delete from Chirps Where ID = ${id}`);
const put = async (id: number, userid: number, content: string, location: string) => Query(`update chirps set content = "${content}", userid = ${userid}, location = "${location}" where id = ${id}`);
const mention = async (userId: number, chirpId: number) => Query(`insert into mentions (userid, chirpid) values (${userId}, ${chirpId})`);
const allMentions = async(userId: number) => Query(`call spUserMentions(${userId})`);

export default {
    all,
    single,
    permalink,
    newPost,
    users,
    destroy,
    put,
    mention,
    allMentions
};