create table _prisma_migrations
(
    id                  varchar(36)                            not null
        primary key,
    checksum            varchar(64)                            not null,
    finished_at         timestamp with time zone,
    migration_name      varchar(255)                           not null,
    logs                text,
    rolled_back_at      timestamp with time zone,
    started_at          timestamp with time zone default now() not null,
    applied_steps_count integer                  default 0     not null
);

alter table _prisma_migrations
    owner to postgres;

INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('cdf8f2f6-bab4-466b-bafa-62f2b952250b', 'f4bcf2aece642a6aeb3be7d9dfb4cf218cc59864d08d67d35cea84c682cb275c', '2024-05-08 04:52:08.965025 +00:00', '20240508045208_init', null, null, '2024-05-08 04:52:08.904658 +00:00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('31b296bb-287b-4adf-8458-62fe0e1fe5f6', '7040163dff0964de63434ef4e44984f6609e73a72a04e222eff81a6519152b6b', '2024-05-08 05:01:46.082107 +00:00', '20240508050146_init', null, null, '2024-05-08 05:01:46.075165 +00:00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('113e8489-463c-4c72-98fd-108f3192eaf7', '146bf68f3ce6d7733dd6ced721298f79189ac1a48ba4f9143915b518fe58731d', '2024-05-10 14:54:03.334612 +00:00', '20240510145403_init', null, null, '2024-05-10 14:54:03.327959 +00:00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('27958c69-cf34-4192-95a3-215e7f2401fb', 'dca80366be84d533ec4c0b5fe99ce0b4fe1fe49c17384076d201deb76359c1b5', '2024-05-11 08:46:25.932696 +00:00', '20240511084625_init', null, null, '2024-05-11 08:46:25.913302 +00:00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('5b68413e-b967-4bd9-8557-f00af7b67569', '4a82fa6f300f2f2002e38577809624ff07a6cd6eb87f0d9fd14726ed1563e4ce', '2024-05-11 11:11:36.855659 +00:00', '20240511111136_init', null, null, '2024-05-11 11:11:36.852006 +00:00', 1);
