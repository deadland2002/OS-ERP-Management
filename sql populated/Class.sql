create table "Class"
(
    class_id       serial
        primary key,
    class_name     text               not null,
    capacity       integer            not null,
    coordinator    integer
                                      references "Employee_Details" ()
                                          on update cascade on delete set null,
    fees_per_month numeric(65, 30)    not null,
    total_lectures integer default 0  not null,
    end_date       timestamp(3),
    start_date     timestamp(3),
    total_months   integer default 12 not null
);

alter table "Class"
    owner to postgres;

create unique index "Class_class_name_key"
    on "Class" (class_name);

INSERT INTO public."Class" (class_id, class_name, capacity, coordinator, fees_per_month, total_lectures, end_date, start_date, total_months) VALUES (4, 'CLASS-12-B', 30, null, 1200.000000000000000000000000000000, 0, null, null, 12);
INSERT INTO public."Class" (class_id, class_name, capacity, coordinator, fees_per_month, total_lectures, end_date, start_date, total_months) VALUES (3, 'CLASS-12-A', 30, null, 1000.000000000000000000000000000000, 0, null, null, 12);
INSERT INTO public."Class" (class_id, class_name, capacity, coordinator, fees_per_month, total_lectures, end_date, start_date, total_months) VALUES (6, 'CLASS-12-C', 30, null, 1200.000000000000000000000000000000, 0, null, null, 12);
INSERT INTO public."Class" (class_id, class_name, capacity, coordinator, fees_per_month, total_lectures, end_date, start_date, total_months) VALUES (7, 'CLASS-10-A', 30, null, 1200.000000000000000000000000000000, 0, null, null, 12);
INSERT INTO public."Class" (class_id, class_name, capacity, coordinator, fees_per_month, total_lectures, end_date, start_date, total_months) VALUES (9, 'CLASS-8-A', 20, null, 1200.000000000000000000000000000000, 0, null, null, 12);
INSERT INTO public."Class" (class_id, class_name, capacity, coordinator, fees_per_month, total_lectures, end_date, start_date, total_months) VALUES (8, 'CLASS-10-C', 10, 125, 4434.000000000000000000000000000000, 10, '2025-01-01 00:00:02.011', '2024-01-01 00:00:02.011', 10);
