create table "Employee_Details"
(
    employee_id       integer      not null
        references "User"
            on update cascade on delete restrict,
    address           text         not null,
    guardian_name     text         not null,
    guardian_relation text         not null,
    uid               text         not null,
    uid_type          text         not null,
    alternate_number  text         not null,
    city              text         not null,
    country_code      integer      not null,
    date_of_birth     timestamp(3) not null,
    father_name       text         not null,
    first_name        text         not null,
    last_name         text         not null,
    middle_name       text         not null,
    mother_name       text         not null,
    pincode           integer      not null,
    state             text         not null
);

alter table "Employee_Details"
    owner to postgres;

create unique index "Employee_Details_employee_id_key"
    on "Employee_Details" (employee_id);

create unique index "Employee_Details_uid_key"
    on "Employee_Details" (uid);

INSERT INTO public."Employee_Details" (employee_id, address, guardian_name, guardian_relation, uid, uid_type, alternate_number, city, country_code, date_of_birth, father_name, first_name, last_name, middle_name, mother_name, pincode, state) VALUES (125, 'asdasda asdasdasd asdasda dsasdasd asdasda dasdasd', 'qweqweqwe', 'maalik', 'qwrewerwerwerwe', 'asdasdadasd', '1212134234', 'kanpur', 91, '1970-01-01 00:00:02.011', 'asdasdas', 'satvik', 'shukla', '', 'fgdfgdfgd', 208020, 'UP');
INSERT INTO public."Employee_Details" (employee_id, address, guardian_name, guardian_relation, uid, uid_type, alternate_number, city, country_code, date_of_birth, father_name, first_name, last_name, middle_name, mother_name, pincode, state) VALUES (127, 'asdasda asdasdasd asdasda dsasdasd asdasda dasdasd', 'qweqweqwe', 'maalik', 'dssdfsdfsdf', 'asdasdadasd', '1212134234NAGER', 'kanpur', 91, '1970-01-01 00:00:02.011', 'asdasdas', 'satvik', 'shukla', '', 'fgdfgdfgd', 208020, 'UP');
INSERT INTO public."Employee_Details" (employee_id, address, guardian_name, guardian_relation, uid, uid_type, alternate_number, city, country_code, date_of_birth, father_name, first_name, last_name, middle_name, mother_name, pincode, state) VALUES (129, '24234 sdfjhsdfjks fjksdhfskjdfs dsjhdfkjsdh fdsdf', 'dgfgdf', 'gdfgdf', 'gdfgdfg', 'dfgdfg', '8888888888', 'wkajsdnakj', 99, '2024-05-23 10:21:00.000', 'john doe', 'xyz', 'pqr', '', 'emily', 888888, 'sdkjnfksjdf');
INSERT INTO public."Employee_Details" (employee_id, address, guardian_name, guardian_relation, uid, uid_type, alternate_number, city, country_code, date_of_birth, father_name, first_name, last_name, middle_name, mother_name, pincode, state) VALUES (130, '24234 sdfjhsdfjks fjksdhfskjdfs dsjhdfkjsdh fdsdf', 'dfsdf', 'dsfsdf', 'ssdfsdfsdf', 'sdfsdfsdfsdf', '8888888888', 'wkajsdnakj', 99, '2024-05-23 11:00:00.000', 'john doe', 'xyz', 'pqr', '', 'emily', 888888, 'sdkjnfksjdf');
