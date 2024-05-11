create table "Subject"
(
    subject_id   serial
        primary key,
    subject_name text not null,
    subject_code text not null
);

alter table "Subject"
    owner to postgres;

