-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.group_class_enrollments (
  group_class_id uuid NOT NULL,
  student_id uuid NOT NULL,
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  enrolled_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT group_class_enrollments_pkey PRIMARY KEY (id),
  CONSTRAINT group_class_enrollments_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.users(id),
  CONSTRAINT group_class_enrollments_group_class_id_fkey FOREIGN KEY (group_class_id) REFERENCES public.group_classes(id)
);
CREATE TABLE public.group_classes (
  title text NOT NULL,
  description text,
  teacher_id uuid NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  schedule_day text NOT NULL,
  schedule_time time without time zone NOT NULL,
  max_students integer NOT NULL,
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  current_enrollment integer NOT NULL DEFAULT 0,
  CONSTRAINT group_classes_pkey PRIMARY KEY (id),
  CONSTRAINT group_classes_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES public.users(id)
);
CREATE TABLE public.private_lesson_offerings (
  instrument text NOT NULL,
  skill_level text NOT NULL,
  description text,
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  default_duration integer NOT NULL DEFAULT 60,
  CONSTRAINT private_lesson_offerings_pkey PRIMARY KEY (id)
);
CREATE TABLE public.private_lessons (
  offering_id uuid NOT NULL,
  teacher_id uuid NOT NULL,
  start_time timestamp with time zone NOT NULL,
  end_time timestamp with time zone NOT NULL,
  student_id uuid,
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  is_booked boolean NOT NULL DEFAULT false,
  CONSTRAINT private_lessons_pkey PRIMARY KEY (id),
  CONSTRAINT private_lesson_slots_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES public.users(id),
  CONSTRAINT private_lesson_slots_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.users(id),
  CONSTRAINT private_lesson_slots_offering_id_fkey FOREIGN KEY (offering_id) REFERENCES public.private_lesson_offerings(id)
);
CREATE TABLE public.users (
  email text NOT NULL,
  first_name text NOT NULL,
  role USER-DEFINED NOT NULL,
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT (now() AT TIME ZONE 'utc'::text),
  updated_at timestamp with time zone DEFAULT (now() AT TIME ZONE 'utc'::text),
  registrant_type USER-DEFINED,
  address text,
  city text,
  province text,
  postal_code text,
  phone_number text NOT NULL,
  last_name text NOT NULL,
  CONSTRAINT users_pkey PRIMARY KEY (id)
);