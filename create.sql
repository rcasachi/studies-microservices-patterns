drop schema studies_microservices cascade;
create schema studies_microservices;

create table studies_microservices.event {
  event_id uuid,
  description text,
  price numeric,
  capacity integer
};

create table studies_microservices.ticket {
  ticket_id uuid,
  event_id uuid,
  email text,
  status text
};

create table studies_microservices.transaction {
  transaction_id uuid,
  ticket_id uuid,
  event_id uuid,
  tid text,
  price numeric,
  status text
};

insert into studies_microservices.event
  (event_id, description, price, capacity) values
  ('bf6a9b3d-4d5c-4c9d-bf12-7as98scb7as0', 'Foo Fighters', '10/10/2023 22:00', 300, 100000)