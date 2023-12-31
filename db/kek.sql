--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.5

-- Started on 2023-11-06 16:16:42

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 209 (class 1259 OID 32789)
-- Name: Article; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Article" (
    "Id" bigint NOT NULL,
    "Link" text NOT NULL,
    "Name" character varying(50) NOT NULL,
    "Page_count" integer NOT NULL
);


ALTER TABLE public."Article" OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 32852)
-- Name: ArticleContent; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ArticleContent" (
    "Id" bigint NOT NULL,
    "Id_article" bigint NOT NULL,
    "Page_number" integer NOT NULL,
    "Text" character varying NOT NULL
);


ALTER TABLE public."ArticleContent" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 32851)
-- Name: ArticleContent_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."ArticleContent" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."ArticleContent_Id_seq"
    START WITH 0
    INCREMENT BY 1
    MINVALUE 0
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 210 (class 1259 OID 32794)
-- Name: Article_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Article" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."Article_Id_seq"
    START WITH 0
    INCREMENT BY 1
    MINVALUE 0
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 211 (class 1259 OID 32795)
-- Name: Card; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Card" (
    "Id" bigint NOT NULL,
    "Word" character varying(50) NOT NULL,
    "Definition" character varying(150) NOT NULL,
    "Id_collection" bigint NOT NULL,
    "Memory_degree" real NOT NULL,
    "Latest_view_date" date
);


ALTER TABLE public."Card" OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 32798)
-- Name: Card_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Card" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."Card_Id_seq"
    START WITH 0
    INCREMENT BY 1
    MINVALUE 0
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 213 (class 1259 OID 32799)
-- Name: Collection; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Collection" (
    "Id" bigint NOT NULL,
    "Name " character varying(50) NOT NULL,
    "Id_user" bigint NOT NULL
);


ALTER TABLE public."Collection" OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 32802)
-- Name: Collection_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Collection" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."Collection_Id_seq"
    START WITH 0
    INCREMENT BY 1
    MINVALUE 0
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 215 (class 1259 OID 32803)
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    "Id" bigint NOT NULL,
    "Name" character varying(50) NOT NULL,
    "Password " character varying(30) NOT NULL,
    "Rating" real NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 32833)
-- Name: UserToArticles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UserToArticles" (
    "Id" bigint NOT NULL,
    "Id_user" bigint NOT NULL,
    "Progress" integer NOT NULL,
    "Id_article" bigint NOT NULL
);


ALTER TABLE public."UserToArticles" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 32832)
-- Name: UserToArticles_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."UserToArticles" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."UserToArticles_Id_seq"
    START WITH 0
    INCREMENT BY 1
    MINVALUE 0
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 216 (class 1259 OID 32806)
-- Name: User_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."User" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."User_Id_seq"
    START WITH 0
    INCREMENT BY 1
    MINVALUE 0
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3345 (class 0 OID 32789)
-- Dependencies: 209
-- Data for Name: Article; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Article" ("Id", "Link", "Name", "Page_count") FROM stdin;
0	https://en.wikipedia.org/wiki/Syringa	Syringa	3
1	https://en.wikipedia.org/wiki/Europe	Europe	2
2	https://en.wikipedia.org/wiki/Syringa	Syringa	1
3	https://en.wikipedia.org/wiki/Battle_of_Camar%C3%B3n	Battle	1
\.


--
-- TOC entry 3356 (class 0 OID 32852)
-- Dependencies: 220
-- Data for Name: ArticleContent; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ArticleContent" ("Id", "Id_article", "Page_number", "Text") FROM stdin;
0	0	1	nghfntn ynryf waef j,hug
1	0	2	rsgrg yjfyds uukftg yjdtfyjkguk dtyhdtyfh fyghdyhft yjfyhfgyjhrtyjd thdthd
2	0	3	rtghrdt thetrhe tgherh trghet egthet tgrb
3	1	1	thethrt ryrjryj yjryumjfhgb utyunr
4	1	2	etgtghnyt  rujmtyujnrt rtyjtyuneregt ujrnftdgs jr7thyetg ujrte
5	3	1	ergetr trghetyh tger5g
6	2	1	wrerver brverv gerv
\.


--
-- TOC entry 3347 (class 0 OID 32795)
-- Dependencies: 211
-- Data for Name: Card; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Card" ("Id", "Word", "Definition", "Id_collection", "Memory_degree", "Latest_view_date") FROM stdin;
0	Dad	father	1	0	\N
1	Partner	bla	0	0	\N
\.


--
-- TOC entry 3349 (class 0 OID 32799)
-- Dependencies: 213
-- Data for Name: Collection; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Collection" ("Id", "Name ", "Id_user") FROM stdin;
0	Relationship	0
1	Family	1
\.


--
-- TOC entry 3351 (class 0 OID 32803)
-- Dependencies: 215
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" ("Id", "Name", "Password ", "Rating") FROM stdin;
0	Alice	123456	5
1	Bob	123456	4
\.


--
-- TOC entry 3354 (class 0 OID 32833)
-- Dependencies: 218
-- Data for Name: UserToArticles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."UserToArticles" ("Id", "Id_user", "Progress", "Id_article") FROM stdin;
0	1	1	2
1	0	1	3
2	0	1	1
3	0	1	0
\.


--
-- TOC entry 3362 (class 0 OID 0)
-- Dependencies: 219
-- Name: ArticleContent_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ArticleContent_Id_seq"', 0, false);


--
-- TOC entry 3363 (class 0 OID 0)
-- Dependencies: 210
-- Name: Article_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Article_Id_seq"', 0, true);


--
-- TOC entry 3364 (class 0 OID 0)
-- Dependencies: 212
-- Name: Card_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Card_Id_seq"', 0, false);


--
-- TOC entry 3365 (class 0 OID 0)
-- Dependencies: 214
-- Name: Collection_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Collection_Id_seq"', 0, false);


--
-- TOC entry 3366 (class 0 OID 0)
-- Dependencies: 217
-- Name: UserToArticles_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."UserToArticles_Id_seq"', 0, false);


--
-- TOC entry 3367 (class 0 OID 0)
-- Dependencies: 216
-- Name: User_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_Id_seq"', 0, true);


--
-- TOC entry 3200 (class 2606 OID 32865)
-- Name: ArticleContent ArticleContent_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArticleContent"
    ADD CONSTRAINT "ArticleContent_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 3190 (class 2606 OID 32831)
-- Name: Article Article_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Article"
    ADD CONSTRAINT "Article_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 3194 (class 2606 OID 32810)
-- Name: Collection Id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Collection"
    ADD CONSTRAINT "Id" PRIMARY KEY ("Id");


--
-- TOC entry 3192 (class 2606 OID 32812)
-- Name: Card Id_; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Card"
    ADD CONSTRAINT "Id_" PRIMARY KEY ("Id");


--
-- TOC entry 3198 (class 2606 OID 32849)
-- Name: UserToArticles UserToArticles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserToArticles"
    ADD CONSTRAINT "UserToArticles_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 3196 (class 2606 OID 32814)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 3204 (class 2606 OID 32843)
-- Name: UserToArticles Id_article; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserToArticles"
    ADD CONSTRAINT "Id_article" FOREIGN KEY ("Id_article") REFERENCES public."Article"("Id");


--
-- TOC entry 3205 (class 2606 OID 32859)
-- Name: ArticleContent Id_article; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ArticleContent"
    ADD CONSTRAINT "Id_article" FOREIGN KEY ("Id_article") REFERENCES public."Article"("Id");


--
-- TOC entry 3201 (class 2606 OID 32815)
-- Name: Card Id_collection; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Card"
    ADD CONSTRAINT "Id_collection" FOREIGN KEY ("Id_collection") REFERENCES public."Collection"("Id") NOT VALID;


--
-- TOC entry 3202 (class 2606 OID 32820)
-- Name: Collection Id_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Collection"
    ADD CONSTRAINT "Id_user" FOREIGN KEY ("Id_user") REFERENCES public."User"("Id");


--
-- TOC entry 3203 (class 2606 OID 32838)
-- Name: UserToArticles Id_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserToArticles"
    ADD CONSTRAINT "Id_user" FOREIGN KEY ("Id_user") REFERENCES public."User"("Id");


-- Completed on 2023-11-06 16:16:43

--
-- PostgreSQL database dump complete
--

