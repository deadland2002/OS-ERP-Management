create table "Student_Details"
(
    student_id        integer      not null
        references "User"
            on update cascade on delete restrict,
    class_id          integer      not null
        references "Class"
            on update cascade on delete restrict,
    rollnumber        bigint,
    father_name       text         not null,
    mother_name       text         not null,
    address           text         not null,
    alternate_number  text         not null,
    guardian_name     text         not null,
    guardian_relation text         not null,
    city              text         not null,
    country_code      integer      not null,
    date_of_birth     timestamp(3) not null,
    first_name        text         not null,
    last_name         text         not null,
    middle_name       text         not null,
    pincode           integer      not null,
    state             text         not null,
    uid               text         not null,
    uid_type          text         not null
);

alter table "Student_Details"
    owner to postgres;

create unique index "Student_Details_student_id_key"
    on "Student_Details" (student_id);

create unique index "Student_Details_rollnumber_key"
    on "Student_Details" (rollnumber);

create unique index "Student_Details_uid_key"
    on "Student_Details" (uid);

INSERT INTO public."Student_Details" (student_id, class_id, rollnumber, father_name, mother_name, address, alternate_number, guardian_name, guardian_relation, city, country_code, date_of_birth, first_name, last_name, middle_name, pincode, state, uid, uid_type) VALUES (131, 9, null, 'john doe', 'emily', '24234 sdfjhsdfjks fjksdhfskjdfs dsjhdfkjsdh fdsdf', '8888888888', 'dsdfsdf', 'sdfsdfsdf', 'wkajsdnakj', 99, '2024-05-15 11:02:00.000', 'xyz', 'pqr', '', 888888, 'sdkjnfksjdf', 'sdfsdfsdf', 'sdfsdfs');
INSERT INTO public."Student_Details" (student_id, class_id, rollnumber, father_name, mother_name, address, alternate_number, guardian_name, guardian_relation, city, country_code, date_of_birth, first_name, last_name, middle_name, pincode, state, uid, uid_type) VALUES (132, 9, null, 'john doe', 'emily', '24234 sdfjhsdfjks fjksdhfskjdfs dsjhdfkjsdh fdsdf', '8888888888', 'dsdfsdf', 'sdfsdfsdf', 'wkajsdnakj', 99, '2024-05-15 11:02:00.000', 'xyz', 'pqr', '', 888888, 'sdkjnfksjdf', 'sdfsdfsdf3', 'sdfsdfs');
INSERT INTO public."Student_Details" (student_id, class_id, rollnumber, father_name, mother_name, address, alternate_number, guardian_name, guardian_relation, city, country_code, date_of_birth, first_name, last_name, middle_name, pincode, state, uid, uid_type) VALUES (133, 9, null, 'john doe', 'emily', '24234 sdfjhsdfjks fjksdhfskjdfs dsjhdfkjsdh fdsdf', '8888888888', 'dsdfsdf', 'sdfsdfsdf', 'wkajsdnakj', 99, '2024-05-15 11:02:00.000', 'xyz', 'pqr', '', 888888, 'sdkjnfksjdf', 'sdfsdfsdf4', 'sdfsdfs');
INSERT INTO public."Student_Details" (student_id, class_id, rollnumber, father_name, mother_name, address, alternate_number, guardian_name, guardian_relation, city, country_code, date_of_birth, first_name, last_name, middle_name, pincode, state, uid, uid_type) VALUES (134, 9, null, 'john doe', 'emily', '24234 sdfjhsdfjks fjksdhfskjdfs dsjhdfkjsdh fdsdf', '8888888888', 'dsdfsdf', 'sdfsdfsdf', 'wkajsdnakj', 99, '2024-05-15 11:02:00.000', 'xyz', 'pqr', '', 888888, 'sdkjnfksjdf', 'sdfsdfsdf5', 'sdfsdfs');
INSERT INTO public."Student_Details" (student_id, class_id, rollnumber, father_name, mother_name, address, alternate_number, guardian_name, guardian_relation, city, country_code, date_of_birth, first_name, last_name, middle_name, pincode, state, uid, uid_type) VALUES (135, 9, null, 'john doe', 'emily', '24234 sdfjhsdfjks fjksdhfskjdfs dsjhdfkjsdh fdsdf', '8888888888', 'dsdfsdf', 'sdfsdfsdf', 'wkajsdnakj', 99, '2024-05-15 11:02:00.000', 'xyz', 'pqr', '', 888888, 'sdkjnfksjdf', 'sdfsdfsdf6', 'sdfsdfs');
INSERT INTO public."Student_Details" (student_id, class_id, rollnumber, father_name, mother_name, address, alternate_number, guardian_name, guardian_relation, city, country_code, date_of_birth, first_name, last_name, middle_name, pincode, state, uid, uid_type) VALUES (136, 9, null, 'john doe', 'emily', '24234 sdfjhsdfjks fjksdhfskjdfs dsjhdfkjsdh fdsdf', '8888888888', 'dsdfsdf', 'sdfsdfsdf', 'wkajsdnakj', 99, '2024-05-15 11:02:00.000', 'xyz', 'pqr', '', 888888, 'sdkjnfksjdf', 'sdfsdfsdf7', 'sdfsdfs');
INSERT INTO public."Student_Details" (student_id, class_id, rollnumber, father_name, mother_name, address, alternate_number, guardian_name, guardian_relation, city, country_code, date_of_birth, first_name, last_name, middle_name, pincode, state, uid, uid_type) VALUES (137, 9, null, 'john doe', 'emily', '24234 sdfjhsdfjks fjksdhfskjdfs dsjhdfkjsdh fdsdf', '8888888888', 'dsdfsdf', 'sdfsdfsdf', 'wkajsdnakj', 99, '2024-05-15 11:02:00.000', 'xyz', 'pqr', '', 888888, 'sdkjnfksjdf', 'sdfsdfsdf8', 'sdfsdfs');
INSERT INTO public."Student_Details" (student_id, class_id, rollnumber, father_name, mother_name, address, alternate_number, guardian_name, guardian_relation, city, country_code, date_of_birth, first_name, last_name, middle_name, pincode, state, uid, uid_type) VALUES (138, 9, null, 'john doe', 'emily', '24234 sdfjhsdfjks fjksdhfskjdfs dsjhdfkjsdh fdsdf', '8888888888', 'dsdfsdf', 'sdfsdfsdf', 'wkajsdnakj', 99, '2024-05-15 11:02:00.000', 'xyz', 'pqr', '', 888888, 'sdkjnfksjdf', 'sdfsdfsdf9', 'sdfsdfs');
