create table "Token"
(
    token         text                                   not null,
    user_id       integer                                not null
        references "User"
            on update cascade on delete restrict,
    created_at    timestamp(3) default CURRENT_TIMESTAMP not null,
    "exp_At"      timestamp(3)                           not null,
    ip            text,
    role          "Role"                                 not null,
    is_logged_out boolean      default false             not null
);

alter table "Token"
    owner to postgres;

create unique index "Token_token_key"
    on "Token" (token);

create unique index "Token_user_id_key"
    on "Token" (user_id);

INSERT INTO public."Token" (token, user_id, created_at, "exp_At", ip, role, is_logged_out) VALUES ('c90edecc-f889-4a9c-b438-9c1711d0218d', 1, '2024-05-11 10:02:37.643', '2024-05-11 11:45:14.048', null, 'ADMIN', false);
INSERT INTO public."Token" (token, user_id, created_at, "exp_At", ip, role, is_logged_out) VALUES ('fe3bec0b-87ec-40f6-8a6c-8427874533df', 127, '2024-05-11 10:08:47.418', '2024-05-11 11:57:45.658', null, 'MANAGEMENT', true);
INSERT INTO public."Token" (token, user_id, created_at, "exp_At", ip, role, is_logged_out) VALUES ('b5cd12c6-48c9-4398-94ad-df2eb61f0ef6', 130, '2024-05-11 11:01:02.210', '2024-05-11 12:01:02.207', null, 'ADMISSION', false);
