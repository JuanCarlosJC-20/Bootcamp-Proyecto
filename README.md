Fighting Game

El siguiente juego fue desarrollado:

⦁	C# para back-end

⦁	Rect js+ tailwind en el front-end

⦁	SQL server para Base de datos


Para visualizar el proyecto realice lo siguiente:

⦁	Para ver la base de datos realice las migraciones en el back-end con el siguiente comando:

Add-Migration InitialMigration -Context ApplicationDbContext -Project Entity -StartupProject Web

Update-Database -Context ApplicationDbContext -Project Entity -StartupProject Web


⦁	Para el front-end entre a la carpeta de /Front-end luego a /bootcamp y ahí realicen los siguientes comandos:

npm install

npm run dev

⦁	Ejecute el siguiente script sql en la base datos para tener la información de las cartas:


USE GameCards;

GO

INSERT INTO Cards (name, image, health, letterLevel, damage, endurance, power, scope) VALUES ('Valkiria', 'https://drive.google.com/uc?export=view&id=1MZDljES8TyFqcSBKVNcRUGIWbCcDAi9i', 93, 5, 49, 26, 73, 32);
INSERT INTO Cards (name, image, health, letterLevel, damage, endurance, power, scope) VALUES ('Rayito', 'https://drive.google.com/uc?export=view&id=17qBJfAAD2H-eUcSopfR-f0L6zaeOZLpI', 92, 3, 46, 27, 74, 23);
INSERT INTO Cards (name, image, health, letterLevel, damage, endurance, power, scope) VALUES ('Mago', 'https://drive.google.com/uc?export=view&id=1CO3PuKj0dU7XiT9Gb8Vrzn4picTh7gx2', 118, 4, 31, 53, 31, 64);
INSERT INTO Cards (name, image, health, letterLevel, damage, endurance, power, scope) VALUES ('Bruja', 'https://drive.google.com/uc?export=view&id=19uAQdIlXzBDALlZ5D5hvq-TfV7dNcDBH', 92, 5, 49, 55, 43, 62);
INSERT INTO Cards (name, image, health, letterLevel, damage, endurance, power, scope) VALUES ('RompeMuros', 'https://drive.google.com/uc?export=view&id=16OPMA-rP0c412R05THxYNN-VFC6aWLnV ', 81, 3, 43, 36, 67, 27);
INSERT INTO Cards (name, image, health, letterLevel, damage, endurance, power, scope) VALUES
('Chispas', 'https://drive.google.com/uc?export=view&id=1if3YoP5j8L5n94QAuXMhfUpN3-c-VBWF', 81, 3, 43, 36, 67, 27),
('Duendo Lanzador', 'https://drive.google.com/uc?export=view&id=1JdROEndghtDEIjOF2d0fMPn7kbm1oiEF', 103, 4, 50, 29, 50, 40),
('Dragon electrico', 'https://drive.google.com/uc?export=view&id=1zOR5dl0aQe01mvvbQ9ZV1_qtb93zrqu_', 90, 5, 32, 59, 44, 52),
('Esqueleto', 'https://drive.google.com/uc?export=view&id=1zJ3MutJ68uRFKTVHdDfuL8KG7S_TL-mK', 88, 4, 38, 50, 52, 53),
('Cerdos Reales', 'https://drive.google.com/uc?export=view&id=1wa-RC9iZoQXQpJAjAnkhpB40CIrpn7Mf', 122, 5, 20, 42, 76, 19),
('Guardias Reales', 'https://drive.google.com/uc?export=view&id=1rcwKUKEzKLMRHdKvJ2b7jNISykzK0TYk', 118, 2, 49, 21, 34, 76),
('Guerrero', 'https://drive.google.com/uc?export=view&id=1KK165TvTM19Fwsi5HEGWHVMpYSuP7pEt', 90, 3, 38, 40, 73, 29),
('Horda Esqueletos', 'https://drive.google.com/uc?export=view&id=1ISf59XeoBo9lV8Zx6h8kIdIEzB7D1hqF', 110, 5, 32, 50, 74, 20),
('Dragones Esqueletos', 'https://drive.google.com/uc?export=view&id=1D_LgHlB5O8N3qa1rIA24kaC36gGhUym4', 102, 4, 21, 38, 90, 20),
('Rey Esqueleto', 'https://drive.google.com/uc?export=view&id=1pdLnOmgJv6doPabqB14hxK5rAtW2ZGZV', 107, 5, 43, 58, 60, 35),
('Aña', 'https://drive.google.com/uc?export=view&id=1mVLAwYyPJR6w8e0fK268LEk08UeSVrJb', 109, 3, 44, 28, 72, 30),
('Pistolera', 'https://drive.google.com/uc?export=view&id=1p29HFfaMibNT1UAQRePUrVGffDj5d-m8', 105, 3, 47, 50, 52, 49),
('Aña gigante', 'https://drive.google.com/uc?export=view&id=1ZLA6H-tW4ySw-TwEfKekhT6K3S3RBtTH', 89, 2, 36, 40, 79, 21),
('Aña poderoso', 'https://drive.google.com/uc?export=view&id=1u7lzyugoX77SvACF-pIyiSWlfuuTRP4S', 87, 1, 46, 52, 74, 29),
('Principe', 'https://drive.google.com/uc?export=view&id=1M2aO0VIwqT87NHZRLpgTU8ZpuQnJ0qY2', 99, 3, 32, 46, 74, 18),
('Jodans', 'https://drive.google.com/uc?export=view&id=1hPx1E5kLUt2OXN76xQTPNtrHU2TCqZUH', 112, 3, 43, 45, 54, 43),
('Caballero', 'https://drive.google.com/uc?export=view&id=1dAV3VhMa18AgfXUruJpWaQYNbGGKHNS0', 117, 4, 22, 59, 33, 71),
('Leñador', 'https://drive.google.com/uc?export=view&id=17lu80ZxkVWB5N3CNhcIQ4rxp-_A364UM', 118, 1, 34, 45, 59, 46),
('Gran Caballero', 'https://drive.google.com/uc?export=view&id=1kiFJywQBw6HFNYObVZI-7cREvwd22_3b', 111, 3, 40, 40, 88, 6),
('Minero', 'https://drive.google.com/uc?export=view&id=1xAu3Ve_GWPoynC2A-0Xu5idugCbB-vOR', 86, 1, 49, 52, 36, 72),
('Demonio', 'https://drive.google.com/uc?export=view&id=1gH9dgA5LWrQmi-v1CC3n2RWnfT1c5SNf', 97, 3, 36, 35, 65, 39),
('Bruja', 'https://drive.google.com/uc?export=view&id=1-dQtn1Gk1uAQYEpqIP4OVGhB51d8vXPk', 129, 5, 47, 39, 44, 53),
('Cementerio', 'https://drive.google.com/uc?export=view&id=1D0eHzegiv84IOKTnDonnuAlOOkb8YFke', 118, 2, 43, 37, 36, 59),
('Caballero esqueletos', 'https://drive.google.com/uc?export=view&id=1WdkOxQV07pXnh4ExgfVIcjU_qN3Vxjtb', 80, 1, 41, 39, 85, 11),
('Monta Puerco', 'https://drive.google.com/uc?export=view&id=11KFSMTPuqyr89ULBgGxzov3xjvMKITCg', 112, 2, 39, 52, 40, 70),
('Pistolero', 'https://drive.google.com/uc?export=view&id=1OoQsgQRbf1BQkCZc1Hpmn4gxuf4HA6tI', 81, 5, 46, 36, 33, 73),
('Espiritu de hielo', 'https://drive.google.com/uc?export=view&id=1XxHK7PWkRBKZKustGrIjnJOO5hMF4E26', 121, 2, 30, 42, 48, 54),
('Bebe Dragon fuego', 'https://drive.google.com/uc?export=view&id=1v0JJTDV8LGRlffhX9xpb1gjvFe3rcC1j', 97, 4, 34, 23, 49, 55),
('Espiritu de fuego', 'https://drive.google.com/uc?export=view&id=1JKbMhzLScCoLVDbXphf9LO6So7X04lGR', 127, 5, 25, 37, 89, 14),
('Rey Fantasma', 'https://drive.google.com/uc?export=view&id=1wnXs_Xp-YLJdD1TCyfXH_sOstKsnsYmZ', 113, 1, 46, 49, 34, 74),
('Gigante Noble', 'https://drive.google.com/uc?export=view&id=1sUKfc1v5zvw_5nA_UKaTdToF3BVtKd6J', 112, 3, 38, 39, 36, 58),
('Trio Duendes', 'https://drive.google.com/uc?export=view&id=1xhOOxAaAXxQm1ShmWwvm5URT_PYfNeSi', 126, 5, 24, 39, 40, 61),
('Duende', 'https://drive.google.com/uc?export=view&id=1XVf-tcygHMJvhF_vi-dby10sFOMoh7mQ', 88, 5, 28, 41, 54, 45),
('Golem', 'https://drive.google.com/uc?export=view&id=1US6CZNcAQbXwgJZLbYJegeZFdB-z1VkX', 110, 5, 29, 41, 32, 63),
('Dragon Electrico', 'https://drive.google.com/uc?export=view&id=1-VtIFCu0Na0_6ibQHxYTL-IiBUDfFTTT', 117, 2, 28, 57, 53, 51),
('Gigante Electrico', 'https://drive.google.com/uc?export=view&id=1bOol2AsuyXIGCxSHCDHGfTq2EnO8KMgD', 97, 3, 37, 43, 52, 56),
('Espiritu electrico', 'https://drive.google.com/uc?export=view&id=1QAaunAZCImB1c2m_lyC3_JqKb2P1DWxy', 122, 1, 23, 44, 34, 62),
('Mago Electrico', 'https://drive.google.com/uc?export=view&id=1HpZc2uImDpQdv-BUcFm13Ts73Y8IQxLa', 80, 2, 37, 55, 42, 52),
('Verdugo', 'https://drive.google.com/uc?export=view&id=15kez6v0pR-iGvG9Xd2pTcYrewto9yIQL', 95, 2, 31, 27, 87, 5),
('Tiradora', 'https://drive.google.com/uc?export=view&id=1-iZ6FpLq5FnEBC4JspBMk0i8oKwfeFMo', 92, 3, 20, 53, 30, 80),
('Esqueleto Bombardero', 'https://drive.google.com/uc?export=view&id=1qVcVMY4HrPcOhLD4CuqcUCK2HZospQ_5', 83, 1, 32, 43, 55, 53),
('Maestra de Armas', 'https://drive.google.com/uc?export=view&id=1NPfueMdI97xjTSNCd7KpF6FZZR6oC-Kr', 98, 2, 26, 36, 61, 39),
('Lanza Rocas', 'https://drive.google.com/uc?export=view&id=1lY_ciyE87B5Yy9YnP4DBM0I0WqfTFidG', 125, 4, 31, 31, 88, 17),
('Caballero Oscuro', 'https://drive.google.com/uc?export=view&id=1PaaOdUYAJess9l1NTRZwnIFWcf_v5S1-', 122, 5, 27, 45, 37, 63),
('Duende Tirador', 'https://drive.google.com/uc?export=view&id=1ad1r-aGaLfIAFJmabEbL-JMBU7p-X9Vq', 105, 2, 33, 28, 30, 60),
('Escudero Real', 'https://drive.google.com/uc?export=view&id=14a0t9ft7KtwFKVNxjobWZHfmMskwLnF2', 103, 4, 20, 25, 61, 29),
('Elites', 'https://drive.google.com/uc?export=view&id=186YftWa-0iZ94sVdM_5kDNyUup1HRgLm', 105, 2, 47, 56, 53, 51),
('Bombardero', 'https://drive.google.com/uc?export=view&id=1BPllxgSSG4iMOy2wnPyTJAt3Fur49rE5', 107, 3, 37, 28, 64, 26),
('Duende Volador', 'https://drive.google.com/uc?export=view&id=14YA8zeDXtBr0-e6KaK0W5gWoaal3Z6PY', 105, 4, 42, 37, 90, 11),
('Murcielagos', 'https://drive.google.com/uc?export=view&id=1g6GrQSsZWuzEHYP_C2ViqE3sc3qoFqxI', 91, 3, 28, 52, 38, 64),
('Guardiana Eterna', 'https://drive.google.com/uc?export=view&id=1eOvUoq-hTQK1_2doRkpNFUmo3DbZOSaF', 95, 1, 29, 52, 67, 26);
