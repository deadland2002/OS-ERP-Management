create table "User"
(
    user_id    serial
        primary key,
    name       text                             not null,
    email      text                             not null,
    password   text                             not null,
    "mobileNo" text                             not null,
    role       "Role" default 'TEACHER'::"Role" not null,
    image_url  text
);

alter table "User"
    owner to postgres;

create unique index "User_email_key"
    on "User" (email);

create unique index "User_mobileNo_key"
    on "User" ("mobileNo");

INSERT INTO public."User" (user_id, name, email, password, "mobileNo", role, image_url) VALUES (1, 'satvik', 'satvik@gmail.com', '$2b$10$f/Zhf/9/eYCx2DlLtprQgu3OSXwy2O8pXF/V3URSuu6rGKpDXFZfe', '+919260981557', 'ADMIN', null);
INSERT INTO public."User" (user_id, name, email, password, "mobileNo", role, image_url) VALUES (125, 'satvik shukla', 'filetest1@gmail.com', '$2b$10$0lUKFq753pbGGGPIcMWPEeRSaVOKAEyCqNNHO30CVgAL4fFjFDMda', '9260981557', 'TEACHER', '/files/TEACHER/4bd35057-b420-4e65-989f-24550ff2b79b.jpg');
INSERT INTO public."User" (user_id, name, email, password, "mobileNo", role, image_url) VALUES (127, 'satvik shukla', 'filetest2@gmail.com', '$2b$10$NzWRcAP2ojBcKIneMDLTL.FkRsnKNpmABjQGSGYZ14E9ZtG9YduNW', '9260981556', 'MANAGEMENT', '/files/MANAGEMENT/14602c48-3583-45be-8b3c-e5833bdef05b.jpg');
INSERT INTO public."User" (user_id, name, email, password, "mobileNo", role, image_url) VALUES (129, 'xyz pqr', 'test2@gmail.com', '$2b$10$cSWugX7XfRnVw6QbSFkA7u6jXjiYkS3lzpO2Br/.DbZYGe/1SHZwm', '9999999999', 'ACCOUNTS', '/files/ACCOUNTS/228a5079-43b4-4731-a9ad-5ef7cfa05e76.jpg');
INSERT INTO public."User" (user_id, name, email, password, "mobileNo", role, image_url) VALUES (130, 'xyz pqr', 'test@gmail.com', '$2b$10$u.6AHR6mqu3SUfaKj1Dmy.Kcx2hcTclyuj90e2lhEgi/LuL1WtjAa', '9994399999', 'ADMISSION', '/files/ADMISSION/19822df2-3e3c-4512-a84a-f2576ac56eef.jpg');
INSERT INTO public."User" (user_id, name, email, password, "mobileNo", role, image_url) VALUES (131, 'xyz pqr', 'test12@gmail.com', '$2b$10$SS6XYuo2wEu7s.aIdJ5nkOjeScfMqfoOdrhHVno3WvpUUAzQzdFDe', '9999999912', 'STUDENT', '/files/STUDENT/860a6f50-c5e5-4c84-bd5c-c51eb03c7b19.jpg');
INSERT INTO public."User" (user_id, name, email, password, "mobileNo", role, image_url) VALUES (132, 'xyz pqr', 'test13@gmail.com', '$2b$10$eCZJLOw3ekoNNNADiuaUNOE4PmvQm912eFJLVUUmS3W.2RpKe0AQi', '9999999913', 'STUDENT', '/files/STUDENT/4f0202a9-7ce0-4f76-925d-d14f28684055.jpg');
INSERT INTO public."User" (user_id, name, email, password, "mobileNo", role, image_url) VALUES (133, 'xyz pqr', 'test14@gmail.com', '$2b$10$/NvTDWIzzhSKzFj6Q4pGSOUHfhA/6YJ1FP0yTYApC4jnsJgwTHLTa', '9999999914', 'STUDENT', '/files/STUDENT/3c557041-7082-47aa-a750-272a9030e494.jpg');
INSERT INTO public."User" (user_id, name, email, password, "mobileNo", role, image_url) VALUES (134, 'xyz pqr', 'test15@gmail.com', '$2b$10$HOjrRS8n1h1K0a/fhd1u8.VHBK8e04A1jEJ4jO20RuVrAjh1rCFuC', '9999999915', 'STUDENT', '/files/STUDENT/a9d07d81-53e2-4f78-89c9-0e3466c18c89.jpg');
INSERT INTO public."User" (user_id, name, email, password, "mobileNo", role, image_url) VALUES (135, 'xyz pqr', 'test16@gmail.com', '$2b$10$1Iog6y/fTa.Kw2c3uY5LsemilwNuoTPEKM1k7avF.YkcAx3G6Rrg2', '9999999916', 'STUDENT', '/files/STUDENT/5ac455a5-4927-43d4-9816-025a76a708bf.jpg');
INSERT INTO public."User" (user_id, name, email, password, "mobileNo", role, image_url) VALUES (136, 'xyz pqr', 'test17@gmail.com', '$2b$10$ABHPT.6oV/Ut/2I6ctdgBeR.AoBjnnMuuk6UupOStSpZx2ftc4ajm', '9999999917', 'STUDENT', '/files/STUDENT/bc4252ea-dd0b-49ca-a8df-7081387cf59b.jpg');
INSERT INTO public."User" (user_id, name, email, password, "mobileNo", role, image_url) VALUES (137, 'xyz pqr', 'test18@gmail.com', '$2b$10$QOnyMoTmvgS9E1QnTCP.peZzBJALPe0DCR/ZLoOUIO/r//MUx0coC', '9999999918', 'STUDENT', '/files/STUDENT/2cd9d5b3-ecf2-4d3f-aad9-d25276b235e1.jpg');
INSERT INTO public."User" (user_id, name, email, password, "mobileNo", role, image_url) VALUES (138, 'xyz pqr', 'test19@gmail.com', '$2b$10$dlkwvve33XNNLDEEBQST0uWmfChXyzsY2Ohk9oIwoZT0M24wTBMEq', '9999999919', 'STUDENT', '/files/STUDENT/9390d62c-03e4-457e-8016-928d4cb8d1df.jpg');
