CREATE TABLE cars (
  id uuid PRIMARY KEY,
  name varchar NOT NULL,
  description varchar,
  daily_rate numeric,
  available boolean DEFAULT true,
  license_plate varchar,
  fine_amount numeric,
  brand varchar,
  category_id varchar REFERENCES categories (id) ON DELETE SET NULL ON UPDATE SET NULL,
  created_at timestamp DEFAULT now()
);