CREATE TABLE marcas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL
);

CREATE TABLE proveedores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  codigo TEXT
);

CREATE TABLE articulos (
  codigo TEXT PRIMARY KEY,
  descripcion TEXT,
  rubro TEXT,
  marca_id INTEGER,
  proveedor_id INTEGER,
  costo REAL,
  ganancia REAL,
  iva REAL,
  stock INTEGER,
  stock_minimo INTEGER,
  FOREIGN KEY (marca_id) REFERENCES marcas(id),
  FOREIGN KEY (proveedor_id) REFERENCES proveedores(id)
);


CREATE TABLE movimientos_stock (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  codigo_articulo TEXT,
  tipo TEXT,
  cantidad INTEGER,
  fecha TEXT,
  FOREIGN KEY (codigo_articulo) REFERENCES articulos(codigo)
);

ALTER TABLE articulos ADD COLUMN foto TEXT;
