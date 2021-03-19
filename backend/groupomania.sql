-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `idComment` smallint unsigned NOT NULL AUTO_INCREMENT,
  `itemId` smallint unsigned NOT NULL,
  `userCommId` smallint unsigned NOT NULL,
  `descriptionComm` mediumtext,
  `dateComm` datetime NOT NULL,
  `pseudoUserComm` varchar(100) NOT NULL,
  PRIMARY KEY (`idComment`),
  KEY `fk_comment_user` (`userCommId`),
  KEY `fk_comm_item` (`itemId`),
  CONSTRAINT `fk_comm_item` FOREIGN KEY (`itemId`) REFERENCES `item` (`id`),
  CONSTRAINT `fk_comment_user` FOREIGN KEY (`userCommId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,1,10,'Félicitations','2021-03-06 10:51:23','Almohelo'),(4,1,10,'Premier test pour la création d\'un commentaire','2021-03-06 13:03:22','Almohelo'),(5,1,10,'blablabla','2021-03-06 15:11:29','Almohelo'),(17,1,13,'test','2021-03-06 17:33:26','test2'),(21,61,110,'Génial comme mémo ! Ca va beaucoup m\'aider !','2021-03-11 16:05:56','edith'),(22,61,26,'Très pratique ! Merci !!','2021-03-11 16:07:11','test4'),(23,59,10,'Ca change comme logo pourquoi pas !','2021-03-11 17:15:59','Almohelo'),(24,63,167,'Il faut se méfier des politiciens !','2021-03-12 17:34:56','Antoine'),(37,1,10,'test','2021-03-18 11:35:35','Almo');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `description` mediumtext,
  `imageURL` varchar(100) DEFAULT NULL,
  `likes` smallint DEFAULT NULL,
  `dislikes` smallint DEFAULT NULL,
  `pseudoUser` varchar(100) NOT NULL,
  `userItemId` smallint unsigned NOT NULL,
  `nbComm` smallint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_user_id` (`userItemId`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`userItemId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (1,'2021-02-24 19:12:38','Mon 1er article',NULL,3,2,'antho',1,6),(24,'2021-03-14 15:16:44','Le bâtiment de l\'entreprise','http://localhost:3000/images/batiment.jpg1615731385028.jpg',2,0,'Almo',10,0),(26,'2021-03-05 09:18:59','Mon premier article',NULL,1,1,'jacques',15,0),(27,'2021-03-05 09:19:10','Mon second',NULL,1,0,'jacques',15,0),(28,'2021-03-05 09:20:36','Mon premier test',NULL,0,1,'test4',26,0),(29,'2021-03-05 09:24:29','Test like !',NULL,1,0,'test4',26,0),(59,'2021-03-14 15:15:59','Proposition d\'un nouveau logo','http://localhost:3000/images/icon-left-font.png1615731359441.png',3,1,'Almo',10,1),(61,'2021-03-11 16:02:28','Explications des différentes jointures !','http://localhost:3000/images/sql-join-infographie.png1615474948789.png',3,0,'Almo',10,2),(62,'2021-03-11 19:30:44','C\'est mon premier article !!!!!','http://localhost:3000/images/sauce-piment-la-plus-piquante-du-monde.jpg1615487444688.jpg',2,0,'John',166,0),(63,'2021-03-12 17:34:05','Le covid-19 ! Terrible réalité !','http://localhost:3000/images/téléchargement.jfif1615566845452.jpg',1,2,'Antoine',167,1),(64,'2021-03-14 14:43:32','Test sur les images pour quelles ne soient pas obligatoires','NULL',2,0,'Almo',10,0);
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `idReport` int unsigned NOT NULL AUTO_INCREMENT,
  `idReportItem` smallint unsigned DEFAULT NULL,
  `dateReport` datetime NOT NULL,
  `idReportUser` smallint unsigned NOT NULL,
  `idReportComment` smallint unsigned DEFAULT NULL,
  PRIMARY KEY (`idReport`),
  KEY `idReportComment` (`idReportComment`),
  KEY `fk_report_item` (`idReportItem`),
  KEY `fk_report_user` (`idReportUser`),
  CONSTRAINT `fk_report_item` FOREIGN KEY (`idReportItem`) REFERENCES `item` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_report_user` FOREIGN KEY (`idReportUser`) REFERENCES `user` (`userId`),
  CONSTRAINT `report_ibfk_1` FOREIGN KEY (`idReportComment`) REFERENCES `comment` (`idComment`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
INSERT INTO `report` VALUES (18,59,'2021-03-11 10:36:18',10,NULL),(19,28,'2021-03-11 16:10:24',10,NULL),(20,NULL,'2021-03-11 16:37:25',10,21),(22,1,'2021-03-18 11:36:09',10,NULL);
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userId` smallint unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `pseudo` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `biographie` mediumtext,
  `creationDate` datetime NOT NULL,
  `isAdmin` int NOT NULL DEFAULT '0',
  `pictureProfil` varchar(255) DEFAULT 'http://localhost:3000/images/pictureDefault.jpg',
  PRIMARY KEY (`userId`),
  UNIQUE KEY `id_UNIQUE` (`userId`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `pseudo_UNIQUE` (`pseudo`)
) ENGINE=InnoDB AUTO_INCREMENT=184 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'anthony@gmail.com','antho','1234',NULL,'2021-02-17 23:08:37',0,'http://localhost:3000/images/pictureDefault.jpg'),(10,'almoyner.heloise@gmail.com','Almo','$2b$10$UKoAQy2nQsUb8ZKebo8nNu08P0wezkAkLiuhr7p8XZfxraFzx7zAu','undefined','2021-02-24 00:00:00',1,'http://localhost:3000/images/jeune-ic-ne-exécutive-de-profil-de-femme-81933191.jpg1615729879971.jpg'),(13,'test2@gmail.com','test2','$2b$10$G7m2lXc2qxxK6MZI2YHgm.AE3oaDQlBPzQVxiuOTAZDMz.53Dymku',NULL,'2021-02-24 13:37:27',0,'http://localhost:3000/images/pictureDefault.jpg'),(15,'ant@gmail.com','jacques','$2b$10$LGeYDiaukVZ5aTyphWUqeuEmV780bH7Mhs2dRlX50OngRN56tlWle',NULL,'2021-02-24 13:40:50',0,'http://localhost:3000/images/pictureDefault.jpg'),(22,'helo@gmail.com','helo','$2b$10$36L/DqTz6iX6huF5fYKFJuk3GiFOExYuPqktFuAdTrTetttkTxqOi',NULL,'2021-02-24 13:51:59',0,'http://localhost:3000/images/pictureDefault.jpg'),(25,'test3@gmail.com','test3','$2b$10$jJhFU6r1I.9faWzHmiMmwewrMKsY3KlF.yu11aIDBvPfL4XTZgKVG','','2021-03-01 15:37:16',0,'http://localhost:3000/images/pictureDefault.jpg'),(26,'test4@gmail.com','test4','$2b$10$D6Mu/d/qq5/TW561ypltvuB.BBDCkR4C.JVHMa2C/3T1hJNAgj6LO','','2021-03-01 17:12:13',0,'http://localhost:3000/images/pictureDefault.jpg'),(28,'test5@gmail.com','tst4','$2b$10$1qCWomGy.jnzcIHllcKnVOSMEf6iF7oqLShpP21V7xtm9LB9EHSJm','test','2021-03-03 12:12:21',0,'http://localhost:3000/images/pictureDefault.jpg'),(45,'heloise@gmail.com','heloise','$2b$10$07j6jAGLKwvwGZFa9/HooOpAGo0c3bMYgLuWQ36klRha8DMsKh1OC','','2021-03-05 10:43:59',0,'http://localhost:3000/images/pictureDefault.jpg'),(105,'blablabla@gmail.com','blablabla','$2b$10$5eO.hUfUX9wTEnAqi9qpfuBagH7REXFxGczFkjqfq7mvyUv6B1Ehu','','2021-03-05 12:37:55',0,'http://localhost:3000/images/pictureDefault.jpg'),(110,'edith.victor@gmail.com','edith','$2b$10$SBZV9V/j0sN7O8gJHqegN.raH3lC.umA.l0GCMZ/zykhA5FDeErIy','Je m\'appelle Edith.','2021-03-08 12:36:34',0,'http://localhost:3000/images/pictureDefault.jpg'),(122,'testtest@gmail.com','testest','$2b$10$OpOh2Eka4aHtd7Yto9qYt.cV5ogIihoOWo9Xa01oCiOh3dXMmL1tK','','2021-03-08 19:13:48',0,'http://localhost:3000/images/pictureDefault.jpg'),(164,'testestest@gmail.com','testestest','$2b$10$DifeWmtLxqbmJuxN9Owrb.RHdTvTV2xhOEM/6EsxD80HZ7TT/cQIy','','2021-03-09 18:50:25',0,'http://localhost:3000/images/pictureDefault.jpg'),(166,'john.dupont@gmail.com','John','$2b$10$V1J1Yctc3vS8S0VD46QEducCl5SfYzvyV8JqCktOCt.RL8IqigFoq','','2021-03-11 19:29:00',0,'http://localhost:3000/images/profil-avatar-homme-icone-ronde_24640-14046.jpg1615487340095.jpg'),(167,'antoine.g@gmail.com','Antoine','$2b$10$Mx.LJjaEAZ86fLGeyJMsOOEV0iXtgGOai62G4vEncPiA5vHnRG9DS','undefined','2021-03-12 17:31:48',0,'http://localhost:3000/images/profil-avatar-homme-icone-ronde_24640-14044.jpg1615728530011.jpg'),(169,'jacques.dupont@gmail.com','Jacq','$2b$10$v87mYIexcPM.1SaJYlTQTOoR4mBivYVHkLiOf9uuz.4X49cBzRKr2','','2021-03-14 14:40:23',0,'http://localhost:3000/images/pictureDefault.jpg');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userdislikes`
--

DROP TABLE IF EXISTS `userdislikes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userdislikes` (
  `idDislikes` smallint unsigned NOT NULL AUTO_INCREMENT,
  `userIdDislike` smallint unsigned NOT NULL,
  `userEmailDislike` varchar(100) NOT NULL,
  `idItemDislike` smallint unsigned NOT NULL,
  PRIMARY KEY (`idDislikes`),
  KEY `fk_dislike_user` (`userIdDislike`),
  KEY `fk_dislike_item` (`idItemDislike`),
  CONSTRAINT `fk_dislike_item` FOREIGN KEY (`idItemDislike`) REFERENCES `item` (`id`),
  CONSTRAINT `fk_dislike_user` FOREIGN KEY (`userIdDislike`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=335 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userdislikes`
--

LOCK TABLES `userdislikes` WRITE;
/*!40000 ALTER TABLE `userdislikes` DISABLE KEYS */;
INSERT INTO `userdislikes` VALUES (296,110,'edith.victor@gmail.com',63),(297,26,'test4@gmail.com',63),(298,26,'test4@gmail.com',1),(301,26,'test4@gmail.com',28),(302,26,'test4@gmail.com',26),(305,15,'ant@gmail.com',59),(334,10,'almoyner.heloise@gmail.com',1);
/*!40000 ALTER TABLE `userdislikes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userlikes`
--

DROP TABLE IF EXISTS `userlikes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userlikes` (
  `idLikes` smallint unsigned NOT NULL AUTO_INCREMENT,
  `userIdLike` smallint unsigned NOT NULL,
  `userEmailLike` varchar(100) NOT NULL,
  `idItemLike` smallint unsigned NOT NULL,
  PRIMARY KEY (`idLikes`),
  KEY `fk_like_user` (`userIdLike`),
  KEY `fk_like_item` (`idItemLike`),
  CONSTRAINT `fk_like_item` FOREIGN KEY (`idItemLike`) REFERENCES `item` (`id`),
  CONSTRAINT `fk_like_user` FOREIGN KEY (`userIdLike`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=328 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userlikes`
--

LOCK TABLES `userlikes` WRITE;
/*!40000 ALTER TABLE `userlikes` DISABLE KEYS */;
INSERT INTO `userlikes` VALUES (254,167,'antoine.g@gmail.com',1),(259,110,'edith.victor@gmail.com',1),(260,110,'edith.victor@gmail.com',64),(262,110,'edith.victor@gmail.com',62),(265,110,'edith.victor@gmail.com',61),(293,10,'almoyner.heloise@gmail.com',24),(294,10,'almoyner.heloise@gmail.com',64),(297,10,'almoyner.heloise@gmail.com',62),(300,10,'almoyner.heloise@gmail.com',29),(305,10,'almoyner.heloise@gmail.com',63),(306,10,'almoyner.heloise@gmail.com',59),(308,110,'edith.victor@gmail.com',59),(309,26,'test4@gmail.com',59),(313,26,'test4@gmail.com',27),(315,15,'ant@gmail.com',1),(316,15,'ant@gmail.com',61),(322,15,'ant@gmail.com',26),(324,15,'ant@gmail.com',24),(327,10,'almoyner.heloise@gmail.com',61);
/*!40000 ALTER TABLE `userlikes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-19 14:06:42
