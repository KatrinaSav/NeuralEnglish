PGDMP     8    :            	    {            EnglishAppBD    14.9    14.9                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    41079    EnglishAppBD    DATABASE     k   CREATE DATABASE "EnglishAppBD" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Russian_Russia.1251';
    DROP DATABASE "EnglishAppBD";
                postgres    false            �            1259    41098    Article    TABLE     �   CREATE TABLE public."Article" (
    "Id" bigint NOT NULL,
    "Link" text NOT NULL,
    "Name" character varying(50) NOT NULL,
    "Id_user" bigint NOT NULL,
    "Progress" real NOT NULL
);
    DROP TABLE public."Article";
       public         heap    postgres    false            �            1259    41097    Article_Id_seq    SEQUENCE     �   ALTER TABLE public."Article" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."Article_Id_seq"
    START WITH 0
    INCREMENT BY 1
    MINVALUE 0
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    214            �            1259    41117    Card    TABLE     �   CREATE TABLE public."Card" (
    "Id" bigint NOT NULL,
    "Word" character varying(50) NOT NULL,
    "Definition" character varying(150) NOT NULL,
    "Id_collection" bigint NOT NULL,
    "Memory_degree" real NOT NULL,
    "Latest_view_date" date
);
    DROP TABLE public."Card";
       public         heap    postgres    false            �            1259    41116    Card_Id_seq    SEQUENCE     �   ALTER TABLE public."Card" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."Card_Id_seq"
    START WITH 0
    INCREMENT BY 1
    MINVALUE 0
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    216            �            1259    41087 
   Collection    TABLE     �   CREATE TABLE public."Collection" (
    "Id" bigint NOT NULL,
    "Name " character varying(50) NOT NULL,
    "Id_user" bigint NOT NULL
);
     DROP TABLE public."Collection";
       public         heap    postgres    false            �            1259    41086    Collection_Id_seq    SEQUENCE     �   ALTER TABLE public."Collection" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."Collection_Id_seq"
    START WITH 0
    INCREMENT BY 1
    MINVALUE 0
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    212            �            1259    41081    User    TABLE     �   CREATE TABLE public."User" (
    "Id" bigint NOT NULL,
    "Name" character varying(50) NOT NULL,
    "Password " character varying(30) NOT NULL,
    "Rating" real NOT NULL
);
    DROP TABLE public."User";
       public         heap    postgres    false            �            1259    41080    User_Id_seq    SEQUENCE     �   ALTER TABLE public."User" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."User_Id_seq"
    START WITH 0
    INCREMENT BY 1
    MINVALUE 0
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    210                      0    41098    Article 
   TABLE DATA           P   COPY public."Article" ("Id", "Link", "Name", "Id_user", "Progress") FROM stdin;
    public          postgres    false    214   �                 0    41117    Card 
   TABLE DATA           r   COPY public."Card" ("Id", "Word", "Definition", "Id_collection", "Memory_degree", "Latest_view_date") FROM stdin;
    public          postgres    false    216                    0    41087 
   Collection 
   TABLE DATA           @   COPY public."Collection" ("Id", "Name ", "Id_user") FROM stdin;
    public          postgres    false    212   L                 0    41081    User 
   TABLE DATA           E   COPY public."User" ("Id", "Name", "Password ", "Rating") FROM stdin;
    public          postgres    false    210   �                  0    0    Article_Id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Article_Id_seq"', 0, false);
          public          postgres    false    213                       0    0    Card_Id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Card_Id_seq"', 0, false);
          public          postgres    false    215                       0    0    Collection_Id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."Collection_Id_seq"', 0, false);
          public          postgres    false    211                       0    0    User_Id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."User_Id_seq"', 0, false);
          public          postgres    false    209            p           2606    41104    Article Article_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public."Article"
    ADD CONSTRAINT "Article_pkey" PRIMARY KEY ("Id_user");
 B   ALTER TABLE ONLY public."Article" DROP CONSTRAINT "Article_pkey";
       public            postgres    false    214            n           2606    41123    Collection Id 
   CONSTRAINT     Q   ALTER TABLE ONLY public."Collection"
    ADD CONSTRAINT "Id" PRIMARY KEY ("Id");
 ;   ALTER TABLE ONLY public."Collection" DROP CONSTRAINT "Id";
       public            postgres    false    212            r           2606    41125    Card Id_ 
   CONSTRAINT     L   ALTER TABLE ONLY public."Card"
    ADD CONSTRAINT "Id_" PRIMARY KEY ("Id");
 6   ALTER TABLE ONLY public."Card" DROP CONSTRAINT "Id_";
       public            postgres    false    216            l           2606    41085    User User_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY ("Id");
 <   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
       public            postgres    false    210            u           2606    41126    Card Id_collection    FK CONSTRAINT     �   ALTER TABLE ONLY public."Card"
    ADD CONSTRAINT "Id_collection" FOREIGN KEY ("Id_collection") REFERENCES public."Collection"("Id") NOT VALID;
 @   ALTER TABLE ONLY public."Card" DROP CONSTRAINT "Id_collection";
       public          postgres    false    212    3182    216            s           2606    41092    Collection Id_user    FK CONSTRAINT     z   ALTER TABLE ONLY public."Collection"
    ADD CONSTRAINT "Id_user" FOREIGN KEY ("Id_user") REFERENCES public."User"("Id");
 @   ALTER TABLE ONLY public."Collection" DROP CONSTRAINT "Id_user";
       public          postgres    false    212    210    3180            t           2606    41105    Article Id_user    FK CONSTRAINT     w   ALTER TABLE ONLY public."Article"
    ADD CONSTRAINT "Id_user" FOREIGN KEY ("Id_user") REFERENCES public."User"("Id");
 =   ALTER TABLE ONLY public."Article" DROP CONSTRAINT "Id_user";
       public          postgres    false    210    214    3180               I   x�3��())(���O��+���,HM�L��/J���+�2��9a���)�!M��E���PʐӀ+F��� �&#         0   x�3�tIL�LK,�H-�4�4����2�H,*�
$�$���1z\\\ �         )   x�3�J�I,���+��,�4�2�tK��̩�4����� �|�         &   x�3�t��LN�442615�4�2�t�O�qM�b���� ��     