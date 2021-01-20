CREATE SCHEMA `chirpr` ;

use chirpr;

create user 'chirprapp'@'localhost' identified by 'root';
GRANT ALL ON chirpr.* TO 'chirprapp'@'localhost';

create table users (
id int not null auto_increment primary key,
name varchar(100) not null,
email varchar(100) not null,
password text not null,
_created datetime default current_timestamp
);

drop table chirps;
create table chirps (
id int not null auto_increment primary key,
userid int not null,
content varchar(144) not null,
location varchar(100) not null,
_created datetime default current_timestamp
);

alter table chirps
add constraint fk_userid
foreign key (userid)
references users(id)
;

insert into users (name, email, password)
values("Mace", "lucasmace4130@gmail.com", "password1");
insert into users (name, email, password)
values("Maria", "ilikedance@gmail.com", "password1");
insert into users (name, email, password)
values("Sarah", "icuthair@gmail.com", "password1");
insert into users (name, email, password)
values("Tony", "ipicklocks@gmail.com", "password1");
insert into users (name, email, password)
values("Bryan", "irydebykes@gmail.com", "password1");
insert into users (name, email, password)
values("Henry", "ilikehike@gmail.com", "password1");
insert into users (name, email, password)
values("Brandon", "ilikebus@gmail.com", "password1");
insert into users (name, email, password)
values("Lilah", "ilikejustice@gmail.com", "password1");
insert into users (name, email, password)
values("Brennan", "iliketech@gmail.com", "password1");
insert into users (name, email, password)
values("Danger", "ilikedanger@gmail.com", "password1");

select * from chirps;

insert into chirps (userid, content, location) values
(5, "My New Favorite Number is 346", "Milwaukee"),
(4, "My New Favorite Number is 258", "Austin"),
(6, "My New Favorite Number is 398", "Denver"),
(8, "My New Favorite Number is 539", "Detroit"),
(2, "My New Favorite Number is 101", "Seattle"),
(2, "My New Favorite Number is 202", "Denver"),
(6, "My New Favorite Number is 167", "Denver"),
(2, "My New Favorite Number is 139", "Austin"),
(8, "My New Favorite Number is 406", "Asheville"),
(5, "My New Favorite Number is 452", "Austin"),
(6, "My New Favorite Number is 369", "Denver"),
(3, "My New Favorite Number is 451", "Seattle"),
(5, "My New Favorite Number is 11", "New York"),
(7, "My New Favorite Number is 157", "San Francisco"),
(10, "My New Favorite Number is 21", "Philadelphia"),
(5, "My New Favorite Number is 9", "New York"),
(8, "My New Favorite Number is 453", "New York"),
(6, "My New Favorite Number is 430", "Hell"),
(10, "My New Favorite Number is 410", "New York"),
(3, "My New Favorite Number is 285", "Hell"),
(8, "My New Favorite Number is 163", "Austin"),
(6, "My New Favorite Number is 374", "Asheville"),
(5, "My New Favorite Number is 341", "Hell"),
(7, "My New Favorite Number is 595", "New York"),
(6, "My New Favorite Number is 474", "Seattle"),
(7, "My New Favorite Number is 356", "Seattle"),
(5, "My New Favorite Number is 409", "New York"),
(2, "My New Favorite Number is 487", "New York"),
(2, "My New Favorite Number is 460", "Philadelphia"),
(10, "My New Favorite Number is 202", "San Francisco"),
(9, "My New Favorite Number is 608", "Portland"),
(2, "My New Favorite Number is 557", "Austin"),
(1, "My New Favorite Number is 373", "Portland"),
(8, "My New Favorite Number is 416", "Denver"),
(3, "My New Favorite Number is 145", "Portland"),
(8, "My New Favorite Number is 596", "Portland"),
(8, "My New Favorite Number is 48", "Hell"),
(1, "My New Favorite Number is 523", "Philadelphia"),
(8, "My New Favorite Number is 353", "Milwaukee"),
(8, "My New Favorite Number is 441", "Hell"),
(6, "My New Favorite Number is 315", "Portland"),
(4, "My New Favorite Number is 545", "Seattle"),
(6, "My New Favorite Number is 453", "Detroit"),
(10, "My New Favorite Number is 574", "Minneapolis"),
(7, "My New Favorite Number is 114", "New York"),
(9, "My New Favorite Number is 227", "Milwaukee"),
(9, "My New Favorite Number is 561", "Portland"),
(3, "My New Favorite Number is 357", "New York"),
(7, "My New Favorite Number is 36", "Hell"),
(4, "My New Favorite Number is 484", "Denver"),
(2, "My New Favorite Number is 410", "Seattle"),
(10, "My New Favorite Number is 290", "Denver"),
(6, "My New Favorite Number is 553", "Portland"),
(8, "My New Favorite Number is 482", "Denver"),
(4, "My New Favorite Number is 635", "Austin"),
(5, "My New Favorite Number is 501", "Seattle"),
(2, "My New Favorite Number is 36", "Seattle"),
(3, "My New Favorite Number is 181", "San Francisco"),
(4, "My New Favorite Number is 18", "Asheville"),
(5, "My New Favorite Number is 542", "San Francisco"),
(3, "My New Favorite Number is 393", "Detroit"),
(4, "My New Favorite Number is 282", "Hell"),
(3, "My New Favorite Number is 385", "Portland"),
(2, "My New Favorite Number is 592", "Seattle"),
(2, "My New Favorite Number is 451", "Denver"),
(7, "My New Favorite Number is 500", "Philadelphia"),
(4, "My New Favorite Number is 268", "New York"),
(9, "My New Favorite Number is 361", "Denver"),
(7, "My New Favorite Number is 137", "Denver"),
(5, "My New Favorite Number is 357", "Hell"),
(2, "My New Favorite Number is 163", "Portland"),
(7, "My New Favorite Number is 585", "Austin"),
(4, "My New Favorite Number is 599", "San Francisco"),
(7, "My New Favorite Number is 219", "San Francisco"),
(5, "My New Favorite Number is 556", "Denver"),
(6, "My New Favorite Number is 259", "Austin"),
(4, "My New Favorite Number is 653", "Portland"),
(7, "My New Favorite Number is 603", "San Francisco"),
(8, "My New Favorite Number is 315", "Seattle"),
(3, "My New Favorite Number is 74", "Milwaukee"),
(4, "My New Favorite Number is 43", "Philadelphia"),
(5, "My New Favorite Number is 541", "Minneapolis"),
(9, "My New Favorite Number is 526", "Philadelphia"),
(10, "My New Favorite Number is 644", "Austin"),
(7, "My New Favorite Number is 445", "Milwaukee"),
(9, "My New Favorite Number is 547", "Milwaukee"),
(5, "My New Favorite Number is 315", "Asheville"),
(1, "My New Favorite Number is 618", "Denver"),
(4, "My New Favorite Number is 551", "Hell"),
(8, "My New Favorite Number is 214", "Seattle"),
(4, "My New Favorite Number is 62", "Philadelphia"),
(7, "My New Favorite Number is 514", "Asheville"),
(7, "My New Favorite Number is 546", "Milwaukee"),
(1, "My New Favorite Number is 555", "San Francisco"),
(3, "My New Favorite Number is 136", "New York"),
(3, "My New Favorite Number is 312", "Seattle"),
(9, "My New Favorite Number is 226", "Milwaukee"),
(7, "My New Favorite Number is 128", "Philadelphia"),
(2, "My New Favorite Number is 161", "Denver"),
(6, "My New Favorite Number is 599", "Hell")
;

select * from chirps;
update chirps set content = "Test Test", userid = 2 where id = 2;
select * from chirps where (id) = 2;

delete from chirps
where userid = 2;

drop table mentions;
create table mentions(
userid int not null,
chirpid int not null,
primary key (userid, chirpid)
);

alter table mentions
add constraint fk_userid_mentions
foreign key (userid)
references users(id)
;

alter table mentions
add constraint fk_chirpid_mentions
foreign key (chirpid)
references chirps(id)
;

select * from mentions;

insert into mentions (userid, chirpid) values
(1, 5),
(6, 10),
(3, 40),
(9, 98),
(2, 8)
;

# Joins the Chirps table record with the corresponding User in the User table --
select chirps.id, name, content, location, chirps._created from chirps inner join users on chirps.userid = users.id order by chirps.id;

Select * from users;