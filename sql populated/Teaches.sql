create table "Teaches"
(
    teacher_id integer not null
        references "Employee_Details" ()
            on update cascade on delete restrict,
    subject_id integer not null
        references "Subject"
            on update cascade on delete restrict,
    primary key (teacher_id, subject_id)
);

alter table "Teaches"
    owner to postgres;

