-- # noinspection SqlNoDataSourceInspectionForFile
-- INSERT INTO USER (ID, USERNAME, PASSWORD, FIRSTNAME, LASTNAME, EMAIL, ENABLED, LASTPASSWORDRESETDATE) VALUES (1, 'admin', '$2a$08$lDnHPz7eUkSi6ao14Twuau08mzhWrL4kyZGGU5xfiGALO/Vxd5DOi', 'admin', 'admin', 'admin@admin.com', 1, PARSEDATETIME('01-01-2016', 'dd-MM-yyyy'));
-- INSERT INTO USER (ID, USERNAME, PASSWORD, FIRSTNAME, LASTNAME, EMAIL, ENABLED, LASTPASSWORDRESETDATE) VALUES (2, 'user', '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC', 'user', 'user', 'enabled@user.com', 1, PARSEDATETIME('01-01-2016','dd-MM-yyyy'));
-- INSERT INTO USER (ID, USERNAME, PASSWORD, FIRSTNAME, LASTNAME, EMAIL, ENABLED, LASTPASSWORDRESETDATE) VALUES (3, 'disabled', '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC', 'user', 'user', 'disabled@user.com', 0, PARSEDATETIME('01-01-2016','dd-MM-yyyy'));
--
-- INSERT INTO AUTHORITY (ID, NAME) VALUES (1, 'ROLE_USER');
-- INSERT INTO AUTHORITY (ID, NAME) VALUES (2, 'ROLE_ADMIN');
--
-- INSERT INTO USER_AUTHORITY (USER_ID, AUTHORITY_ID) VALUES (1, 1);
-- INSERT INTO USER_AUTHORITY (USER_ID, AUTHORITY_ID) VALUES (1, 2);
-- INSERT INTO USER_AUTHORITY (USER_ID, AUTHORITY_ID) VALUES (2, 1);
-- INSERT INTO USER_AUTHORITY (USER_ID, AUTHORITY_ID) VALUES (3, 1);


-- INSERT INTO `user` (`id`, `email`, `enabled`, `firstname`, `last_password_reset_date`, `lastname`, `password`, `username`) VALUES ('1', 'admin@admin', b'1', 'admin', '2018-02-16 00:00:00', 'admin', '$2a$08$lDnHPz7eUkSi6ao14Twuau08mzhWrL4kyZGGU5xfiGALO/Vxd5DOi', 'admin');
-- INSERT INTO `user` (`id`, `email`, `enabled`, `firstname`, `last_password_reset_date`, `lastname`, `password`, `username`) VALUES ('2', 'user@user', b'1', 'user', '2018-02-16 00:00:00', 'user', '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC', 'user');
-- INSERT INTO `user` (`id`, `email`, `enabled`, `firstname`, `last_password_reset_date`, `lastname`, `password`, `username`) VALUES ('3', 'user@user', b'0', 'user', '2018-02-16 00:00:00', 'user', '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC', 'disabled');


-- INSERT INTO `user` (`id`, `email`, `enabled`, `firstname`, `last_password_reset_date`, `lastname`, `password`, `username`) VALUES ('1', 'admin@admin', b'1', 'admin', '2018-02-16 00:00:00', 'admin', '$2a$08$lDnHPz7eUkSi6ao14Twuau08mzhWrL4kyZGGU5xfiGALO/Vxd5DOi', 'admin'),
--  ('2', 'user@user', b'1', 'user', '2018-02-16 00:00:00', 'user', '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC', 'user'),
--  ('3', 'user@user', b'0', 'user', '2018-02-16 00:00:00', 'user', '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC', 'disabled');


-- INSERT INTO `authority` (`id`, `name`) VALUES ('2', 'ROLE_ADMIN'), ('1', 'ROLE_USER');


-- INSERT INTO `user_authority` (`user_id`, `authority_id`) VALUES ('1', '2'), ('1', '1'), ('2', '1'), ('3', '1');

